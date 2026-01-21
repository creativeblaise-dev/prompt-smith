import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'PromptSmith - AI Prompt Refinement Tool',
    description: 'Analyze, score, and refine AI prompts with systematic feedback',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
