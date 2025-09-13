"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, RotateCcw, MoreVertical, Clock } from "lucide-react"
import Navbar from '../Components/Navbar'
import Categories from '../Components/Categories'
import AddWidget from '../Components/AddWidget'
import { useDispatch, useSelector } from 'react-redux'
import { removeWidget } from '../redux/widgetsSlice'

export default function Page() {

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widgets.categories);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleRemoveWidget = (categoryIndex, graphIndex) => {
    const categoryName = categories[categoryIndex].category;
    dispatch(
      removeWidget({ 
        category: categoryName, graphIndex 
      })
    );
  }

  const handleOpenDrawer = (category) => {
    setSelectedCategory(category)
    setOpen(true)
  }

  return (
    <>
      <Navbar />
      <div className="pb-6 pt-18 px-10 space-y-6 bg-gray-100 dark:bg-gray-800 pb-20">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">CNAPP Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setOpen(true)} variant="outline" size="sm" className="flex items-center">
              Add Widget <Plus className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Last 2 days
            </Button>
          </div>
        </div>

        <Categories 
          categories={categories} 
          handleRemoveWidget={(categoryIndex, graphIndex) => handleRemoveWidget(categoryIndex, graphIndex)}
          handleOpenDrawer={(categoryName) => handleOpenDrawer(categoryName)}
        />

      </div>
      <AddWidget open={open} onOpenChange={setOpen} category={selectedCategory}/>
    </>
  )
}
