'use client'
import React, { FC } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';

type HorizontalBarChartProps = {
  data: {
    name: string,
    experience: number,
    control: number
  }[]
}

const HorizontalBarChart: FC<HorizontalBarChartProps> = ({ data }) => {

  return (
    <BarChart
      width={500}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="experience" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      <Bar dataKey="control" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
    </BarChart>
  );
}

export default HorizontalBarChart;