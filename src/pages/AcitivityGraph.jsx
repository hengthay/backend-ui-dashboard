"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiActivity } from "react-icons/fi";


const data = [
  {
    name: 'Total Products',
    cv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Total User',
    cv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Total Sales',
    cv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'New Orders',
    cv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const AcitivityGraph = () => {
  return (
    <div className='md:col-span-8 col-span-12 overflow-hidden rounded-md border border-dashed border-stone-300'>
      <div className='p-4'>
        <div className='flex items-center gap-1.5 font-medium text-base'>
          <FiActivity size={24} />
          Activity
        </div>

        <div className='h-80 px-4 mt-4'>
           <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
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
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="cv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AcitivityGraph