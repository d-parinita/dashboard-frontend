"use client";
import React, { Fragment, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, removeWidget } from "@/app/redux/widgetsSlice";

export default function AddWidget({ open, onOpenChange, category }) {

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widgets.categories);
  const [selectedCategory, setSelectedCategory] = useState(category?.category || "CSPM Executive Dashboard");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [markedForRemoval, setMarkedForRemoval] = useState([]);

  if (!open) return null;

  const handleAddWidget = () => {
    if (!name || !type) return;

    const defaultData = {
      piechart: [
        { name: "Failed", value: 1689, color: "#dc2626" },
        { name: "Warning", value: 681, color: "#facc15" },
        { name: "Not available", value: 36, color: "#cbd5e1" },
        { name: "Passed", value: 7253, color: "#22c55e" },
      ],
      linegraph: [
        { name: "Mon", value: 30 },
        { name: "Tue", value: 45 },
        { name: "Wed", value: 28 },
        { name: "Thu", value: 60 },
        { name: "Fri", value: 40 },
        { name: "Sat", value: 70 },
        { name: "Sun", value: 55 },
      ],
      bargraph: [
        { name: "Critical", value: 9, color: "bg-red-700" },
        { name: "High", value: 150, color: "bg-red-500" },
        { name: "Medium", value: 500, color: "bg-yellow-400" },
        { name: "Low", value: 811, color: "bg-gray-300" },
      ],
    };

    const randomPie = randomizeValues(defaultData.piechart, 10, 10000);
    const randomLine = randomizeValues(defaultData.linegraph, 10, 100);
    const randomBar = randomizeValues(defaultData.bargraph, 5, 1000);

    defaultData.piechart = randomPie
    defaultData.linegraph = randomLine
    defaultData.bargraph = randomBar    

    dispatch(
      addWidget({
        category: selectedCategory,
        graph: { type, title: name, data: defaultData[type] },
      })
    );

    setName("");
    setType("");
    onOpenChange(false);
  };

  const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomizeValues = (data, min, max) => {
    return data.map(item => ({
      ...item,
      value: getRandomInt(min, max)
    }));
  }

  const handleRemoveWidget = () => {
    markedForRemoval.forEach(({ categoryIndex, graphIndex }) => {
      const categoryName = categories[categoryIndex].category;
      dispatch(removeWidget({ category: categoryName, graphIndex }));
    });
    setMarkedForRemoval([]);
    onOpenChange(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative ml-auto h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-lg flex flex-col animate-in slide-in-from-right z-50">
        <div className="bg-[#0B1C63] dark:bg-gray-900 text-white flex justify-between items-center px-4 py-3">
          <h2 className="text-sm font-medium">Add Widget</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="text-white hover:opacity-75"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold mb-4">
            Personalise your dashboard by adding the following widget
          </p>

          <Tabs defaultValue={category?.displayName || 'CSPM'} className="w-full">
            <TabsList className="flex border-b p-0 h-auto rounded-none">
              {categories?.map((tab, i) => (
                <TabsTrigger
                  key={i}
                  value={tab.displayName}
                  onClick={() => setSelectedCategory(tab.category)}
                  className="flex-1 text-sm px-3 py-2 rounded-none border-b-2 data-[state=active]:border-black data-[state=active]:font-medium"
                >
                  {tab.displayName}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-4 space-y-3">
              {categories?.map((item, i) => (
                <Fragment key={i}>
                  {item.category == selectedCategory && (<>
                    {item.graphs?.map((graph, ind) => (
                      <label key={ind} className="flex items-center border-1 p-2 space-x-2">
                        <Checkbox  
                          checked={
                            !markedForRemoval.some(
                              (m) => m.categoryIndex === i && m.graphIndex === ind
                            )
                          }
                          onCheckedChange={(checked) => {
                            if (!checked) {
                              setMarkedForRemoval((prev) => [
                                ...prev,
                                { categoryIndex: i, graphIndex: ind },
                              ]);
                            } else {
                              setMarkedForRemoval((prev) =>
                                prev.filter(
                                  (m) => !(m.categoryIndex === i && m.graphIndex === ind)
                                )
                              );
                            }
                          }}
                        />
                        <span className="text-sm">{graph.title}</span>
                      </label>
                    ))}
                  </>)}
                </Fragment>
              ))}
            </div>
          </Tabs>

          <div className="mt-6">
            <p className="font-semibold my-2">Add a new widget</p>
            <Input
              id='name'
              placeholder='Enter widget name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex flex-col space-y-1 my-3">
              <Select onValueChange={setType}>
                <SelectTrigger id="graph" className="w-full">
                  <SelectValue placeholder="Select a graph" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="piechart">Piechart</SelectItem>
                  <SelectItem value="linegraph">Line Graph</SelectItem>
                  <SelectItem value="bargraph">Bargraph</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddWidget}>Add new</Button>
          </div>

        </div>

        <div className="flex justify-end space-x-3 px-4 py-3 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRemoveWidget}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
