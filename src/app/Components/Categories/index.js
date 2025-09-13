import React, { Fragment } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import HorizontalBargraph from '../HorizontalBargraph';
import LineGraph from '../LineGraph';
import PieChartGraph from '../PieChartGraph';

export default function Categories({ categories, handleRemoveWidget, handleOpenDrawer }) {

  const renderGraph = (graph, categoryIndex, graphIndex) => {
    switch (graph.type) {
      case "piechart":
        return <PieChartGraph data={graph.data} title={graph.title} handleCrossClick={() => handleRemoveWidget(categoryIndex, graphIndex)}/>;
      case "linegraph":
        return <LineGraph data={graph.data} title={graph.title} handleCrossClick={() => handleRemoveWidget(categoryIndex, graphIndex)}/>;
      case "bargraph":
        return <HorizontalBargraph data={graph.data} title={graph.title} handleCrossClick={() => handleRemoveWidget(categoryIndex, graphIndex)}/>;
      default:
        return null;
    }
  };

  return (
    <>
        {categories?.map((item, i) => (
            <div key={i}>
                <h3 className="font-bold text-md mb-3">{item.category}</h3>
                <div className="grid grid-cols-3 gap-4">
                {item.graphs?.map((graph, index) => (
                    <Fragment key={index}>
                        {renderGraph(graph, i, index)}
                    </Fragment>
                ))}

                <Card className="flex items-center justify-center h-64">
                    <Button onClick={() => handleOpenDrawer(item)} variant="outline" className='text-gray-500'>
                      <Plus className="h-4 w-4 mr-1" /> Add Widget
                    </Button>
                </Card>
                </div>
            </div>
        ))}
    </>
  )
}
