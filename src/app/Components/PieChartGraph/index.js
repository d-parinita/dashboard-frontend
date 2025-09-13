"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartNoAxesCombined, X } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export default function PieChartGraph({ title, data, handleCrossClick }) {
  const total = data?.reduce((acc, d) => acc + d.value, 0)

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
        <CardContent className="flex items-center space-x-20 mt-0 pt-0">
          <div className="w-40 h-40 relative">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{total}</span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {data.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
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

