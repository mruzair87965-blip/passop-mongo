import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 gap-3">

        <div className="logo font-bold text-white text-lg sm:text-2xl">
         <span className='text-green-700'>  &lt;</span>
          Pass
         <span className='text-green-700'>Op /&gt;</span>
          </div>
        {/* <ul className='flex gap-4' >
            <li><a href="#">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="">Contact</a></li>
        </ul> */}
        <a href="https://github.com/mruzair87965-blip"  target="_blank"  rel="noopener noreferrer">
        <button className='text-white bg-green-700 px-2.5 sm:px-3 py-1 rounded-full flex items-center justify-center gap-1 ring-white ring-1 text-xs sm:text-base shrink-0'>
          <img className='invert' width={18} src="/icons/github.svg" alt="GitHub" />
          <span className='font-bold hidden sm:inline' >GitHub</span>
        </button>
        </a>
        </div>
    </nav>
  )
}

export default Navbar
