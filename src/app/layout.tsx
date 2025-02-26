import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CodeDrive",
  description: "Write, Run and Code Anywhere",
  keywords: "code, drive, codedrive, code-drive, code drive, google drive",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

// added clerk provider and also trying the theme provider to see if its working
// doing it this way or not
