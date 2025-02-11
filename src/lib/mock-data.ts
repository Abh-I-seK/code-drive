export type File ={
  id: string,
  name: string,
  url: string,
  parent: string, 
  size: string
}

export type Folder = {
  id:string,
  name:string,
  parent:string
}

export const mockFolders: Folder[] = [
  {
    id: '1',
    name: 'Folder 1',
    parent:"root"
  },
  {
    id: '2',
    name: 'Folder 2',
    parent: '1'
  },
]

export const mockFiles: File[] = [
  {
    id: '1',
    name: 'File 1',
    url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    parent: 'root',
    size: '1.2 MB'
  },
  {
    id: '2',
    name: 'File 2',
    url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    parent: '1',
    size: '1.2 MB'
  },
]

