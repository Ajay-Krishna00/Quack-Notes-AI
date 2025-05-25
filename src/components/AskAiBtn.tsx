"use client";

import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Fragment, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAboutNotes } from "@/actions/note";
import "@/styles/ai.css"

type Props={
  user: User | null;
}

function AskAiBtn({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [questionText, setQuestionText] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [question, setQuestion] = useState<string[]>([]);

  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestion([]);
        setResponse([]);
      }
      setIsOpen(isOpen);
      }
    }

const textAreaRef = useRef<HTMLTextAreaElement>(null);
const contentRef = useRef<HTMLDivElement>(null);

const handleInput = () => {
  if (!textAreaRef.current) return;

  textAreaRef.current.style.height = "auto"; // Reset height
  textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set height to scrollHeight
}

const handleClickInput = () => {
  textAreaRef.current?.focus();
}

const handleSubmit = async (e: React.FormEvent) => {
  if (!questionText.trim()) return;

  const newQuestions = [...question, questionText];
  setQuestion(newQuestions);
  setQuestionText("");
  setTimeout(scrollToBottom, 100);

  startTransition(async () => {
    const responses = await askAIAboutNotes(newQuestions, response);
    if (responses !== null) {
      setResponse((prev) => [...prev, responses]);
    }
    setTimeout(scrollToBottom, 100);
  })
}

const scrollToBottom = () => {
  contentRef.current?.scrollTo({
    top: contentRef.current.scrollHeight,
    behavior: "smooth",
  })
}

const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSubmit(e);
  }
}

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} >
    <DialogTrigger asChild>
      <Button variant="secondary">Ask AI</Button>
    </DialogTrigger>
    <DialogContent className="custom-scrollbar h-[85vh] flex flex-col  overflow-y-auto " ref={contentRef}> 
      <DialogHeader>
        <DialogTitle>Ask AI About Your Notes</DialogTitle>
        <DialogDescription>
            Our AI can answer questions about all your notes
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-8">
          {question.map((q, index) => (
            <Fragment key={index}>
              <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm ">
                {q}
              </p>
              {response[index] && (
                <p className="bot-response text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: response[index] }}
                />
              )}
            </Fragment>
          ))}
          {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
        </div>
        <div className="mt-auto flex cursor-text flex-col rounded-lg border p-4" onClick={handleClickInput}>
          <Textarea
            ref={textAreaRef}
            placeholder="Ask me anything about your notes..."
            className="placeholder:text-muted-foreground resize-none rounded-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ minHeight: "0", lineHeight: "normal" }}
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <Button className="ml-auto size-8 rounded-full">
            <ArrowUpIcon className="text-background"/>
          </Button>
        </div>
    </DialogContent>
  </Dialog>
  )
}

export default AskAiBtn