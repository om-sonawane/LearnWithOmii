import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LearnWithOmii - Learning Management System",
  description: "A comprehensive learning management system for online education",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <footer className="border-t py-6 md:py-8">
              <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div>
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} EduLMS. All rights reserved.
                  </p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <a href="/terms" className="hover:underline">
                    Terms
                  </a>
                  <a href="/privacy" className="hover:underline">
                    Privacy
                  </a>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
