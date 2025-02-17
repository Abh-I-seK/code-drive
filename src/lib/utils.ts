import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateAndAddExtension(filename : string, language : string) {
  const filenameRegex = /^[a-zA-Z0-9_]+$/;

  if (!filenameRegex.test(filename)) {
    throw new Error("Invalid filename. Only alphanumeric characters and underscores are allowed.");
  }

  const validLanguages = ["python", "java", "javascript", "c++"];

  if (!validLanguages.includes(language.toLowerCase())) {
    throw new Error("Invalid language. Supported languages are: python, java, javascript, c++.");
  }

  let extension;

  switch (language.toLowerCase()) {
    case "python":
      extension = ".py";
      break;
    case "java":
      extension = ".java";
      break;
    case "javascript":
      extension = ".js";
      break;
    case "c++":
      extension = ".cpp";
      break;
  }

  return filename + extension;
}