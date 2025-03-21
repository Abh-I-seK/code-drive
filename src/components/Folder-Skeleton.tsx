"use client"

export default function FolderSkeleton() {
  return (
    <div className="min-h-screen dark:bg-black bg-white text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-300/30 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/20 to-yellow-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 animate-pulse bg-gray-400 dark:bg-gray-700 rounded w-32"></div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded bg-gray-400 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>

        {/* Table */}
        <div className="dark:bg-black bg-white rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-4 py-3 border-b border-gray-800 text-sm">
            <div className="col-span-6">
              <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
            <div className="col-span-3">
              <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
            </div>
            <div className="col-span-2">
              <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Skeleton rows */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="grid grid-cols-12 px-4 py-4 border-b border-gray-800 items-center">
              <div className="col-span-6 flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-400 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
              </div>
              <div className="col-span-3">
                <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
              </div>
              <div className="col-span-1 flex justify-end">
                <div className="w-6 h-6 bg-gray-400 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

