import Link from "next/link"
import type { Folder } from "../lib/mock-data"
import {
  Folder as FolderIcon,
} from "lucide-react"

export function FolderRow(props: {
    f: Folder
  }) {
    const folder = props.f
    return (
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-foreground hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-muted-foreground">{"Folder"}</div>
        <div className="col-span-3 text-muted-foreground">{"--"}</div>
      </div>
    )
  }