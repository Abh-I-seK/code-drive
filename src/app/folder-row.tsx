import Link from "next/link"
import { folder_type } from "@/db/schema"
import {
  Folder as FolderIcon,
} from "lucide-react"
import MoreOptions from "@/components/more-option"

export function FolderRow(props: {
    f: folder_type  
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
        <div className="col-span-2 text-muted-foreground">{"--"}</div>
        <div className="col-span-1 text-muted-foreground"><MoreOptions f={props.f} folder={true} par={props.f.parent}/></div>
      </div>
    )
  }