import React from "react";

const Pagination = ({ linksPerPage, totalLinks, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="join">
      {pageNumbers.map((number, i) => (
        <button
          onClick={() => paginate(number)}
          key={i + 1}
          className="join-item btn btn-sm"
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
