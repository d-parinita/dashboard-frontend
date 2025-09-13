import { createSlice } from "@reduxjs/toolkit";

const dataLineGraph = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 40 },
  { name: "Sat", value: 70 },
  { name: "Sun", value: 55 },
];

const dataPieGraph = [
  { name: "Failed", value: 1689, color: "#dc2626" },
  { name: "Warning", value: 681, color: "#facc15" },
  { name: "Not available", value: 36, color: "#cbd5e1" },
  { name: "Passed", value: 7253, color: "#22c55e" },
];

const dataBargraph = [
  { name: "Critical", value: 9, color: "bg-red-700" },
  { name: "High", value: 150, color: "bg-red-500" },
  { name: "Medium", value: 500, color: "bg-yellow-400" },
  { name: "Low", value: 811, color: "bg-gray-300" },
];

const initialState = {
  categories: [
    {
      category: "CSPM Executive Dashboard",
      displayName: 'CSPM',
      graphs: [
        { type: "piechart", title: "Cloud Account Risk Assessment", data: dataPieGraph },
        { type: "bargraph", title: "Image Risk Assessment", data: dataBargraph },
      ],
    },
    {
      category: "CWPP Dashboard",
      displayName: 'CWPP',
      graphs: [
        { type: "linegraph", title: "Weekly Activity", data: dataLineGraph },
        { type: "piechart", title: "Cloud Account Risk Assessment", data: dataPieGraph },
      ],
    },
    {
      category: "Registry Scan",
      displayName: 'Registry',
      graphs: [
        { type: "bargraph", title: "Image Risk Assessment", data: dataBargraph },
        { type: "bargraph", title: "Top 5 Namespace Specific Alerts", data: dataBargraph },
      ],
    },
  ],
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { category, graph } = action.payload;
      const cat = state.categories.find((c) => c.category === category);
      if (cat) {
        cat.graphs.push(graph);
      } else {
        state.categories.push({
          category,
          graphs: [graph],
        });
      }
    },

    removeWidget: (state, action) => {
      const { category, graphIndex } = action.payload;
      const cat = state.categories.find((c) => c.category === category);
      if (cat) {
        cat.graphs.splice(graphIndex, 1);
      }
    },
  },
});

export const { addWidget, removeWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
