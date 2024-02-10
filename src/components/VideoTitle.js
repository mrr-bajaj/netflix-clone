import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[20%] px-24 absolute bg-gradient-to-r from-black w-[100%] aspect-video text-white'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4'>{overview}</p>
        <div>
            <button className="bg-white text-black p-4 px-12 text-xl hover:bg-opacity-80 rounded-lg"> ▶ Play</button>
            <button className="bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg mx-2">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle