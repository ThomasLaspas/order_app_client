const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {currentPage === 1 ? null : (
          <li>
            <button onClick={() => paginate(1)}>&laquo;</button>
          </li>
        )}

        <li className="page-item">
          <a className="page-link">{currentPage}</a>
        </li>

        {currentPage === pageNumbers.length ? null : (
          <li>
            <button onClick={() => paginate(pageNumbers.length)}>
              &raquo;
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
