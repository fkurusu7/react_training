import { useEffect, useState } from 'react';

function getPaginationURI(limit = 0, skip = 0) {
  return `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,id,thumbnail`;
}

const DEFAULT_LIMIT = 15;

function Pagination() {
  const [productsData, setProductsData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalProducts / DEFAULT_LIMIT);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${getPaginationURI(
            DEFAULT_LIMIT,
            page * DEFAULT_LIMIT - DEFAULT_LIMIT
          )}`,
          {
            signal: abortController.signal,
          }
        );
        const jsonData = await response.json();
        setProductsData(jsonData.products);
        setTotalProducts(jsonData.total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    return () => {
      abortController.abort();
    };
  }, [page]);

  return (
    <div className='pagination'>
      <h1>Pagination</h1>
      <h2>Total products: {totalProducts}</h2>
      <div className='pagination__items'>
        {productsData.length &&
          productsData.map((product) => (
            <div key={product.id} className='pagination__item'>
              <img src={product.thumbnail} alt='Product Image' />
              <h4>{product.title}</h4>
            </div>
          ))}
      </div>

      {totalProducts > DEFAULT_LIMIT && (
        <div className='pagination__pages'>
          <span
            className={`${page > 1 ? '' : 'pagination__page-disabled'}`}
            onClick={() => setPage(page - 1)}
          >
            prev
          </span>
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <span
              key={pageIdx + 1}
              className={`${
                page === pageIdx + 1 ? 'pagination__page-selected' : ''
              }`}
              onClick={() => setPage(pageIdx + 1)}
            >
              {pageIdx + 1}
            </span>
          ))}
          <span
            className={`${
              page < totalPages ? '' : 'pagination__page-disabled'
            }`}
            onClick={() => setPage(page + 1)}
          >
            next
          </span>
        </div>
      )}
    </div>
  );
}

export default Pagination;
