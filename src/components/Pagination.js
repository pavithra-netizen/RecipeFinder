import React from "react";

const Pagination = ({
  PageNo,
  currentPage,
  onNextPageSelect,
  onPrevPageSelect,
}) => {
  const totalPages = Math.ceil(100 / 10);
  const isNextDisabled = PageNo >= totalPages;

  return (
    <>
      <div className="m-6 flex justify-center items-center">
        <button
          onClick={() => onPrevPageSelect(currentPage - 1)}
          className="bg-[#5051f9] text-white px-4 py-2 rounded focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
          disabled={PageNo === 1}
        >
          Prev
        </button>
        <div className="mx-2 text-black">
          {PageNo} of {totalPages}
        </div>
        <button
          onClick={() => onNextPageSelect(currentPage + 1)}
          className="bg-[#5051f9] text-white px-4 py-2 rounded focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
