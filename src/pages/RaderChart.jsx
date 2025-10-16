import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AiOutlineRadarChart } from "react-icons/ai";

const data = [
  {
    name: 'Products',
    cv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'User',
    cv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Sales',
    cv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Orders',
    cv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const RaderChart = () => {
  return (
    <div className='md:col-span-4 col-span-12 overflow-hidden rounded-md border border-dashed border-stone-300'>
      <div className='p-4'>
        <div className='flex items-center gap-1.5 font-medium text-base'>
          <AiOutlineRadarChart size={24} />
          RaderCharts
        </div>

        <div className='h-80 px-4 mt-4'>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name="Mike" dataKey="cv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Lily" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default RaderChart