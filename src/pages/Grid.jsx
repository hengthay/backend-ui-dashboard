import React from 'react'
import AcitivityGraph from './AcitivityGraph'
import RaderChart from './RaderChart'

const Grid = () => {
  return (
    <div className='grid gap-3 grid-cols-12 my-4'>
      <AcitivityGraph />
      <RaderChart />
    </div>
  )
}

export default Grid