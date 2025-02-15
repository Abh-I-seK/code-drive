"use client"
import { useState, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  height?: string
  className?: string
}

export function CodeEditor({ value, onChange, height = "300px", className }: CodeEditorProps) {
  const { theme: applicationTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{ height }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
      />
    )
  }

  return (
    <div className={className}>
      <CodeMirror
        value={value}
        height={height}
        theme={applicationTheme === "dark" ? "dark" : "light"}
        onChange={onChange}
        extensions={[javascript({ jsx: true })]}
        className="rounded-md border text-md text-wrap md:text-lg"
      />
    </div>
  )
}

