import React from 'react'
import { Side } from '@/components/Side'

const Page = () => {
  return (
    <div className='flex justify-center overflow-hidden w-full'>
      <Side />
      <div className='absolute left-20 top-6 w-fit'>
        dashboard
      </div>
    </div>
  )
}

export default Page