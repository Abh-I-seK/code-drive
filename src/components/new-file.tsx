import { FilePlus} from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PythonIcon from "../../public/Python"
import JavaIcon from "../../public/Java"
import CppIcon from "../../public/Cpp"
import JavascriptIcon from "../../public/Javascript"
import { addFileAction } from "@/db/action"

export default function NewFileButton(props: {
  currentFolder: number
  user: string
}) {
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="px-2 py-0 mr-1 text-muted-foreground hover:text-foreground"
      >
        {/* <Button variant={"ghost"} className="px-2 py-0 mr-1 text-muted-foreground hover:text-foreground"><FilePlus/></Button> */}
        <FilePlus className="w-5" />
      </DialogTrigger>
      <DialogContent>
        <form
          action={async (formData) => {
            "use server"
            await addFileAction(formData, props.currentFolder, props.user)
          }}
        >
          <DialogHeader>
            <DialogTitle>Add File</DialogTitle>
            <DialogDescription>
              write the name of the file and select the langugage
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                File Name
              </Label>
              <Input
                name="name"
                id="name"
                className="col-span-3"
                required={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                Language
              </Label>
              <Select required={true} name="language">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent id="language">
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="python">
                      <span className="flex gap-2 items-center">
                        <PythonIcon /> Python
                      </span>
                    </SelectItem>
                    <SelectItem value="java">
                      <span className="flex gap-2 items-center">
                        <JavaIcon /> Java
                      </span>
                    </SelectItem>
                    <SelectItem value="javascript">
                      <span className="flex gap-2 items-center">
                        <JavascriptIcon /> Javascript
                      </span>
                    </SelectItem>
                    <SelectItem value="c++">
                      <span className="flex gap-2 items-center">
                        <CppIcon /> C++
                      </span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add File</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
