interface pagescheme {
    onPagefunction: (page: number) => void;
    currentPage: number;
    maxPage: number;
  }
  
  const Pagination = ({ onPagefunction, currentPage, maxPage }: pagescheme) => {
    return (
      <div className="mt-10 flex gap-4 justify-center items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPagefunction(currentPage - 1);
            }
          }}
          className={`px-4 py-2 rounded-md border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
          } transition`}
        >
          Prev
        </button>
  
        <div className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold">
          {currentPage}
        </div>
  
        <button
          disabled={currentPage === maxPage}
          onClick={() => {
            if (currentPage < maxPage) {
              onPagefunction(currentPage + 1);
            }
          }}
          className={`px-4 py-2 rounded-md border ${
            currentPage === maxPage
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
          } transition`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  