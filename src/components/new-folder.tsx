import { FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addFolderAction } from "@/db/action"


export default function NewFolderButton(props:{currentFolder : number, user : string}) {
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="px-2 py-0 mr-1 text-muted-foreground hover:text-foreground flex gap-2 items-center"
      >
        <FolderPlus className="w-5" /> Add Folder
      </DialogTrigger>
      <DialogContent>
        <form
          action={async (formData) => {
            "use server"
            await addFolderAction(formData, props.currentFolder, props.user)
          }}
        >
          <DialogHeader>
            <DialogTitle>Add Folder</DialogTitle>
            <DialogDescription>write the name of the folder</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Folder Name
              </Label>
              <Input
                name="name"
                id="name"
                className="col-span-3"
                required={true}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Folder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
