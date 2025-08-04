import BookmarkButtons from "./_components/BookmarkButtons"
import Paper from "./_components/Paper"

export default function ShowBucket() {
  return (
    <div className="w-full h-full flex items-center justify-center animate-appearin">
      <div className="flex flex-col ">
        <BookmarkButtons />
      </div>
      <section className="h-200 w-150">
        <Paper />
      </section>
    </div>
  )
}
