import type { File } from "../lib/mock-data"
import {
  FileIcon,
} from "lucide-react"
import Link from "next/link"

export function FileRow(props: { f: File }) {
    const file = props.f
    return (
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <Link
            target="_blank"
            href={file.url || "#"}
            className="flex items-center text-foreground hover:text-blue-400"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </Link>
        </div>
        <div className="col-span-3 text-muted-foreground">{"File"}</div>
        <div className="col-span-3 text-muted-foreground">{"2 MB"}</div>
      </div>
    )
}