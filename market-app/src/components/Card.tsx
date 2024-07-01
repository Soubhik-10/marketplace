import React from "react"

interface CardProps {
  text: string
  logo: string
  title: string
}

const Card: React.FC<CardProps> = ({ text, logo, title }) => {
  return (
    <div className="group flex flex-col items-center bg-black bg-opacity-40 p-6 rounded-lg shadow-lg md:w-40 md:h-60 w-32 h-48 hover:w-80 transition-all duration-100 border-2 border-white ">
      <div
        className="relative flex flex-col items-center justify-center
      "
      >
        <img
          src={logo}
          alt="logo"
          className="md:w-12 md:h-12 w-12 h-12 mx-auto"
        />
        <h3 className="text-white text-sm mt-2">{title}</h3>
      </div>
      <div className="mt-4 text-center flex flex-col items-center text-sm md:text-md ">
        <p className="text-white text-lg group-hover:block hidden">{text}</p>
        <button className="bg-emerald-500 h-6 text-xs w-20 md:h-8 md:w-24 md:text-sm hover:bg-green-600 text-white px-2 py-1 rounded-xl mt-1 focus:outline-none group-hover:block hidden">
          Go
        </button>
      </div>
    </div>
  )
}

export default Card
