"use client"
import { Edit, MoreVertical, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { file_type, folder_type } from "@/db/schema"
import { deleteAction } from "@/db/action"
import UpdateButton from "./update-button"

type fileOrFolder = file_type | folder_type

export default function MoreOptions(props: {
  f: fileOrFolder
  folder: boolean
  par: number
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm">
          <UpdateButton oldName={props.f.name} id={props.f.id} par={props.f.parent}/>
        </div>
        <DropdownMenuItem
          onClick={async () => {
            deleteAction(props.f.id, props.folder, props.par)
          }}
          className="cursor-pointer"
        >
          <div className="px-1 py-0 mr-1 text-muted-foreground hover:text-foreground flex gap-2 items-center">
          <span className="flex gap-2 align-middle text-red-500">
            <Trash2 width={12} height={12} /> Delete
          </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
