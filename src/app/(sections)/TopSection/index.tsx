import Timeline from '@/app/(sections)/TopSection/_components/timeline/timeline'
import React from 'react'

const TopSection = () => {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-semibold text-center'>Timeline for a 30-day window (15 days before and after today).</h1>
        <h4 className='text-lg font-medium text-center'>Time Unit - Hours</h4>
        <Timeline />
    </div>
  )
}

export default TopSection