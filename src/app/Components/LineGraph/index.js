"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartNoAxesCombined, X } from "lucide-react"
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

export default function LineGraph({ title, data, handleCrossClick }) {
  return (
    <Card className="w-full">
      <CardHeader className='pb-0 gap-0 flex items-center justify-between'>
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        <button
          onClick={handleCrossClick}
          className="text-gray-500 hover:text-gray-900"
        >
          <X size={16} />
        </button>
      </CardHeader>

      {data ? (<>
        <CardContent className="h-full mt-0 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2563eb" }}
                activeDot={{ r: 6, fill: "#1e40af" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </>) : (<>
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-gray-400">
            <ChartNoAxesCombined className="mx-auto h-12 w-12 mb-2" />
            <p className="font-semibold text-gray-600">No Graph data available!</p>
          </div>
        </CardContent>
      </>)}
    </Card>
  )
}
