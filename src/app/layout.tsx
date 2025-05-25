import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProviders";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import NoteProvider from "@/providers/NotesProvider";

export const metadata: Metadata = {
  title: "Quack Notes AI",
  description: "Made by AKD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <NoteProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col w-full min-h-screen">
            <Header />
            <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">{children}</main>
          </div>
            </SidebarProvider>

          <Toaster richColors position="bottom-center" />
          </NoteProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
