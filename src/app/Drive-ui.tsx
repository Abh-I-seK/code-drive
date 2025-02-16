import { ChevronRight, FilePlus, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileRow } from "./file-row"
import { FolderRow } from "./folder-row"
import { folder_type as FolderType, file_type as FileType } from "@/db/schema"
import Link from "next/link"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import PythonIcon from "../../public/Python"
import JavaIcon from "../../public/Java"
import CppIcon from "../../public/Cpp"
import JavascriptIcon from "../../public/Javascript"
import { addFile } from "@/db/queries"
import { validateAndAddExtension } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export default function GoogleDriveClone(props: {
  files: FileType[]
  folders: FolderType[]
  parents: FolderType[]
  user: string
  currentFolder: number
}) {
  const breadcrumbs = props.parents ?? []

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href={`/f/${0}`}>
              <Button
                variant={"ghost"}
                className="text-muted-foreground hover:text-foreground mr-2"
              >
                {" "}
                My Drive
              </Button>
            </Link>
            {breadcrumbs.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight
                  className="mx-2 text-muted-foreground"
                  size={16}
                />
                <Link href={`/f/${folder.id}`}>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {folder.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SignedOut>
              <SignUpButton />
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-border">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground items-center">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">
                <span className="flex justify-between items-center">
                  <span>Size</span>
                  <span>
                    <Dialog>
                      <DialogTrigger
                        type="button"
                        className="px-2 py-0 mr-1 text-muted-foreground hover:text-foreground"
                      >
                        {/* <Button variant={"ghost"} className="px-2 py-0 mr-1 text-muted-foreground hover:text-foreground"><FilePlus/></Button> */}
                        <FilePlus className="w-5" />
                      </DialogTrigger>
                      <DialogContent>
                        <form action={
                          async(formData)=>{
                            "use server";
                            const lang = formData.get("language");
                            const name = formData.get("name");
                            
                            if(!lang || !name){
                              return;
                            }

                            let filename = "";
                            try{
                              filename = validateAndAddExtension(name.toString(), lang.toString());
                            }catch(e){
                              console.log(e);
                              return;
                            }
                            // fix type here
                            const a : any = {
                              name: filename,
                              language: lang.toString(),
                              parent: props.currentFolder,
                              code : "",
                              ownerId : props.user,
                              size : "2 MB"
                            }
                            // console.log(a);
                            await addFile(a);
                            revalidatePath("/f/"+props.currentFolder);
                        }}>
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
                                  <SelectItem value="python"><span className="flex gap-2 items-center"><PythonIcon/> Python</span></SelectItem>
                                  <SelectItem value="java"><span className="flex gap-2 items-center"><JavaIcon/> Java</span></SelectItem>
                                  <SelectItem value="javascript"><span className="flex gap-2 items-center"><JavascriptIcon/> Javascript</span></SelectItem>
                                  <SelectItem value="c++"><span className="flex gap-2 items-center"><CppIcon/> C++</span></SelectItem>
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
                    <Button
                      variant={"ghost"}
                      className="px-2 py-0 text-muted-foreground hover:text-foreground"
                    >
                      <FolderPlus />
                    </Button>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <li
                key={folder.id}
                className="px-6 py-4 border-b border-border hover:bg-muted/50"
              >
                <FolderRow f={folder} />
              </li>
            ))}
            {props.files.map((file) => (
              <li
                key={file.id}
                className="px-6 py-4 border-b border-border hover:bg-muted/50"
              >
                <FileRow f={file} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
