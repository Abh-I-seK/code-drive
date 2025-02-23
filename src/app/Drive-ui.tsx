import { ChevronRight } from "lucide-react"
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
import NewFolderButton from "@/components/new-folder"
import NewFileButton from "@/components/new-file"

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
                    <NewFileButton currentFolder={props.currentFolder} user={props.user}/>
                    {/* ------------------------------------------------------------------------------- */}
                    <NewFolderButton currentFolder={props.currentFolder} user={props.user}/>
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
