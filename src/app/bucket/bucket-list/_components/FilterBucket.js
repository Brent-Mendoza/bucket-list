import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

const FilterBucket = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <button>Uncompleted</button>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <button>Completed</button>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default FilterBucket
