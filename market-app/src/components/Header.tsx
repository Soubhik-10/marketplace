import React from "react";

const Header: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black text-slate-100">
      <div className="flex flex-row p-2 gap-2 px-5 sticky top-0 z-50">
        <div className="flex items-center justify-center p-2 w-12 h-12 my-2 ml-2 mr-8">
          Logo
        </div>
        <nav className="flex flex-row gap-8 justify-center p-2 poppins-semibold">
          <div className="flex flex-row items-center gap-8">
            <a
              href="/login"
              className="block relative text-xl uppercase text-slate-200 hover:text-purple-300"
            >
              Shop
            </a>
            <a
              href="/sell"
              className="block relative text-xl uppercase text-slate-200 hover:text-purple-300"
            >
              Sell
            </a>
            <a
              href="/orders"
              className="block relative text-xl uppercase text-slate-200 hover:text-purple-300"
            >
              View Orders
            </a>
            <a
              href="/categories"
              className="block relative text-xl uppercase text-slate-200 hover:text-purple-300"
            >
              Categories
            </a>
          </div>
        </nav>
        <div className="flex flex-row ml-auto items-center gap-2">
          <div className="flex items-center justify-center mt-3">Search</div>
          <input
            type="text"
            className="h-6 w-36 p-2 m-2 mt-5 border-none outline-none bg-gray-300 rounded-lg text-black"
            placeholder="Search..."
          />
          <a
            href="/login"
            className="block relative text-xl uppercase text-slate-200 hover:text-purple-300 mt-3 ml-2"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
