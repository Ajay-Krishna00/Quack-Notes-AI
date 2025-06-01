# 🦆 Quack Notes AI

Quack Notes AI is a full-stack note-taking application that lets you create, organize, and interact with your notes using AI. Built with bleeding-edge web technologies like **Next.js 15 App Router**, **Supabase**, **Prisma**, **shadcn/ui**, and **TailwindCSS**, it also integrates the **Grok API** to provide contextual AI-powered chat with your notes.

🚀 **Live App**: [quack-notes-ai.vercel.app](https://quack-notes-ai.vercel.app/)

---

## ✨ Features

- 🧠 **AI Chat with Your Notes** – Ask questions and get insights from your notes via Grok API.
- 🔐 **Auth with Supabase** – Secure authentication and user management.
- 📄 **CRUD for Notes** – Create, read, update, and delete your notes.
- 🧱 **PostgreSQL + Prisma ORM** – Powerful relational data modeling and access.
- 🎨 **Modern UI** – Built with shadcn/ui and TailwindCSS for a sleek, minimal interface.
- ⚡ **Deployed on Vercel** – Super-fast serverless deployment.

---

## 🛠️ Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| Next.js 15     | Frontend + Backend (App Router)  |
| Supabase       | Auth + PostgreSQL Database       |
| Prisma         | ORM for DB modeling              |
| TailwindCSS    | Utility-first CSS styling        |
| shadcn/ui      | Prebuilt UI components           |
| Grok API       | AI-based chat interaction        |
| Vercel         | Hosting & Deployment             |


---

## 🔐 Environment Variables

Create a `.env` file at the root with the following:

```env
DATABASE_URL=postgresql://<your-supabase-db-url>
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GROK_API_KEY=your-grok-api-key
 ```
---

## 🧪 Getting Started Locally

1. Clone the repo
```bash
git clone https://github.com/yourusername/quack-notes-ai.git
cd quack-notes-ai
```
2. Install dependencies
```bash
npm install
```
3. Set up Prisma
```bash
npx prisma generate
npx prisma db push
```
4. Run the dev server
```bash
npm run dev
```
App should be live at: http://localhost:3000

---

## 💡 Future Improvements

- 🔍 Full-text search and filtering
- 🗂️ Tag-based organization
- 📱 PWA/mobile-friendly interface
- 🧩 Plugin architecture for more AI models

---

## 🧠 About the AI (Grok Integration)

The Grok API enables contextual conversations with your notes. It intelligently parses note content and uses context windows to provide relevant answers to your queries. Perfect for summarization, recall, or brainstorming.

## 🧑‍💻 Author
Built with ❤️ by *Ajay Krishna D*

## 📜 License
MIT License – free to use, modify, and build on.
