'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Bell, ChevronDown, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useState } from "react"
import { ModeToggle } from "../ModeToggle"
import { useDispatch, useSelector } from "react-redux"
import { setSearchResults } from "@/app/redux/widgetsSlice"

export default function Navbar() {

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widgets.categories);
  const [searchedWidget, setSearchedWidget] = useState('')

  const handleSearchWidget = () => {
    if (searchedWidget.trim() === '') {
      dispatch(setSearchResults([])); 
      return;
    }

    const newSearch = [];
    for (let i = 0; i < categories?.length; i++) {
      const search = categories[i]?.graphs?.filter(graph =>
        graph.title.toLowerCase().includes(searchedWidget.toLowerCase())
      );
      if (search?.length > 0) {
        newSearch.push(...search);
      }
    }
    dispatch(setSearchResults(newSearch));
  }

  useEffect(() => {
    handleSearchWidget()
  }, [searchedWidget])

  return (
    <div className="w-full fixed z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-10 py-2 flex items-center justify-between">
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className='font-semibold'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-bold'>Dashboard V2</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex-1 flex justify-end px-4">
        <div className="relative w-full max-w-md">
          <Search color="#808080" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
          <Input onChange={(e) => setSearchedWidget(e.target.value)} className='pl-9 bg-gray-100' placeholder="Search anything..." />
        </div>
      </div>

      <div className="flex items-center space-x-4">

        <ModeToggle />

        <button className="relative p-2 text-gray-500 hover:text-gray-700">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 ml-1 text-gray-600" />
        </div>
      </div>
    </div>
  )
}
