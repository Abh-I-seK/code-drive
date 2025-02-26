import { Button } from "@/components/ui/button"
import { Code2, Share2, Play, Cloud, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen bg-background relative isolate overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-300/30 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/20 to-yellow-500/10 rounded-full blur-3xl" />
      </div>

      {/* Apply glassmorphism to the header */}
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b">
        <Link href="/" className="flex items-center justify-center">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-semibold font-mono">
            codeDrive
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </nav>
      </header>
      <main>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Code. Store. Run. Share.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your all-in-one platform for seamless coding experience.
                  Write, store, execute, and collaborate on code with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/f/0"}>
                  <Button size="lg">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Code Preview Section */}
        <section className="py-12 md:py-24 lg:py-24 border-t flex justify-center">
          <div className="container w-1/2 px-4 md:px-6">
            <div className="rounded-lg border border-white/20 dark:border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-white/5 p-8 font-mono text-sm shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-30 before:-translate-y-1/2 before:rounded-full before:blur-2xl">
              <div className="flex items-center gap-2 border-b pb-4 text-muted-foreground">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2">main.py</span>
              </div>
              <pre className="p-4">
                <code>{`def hello_world():
    print("Welcome to codeDrive!")
    
# Write, run, and share your code
# with just a few clicks.

hello_world()`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="flex justify-center py-12 md:py-24 lg:py-32 border-t">
          <div className="container w-3/4 px-4 md:px-6">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group space-y-3 bg-card/70 p-6 rounded-lg border transition-all hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Code Editor</h3>
                <p className="text-muted-foreground">
                  Powerful code editor with syntax highlighting and intelligent
                  completions.
                </p>
              </div>
              <div className="group space-y-3 backdrop-blur-md bg-card/70 p-6 rounded-lg border transition-all hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
                  <Cloud className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Cloud Storage</h3>
                <p className="text-muted-foreground">
                  Securely store and sync your code across all devices.
                </p>
              </div>
              <div className="group space-y-3 backdrop-blur-md bg-card/70 p-6 rounded-lg border transition-all hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
                  <Play className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Code Execution</h3>
                <p className="text-muted-foreground">
                  Run your code instantly in a secure sandbox environment.
                </p>
              </div>
              <div className="group space-y-3 backdrop-blur-md bg-card/70 p-6 rounded-lg border transition-all hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Easy Sharing</h3>
                <p className="text-muted-foreground">
                  Share your code with others using a simple link.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
