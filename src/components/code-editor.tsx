"use client"
import { useState, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import {java} from "@codemirror/lang-java"
import {python} from "@codemirror/lang-python"
import {cpp} from "@codemirror/lang-cpp"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Play, Save } from "lucide-react"
import { Code_Runner } from "@/db/queries"
import ShareButton from "./Share-Button"
import { file_type } from "@/db/schema"
import { useHotkeys } from "react-hotkeys-hook"
import { saveFile } from "@/db/action"

type CodeEditorProps = {
  value: string
  onChange?: (value: string) => void
  height?: string
  file: file_type
  className?: string
  publicFile?: boolean
}

function getLang(lang : string){
  switch (lang) {
    case "java":
      return java()
    case "python":
      return python()
    case "c++":
      return cpp()
    default:
      return javascript({ jsx: true })
  }
}

export function CodeEditor({
  value,
  onChange,
  file,
  height = "300px",
  className,
  publicFile = false,
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [code, setCode] = useState(value)
  const [output, setOutput] = useState("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [running, setRunning] = useState(false)
  const [saving, setSaving] = useState(false)
  const [codeError, setCodeError] = useState(false)

  useHotkeys("ctrl+enter", async () => {
    await handleRunCode()
  })

  useHotkeys("ctrl+s", async () => {
    setSaving(true)
    await saveFile(code, file.id)
    setSaving(false)
  })

  const handleRunCode = async () => {
    try {
      setRunning(true)
      const res = await Code_Runner(code, file?.language ?? "")
      setCodeError(res.ok === false)
      setOutput(res.msg)
      setRunning(false)
    } catch (e) {
      setOutput(`Error: ${e}`)
    }
    setIsDrawerOpen(true)
  }

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
    <div className="max-h-screen bg-background md:p-4">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={async () => {
              setSaving(true)
              await saveFile(code, file.id)
              setSaving(false)
            }}
            disabled={saving}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleRunCode} disabled={running}>
              <Play className="h-4 w-4" />
              Run
            </Button>
            {!publicFile && <ShareButton file={file} />}
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <CodeMirror
            value={code}
            height={height}
            theme={"dark"}
            extensions={[getLang(file.language)]}
            onChange={(value) => setCode(value)}
            className="overflow-hidden rounded-lg text-lg"
          />
        </div>

        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-4xl">
              <DrawerHeader>
                <DrawerTitle>Output</DrawerTitle>
                <DrawerDescription>
                  Result of your code execution
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <pre
                  className={`rounded-lg bg-muted p-4 font-mono ${
                    codeError ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {output || "No output"}
                </pre>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
