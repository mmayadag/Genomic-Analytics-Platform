"use client";

import { ResponsiveHeatMap } from "@nivo/heatmap";
import { FC } from "react";

type MyResponsiveHeatMapProps = {
  data: any[];
};

const MyResponsiveHeatMap: FC<MyResponsiveHeatMapProps> = ({ data }) => {
  const data2 = [
    {
      group: "Group A",
      "Group 1": 12,
      "Group 2": -5,
      "Group 3": 20,
    },
    {
      group: "Group B",
      "Group 1": -17,
      "Group 2": 33,
      "Group 3": -50,
    },
  ];
  return (
    <div style={{ height: 400, width: 400 }}>
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=" >-.2s"
        enableGridX={true}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: "",
          legendOffset: 46,
          truncateTickAt: 0,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "group",
          legendPosition: "middle",
          legendOffset: 70,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "group",
          legendPosition: "middle",
          legendOffset: -72,
          truncateTickAt: 0,
        }}
        colors={{
          type: "diverging",
          scheme: "red_yellow_blue",
          divergeAt: 0.5,
          minValue: -100000,
          maxValue: 100000,
        }}
        emptyColor="#555555"
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: "row",
            tickPosition: "after",
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: ">-.2s",
            title: "Value →",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
      />
    </div>
  );
};

export default MyResponsiveHeatMap;
