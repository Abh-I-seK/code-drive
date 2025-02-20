"use client"
import { useState, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { useTheme } from "next-themes"
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
import { Play } from "lucide-react"
import { Code_Runner } from "@/db/queries"
import ShareButton from "./Share-Button"
import { file_type } from "@/db/schema"

type CodeEditorProps = {
  value: string
  onChange?: (value: string) => void
  height?: string
  file?: file_type
  className?: string
  publicFile? : boolean
}

export function CodeEditor({ value, onChange, file ,height = "300px", className,publicFile = false }: CodeEditorProps) {
  const { theme: applicationTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [running , setRunning] = useState(false);
  const [codeError , setCodeError] = useState(false);

  const handleRunCode = async() => {
    try {
      setRunning(true);
      const res = await Code_Runner(code, file?.language ?? "");
      setCodeError(res.ok === false);
      setOutput(res.msg); 
      setRunning(false);
    } catch (e) {
      setOutput(`Error: ${e}`)
    }
    setIsDrawerOpen(true)
  }

  useEffect(() => {
    setMounted(true)
    setCode(value);
    // setInterval(()=>{
    //   console.log("hi");
    // },2000);
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
          <h1 className="text-2xl font-bold">Code Editor</h1>
          <div className="flex gap-2">
            <Button onClick={handleRunCode} disabled={running}>
              <Play className="h-4 w-4" />
              Run
            </Button>
            {!publicFile && <ShareButton file={file}/>}
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <CodeMirror
            value={code}
            height={height}
            theme={applicationTheme === "dark" ? "dark" : "light"}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCode(value)}
            className="overflow-hidden rounded-lg text-lg"
          />
        </div>

        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-4xl">
              <DrawerHeader>
                <DrawerTitle>Output</DrawerTitle>
                <DrawerDescription>Result of your code execution</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <pre className={`rounded-lg bg-muted p-4 font-mono ${codeError ? "text-red-500" : "text-emerald-500"}`}>{output || "No output"}</pre>
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