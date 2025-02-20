"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Share2 } from "lucide-react"
import { Lock, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { file_type } from "@/db/schema"
import { updateVisibility } from "@/db/action"

type ShareButtonProps = {
  file?: file_type
}

export default function ShareButton({ file }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const privateMsg = "Only people with access can open with the link"
  const publicMsg = "Anyone with the link can open the file"
  const [global, setGlobal] = useState(file?.isPublic ?? false)
  const [shareLink, setShareLink] = useState("")
  const [working , setWorking] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
  }

  function Symbol() {
    if (global) {
      return <Globe className="h-5 w-5" />
    } else {
      return <Lock className="h-5 w-5" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{file?.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">General access</h4>
            <div className="flex items-center gap-3">
              <div className="bg-muted rounded-full p-2 items-center">
                <Symbol />
              </div>
              <div className="flex-1">
                <Select
                  defaultValue={global ? "anyone" : "restricted"}
                  onValueChange={async(e) => {
                    const nw = e === "anyone";
                    setGlobal(e === "anyone")
                    setWorking(true)
                    if (file) {
                      await updateVisibility(nw, file.id)
                    }
                    setWorking(false)
                    if(nw){
                      setShareLink("http://localhost:3000/p/"+file?.id)
                    }else{
                      setShareLink("http://localhost:3000/w/"+file?.id)
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restricted">Restricted</SelectItem>
                    <SelectItem value="anyone">Anyone with the link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {!global ? privateMsg : publicMsg}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={copyLink} disabled={working}>
            <Copy className="h-4 w-4 mr-2" />
            Copy link
          </Button>
          <Button
            type="submit"
            onClick={() => {setOpen(false)}}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
