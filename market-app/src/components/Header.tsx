import React, { useState } from "react"
import logo from "../assets/logo.svg"
import searchLogo from "../assets/search.svg"
import cart from "../assets/cart.svg"
import { ConnectButton } from "thirdweb/react"

const Header: React.FC = () => {
  const [search, setSearch] = useState<boolean>(false)

  const toggleSearch = () => {
    setSearch(!search)
  }

  return (
    <div className="flex flex-wrap items-center p-2 gap-4 px-5 sticky top-0 z-50 bg-black bg-opacity-90">
      <div className="flex items-center justify-center w-16 h-16 my-2 mr-8">
        <a href="landing">
          <img
            src={logo}
            alt="logo"
            className="h-14 w-14 hover:rotate-180 transition-transform duration-100"
          />
        </a>
      </div>
      <nav className="md:flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center w-full sm:w-auto hidden">
        <a
          href="/shop"
          className="text-lg sm:text-xl text-slate-200 epilogue hover:text-purple-300 transition-colors duration-200"
        >
          Shop
        </a>
        <a
          href="/sell"
          className="text-lg sm:text-xl text-slate-200 epilogue hover:text-purple-300 transition-colors duration-200"
        >
          Sell
        </a>
        <a
          href="/orders"
          className="text-lg sm:text-xl text-slate-200 epilogue hover:text-purple-300 transition-colors duration-200"
        >
          View Orders
        </a>
        <a
          href="/categories"
          className="text-lg sm:text-xl text-slate-200 epilogue hover:text-purple-300 transition-colors duration-200"
        >
          Categories
        </a>
        <a
          href="/register"
          className="text-lg sm:text-xl text-slate-200 epilogue hover:text-purple-300 transition-colors duration-200"
        >
          Register
        </a>
      </nav>
      <div className="flex ml-auto items-center gap-4">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={toggleSearch}
        >
          <img src={searchLogo} alt="search" className="w-6 h-6" />
        </div>
        <input
          type="text"
          className={`h-7 w-36 sm:w-56 p-2 border-none outline-none bg-gray-300 rounded-lg transition-all duration-75 text-black font-semibold ${
            search ? "block" : "hidden"
          }`}
          placeholder="Search..."
        />
        <a
          href="/login"
          className="text-lg sm:text-xl epilogue text-slate-200 hover:text-purple-300 transition-colors duration-200"
        >
          Connect
        </a>
        <a
          href="/cart"
          className="text-lg sm:text-xl epilogue text-slate-200 hover:text-purple-300 transition-colors duration-200"
        >
          <img src={cart} alt="cart" className="w-6 h-6" />
        </a>
      </div>
    </div>
  )
}

export default Header
