import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";



//https://www.youtube.com/watch?v=ZX3qt0UWifc   -Youtube video on pagination
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination className="d-flex justify-content-center">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={!isAdmin ? (keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`) : `/admin/productlist/${x+1}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>

          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;

// Add this to index.css => to make pagination component in center

// pagination {
//   display: flex;
//  justify-content: center;
// }
