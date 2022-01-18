import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];


export default function Example() {
  return (
    <div style={{ width: "80%", height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
              dataKey="value"
              data={data}
              fill="#2E64FE"
              label={(entry) => entry.name}
            />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
