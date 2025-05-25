"use server"

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

export const createNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to create a note");
    
    await prisma.note.create({
      data: {
        id: noteId,
        authorId: user.id,
        text: "",
      }
    })
    return { errorMessage: null };
  }
  catch(error) {
    return handleError(error);
  }
}
export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a note");
    await prisma.note.delete({
      where: {id: noteId, authorId:user.id},      
    })
    return { errorMessage: null };
  }
  catch(error) {
    return handleError(error);
  }
}

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to update a note");
    console.log(noteId)
    await prisma.note.update({
      where: {id: noteId},
      data: {text: text}
    })
    return { errorMessage: null };
  }
  catch(error) {
    return handleError(error);
  }
}
 
export const askAIAboutNotes = async (newQuestion: string[], previousResponses: string[]) => {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to ask AI questions");

  const groq = new Groq({apiKey: process.env.GROQ_API_KEY || ""});
  
    const notes=await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        text: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (notes.length === 0) {
      return "You have no notes yet.";
    }

    // Define interfaces for note structure
    interface Note {
      text: string;
      createdAt: Date;
      updatedAt: Date;
    }

    const formattedNotes: string = notes.map((note: Note) =>
      `
    Text: ${note.text}
    Created At: ${note.createdAt.toISOString()}
    Last Updated: ${note.updatedAt.toISOString()}
    `.trim()
    ).join("\n");

  const MSG: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: 
            `You are a helpful assistant that answers questions about a user's notes. 
            Assume all questions are related to the user's notes. 
            Make sure that your answers are not too verbose and you speak succinctly. 
            Your responses MUST be formatted in clean, valid HTML with proper structure. 
            Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
            Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
            Avoid inline styles, JavaScript, or custom attributes.
            
            Rendered like this in JSX:
            <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
      
            Here are the user's notes:
            ${formattedNotes}
            `,
      },
  ];
  
  for (let i = 0; i < newQuestion.length; i++){
    MSG.push({
        role: "user",
        content: newQuestion[i],
    });
    if (previousResponses[i]) {
      MSG.push({
        role: "assistant",
        content: previousResponses[i],
      });
    }
  }

  const AIResponse = await groq.chat.completions.create({
    messages: MSG,
    model: "llama-3.1-8b-instant",
  })

  return AIResponse.choices[0].message.content;
}