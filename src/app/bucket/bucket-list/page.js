import SectionOne from "./_components/SectionOne"
import BookmarkButtons from "./_components/BookmarkButtons"
import FilterBucket from "./_components/FilterBucket"
import SectionTwo from "./_components/SectionTwo"

export const exampleData = [
  {
    id: 1,
    todo: "Save the world",
    status: true,
    lat: null,
    lng: null,
  },
  {
    id: 2,
    todo: "Idk what to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 3,
    todo: "Third thing to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 4,
    todo: "Fourth thing to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 5,
    todo: "Fourth thing to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 6,
    todo: "Fourth thing to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 7,
    todo: "Fourth thing to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 8,
    todo: "Fourth thing to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 9,
    todo: "Fourth thing to do",
    status: false,
    lat: null,
    lng: null,
  },
  {
    id: 10,
    todo: "Fourth thing to do",
    status: false,
    lat: null,
    lng: null,
  },
]

const first25 = exampleData.slice(0, 25)
const last25 = exampleData.length > 25 ? exampleData.slice(25) : []

console.log(first25)

export default function BucketList() {
  return (
    <div className="w-full h-full flex items-center justify-center animate-appearin">
      <div className="flex flex-col ">
        <BookmarkButtons />
      </div>
      <div className="flex bg-white/70  shadow-md">
        <section className="h-200 w-120 p-4 flex flex-col">
          <div className="font-gloria">Page 1</div>
          <SectionOne exampleData={first25} />
        </section>
        <div className="flex-grow w-5 bg-leather shadow"></div>
        <section className="h-200 w-120 p-4 flex flex-col ">
          <div className="self-end font-gloria">
            <FilterBucket />
          </div>
          <SectionTwo
            exampleData={last25}
            first25Full={first25.length === 25}
          />
        </section>
      </div>
    </div>
  )
}
