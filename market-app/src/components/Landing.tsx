import React from "react"
import bgvideo from "../assets/bgvideo.mp4"
import { Typewriter } from "react-simple-typewriter"
import Card from "./Card"
import carddata from "../utils/carddata"

const Landing: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        src={bgvideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>
      <div className="absolute top-0 right-0 w-full h-full flex items-start justify-start bg-black bg-opacity-50 p-4 z-10">
        <div className="text-white text-left max-w-4xl mr-10 mt-10 px-4">
          <h1 className="text-4xl sm:text-6xl font-bold">
            <Typewriter
              words={[
                "Welcome to BlockMarket. Transparent, Decentralized, and Secure",
              ]}
              loop={true}
              typeSpeed={70}
              deleteSpeed={5}
              delaySpeed={1000}
            />
          </h1>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 mt-5 z-20 flex flex-row gap-4 p-4">
          {carddata.cards.map((card, index) => (
            <Card
              key={index}
              text={card.text}
              logo={card.logo}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Landing
