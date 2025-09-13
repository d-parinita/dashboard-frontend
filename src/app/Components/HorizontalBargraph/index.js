import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartNoAxesCombined, X } from "lucide-react"

export default function HorizontalBargraph({ title, data, handleCrossClick }) {
  const total = data?.reduce((acc, d) => acc + d.value, 0)

  return (
    <Card>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        <button
          onClick={handleCrossClick}
          className="text-gray-500 hover:text-gray-900"
        >
          <X size={16} />
        </button>
      </CardHeader>

      {data ? (<>
        <CardContent>
          <p className="text-xl font-bold mb-4">{total} <span className="text-gray-500 text-sm">Total Vulnerabilities</span></p>
          <div className="w-full h-4 rounded-full overflow-hidden flex">
            {data.map((item, i) => (
              <div
                key={i}
                className={`${item.color} h-full`}
                style={{ width: `${(item.value / total) * 100}%` }}
              />
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-2 text-sm">
            {data.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className={`inline-block w-3 h-3 rounded ${item.color}`} />
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
