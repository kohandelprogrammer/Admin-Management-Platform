import { useSearchParams } from "react-router-dom";

type Props = {
  totalPages: number;
  currentPage: number;
};

export default function Pagination({ totalPages, currentPage }: Props) {
  const [, setSearchParams] = useSearchParams();

  const getPaginationPages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const paginationPages = getPaginationPages(currentPage, totalPages);

  const changePage = (page: number) => {
    console.log(page);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(page));

      return params;
    });
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {paginationPages.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return <span key={index}>...</span>;
        }

        return (
          <button
            key={`${pageNumber} index-${index}`}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => changePage(pageNumber as number)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
