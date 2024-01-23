import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const TopBar = ({ isDetailPage, children }) => {
  return (
    <div>
      <div
        className={`bg-[#5051f9] flex  md:justify-between items-center p-2 text-white w-full min-h-[55px] z-50 md:flex-row ${
          !isDetailPage && "flex-col"
        } `}
      >
        <div className="md:ml-2 ml-1 flex justify-start w-[100%]">
          <Link
            to="/"
            className="md:mr-4 mr-1 text-white md:ml-2 ml-1 text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className=" text-white text-sm ml-5 md:ml-10 font-medium"
          >
            Favorites
          </Link>
        </div>
        {!isDetailPage && (
          <div className="mr-4">
            <SearchBar />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default TopBar;
