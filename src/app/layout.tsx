import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import { TanQueryProvider } from '@/tanstackQuery/index'
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "Futo",
  description: "Stream and save AI powered vids bruh",
};

const manrope = Manrope({subsets: ['latin']})

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {workspaceId: string}
}>) {
 
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${manrope.className} bg-[#171717] antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
              <TanQueryProvider >
                {children}
              </TanQueryProvider >
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
