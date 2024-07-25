import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function BreadCrumbs() {
  const location = useLocation();
  const pathSegments = location?.pathname?.split('/').filter(segment => segment !== '') || [];

  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [articleName, setArticleName] = useState('');

  useEffect(() => {
    if (pathSegments[0]) {
      fetchCategoryData(pathSegments[0])
        .then(data => {
          setCategoryName(data.name);
          if (pathSegments[1]) {
            const subCategory = data.subCategories.find(sub => sub.id.toString() === pathSegments[1]);
            if (subCategory) {
              setSubCategoryName(subCategory.name);
            }
          }
        })
        .catch(error => console.error('Error fetching category data:', error));
    }
    if (pathSegments[2]) {
      fetchArticleName(pathSegments[2])
        .then(name => setArticleName(name))
        .catch(error => console.error('Error fetching article name:', error));
    }
  }, [pathSegments]);

  async function fetchData(url) {
    const response = await fetch(`${process.env.REACT_APP_URL}${url}`);
    const data = await response.json();
    return data;
  }

  async function fetchCategoryData(categoryId) {
    return fetchData(`/category/api/${categoryId}`);
  }

  async function fetchArticleName(articleId) {
    const data = await fetchData(`/product/api/${articleId}`);
    return data.name;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex mx-2 my-2">
      <ol className="flex overflow-hidden rounded-lg border border-dark-200 text-gray-600">
        <li className="flex items-center">
          <Link to="/" className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-[#f553c7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            <span className="ms-1.5 text-xs font-medium">Home</span>
          </Link>
        </li>
        {categoryName && (
          <>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
              <Link to={`/${pathSegments[0]}`} className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-[#f553c7]">
                {categoryName}
              </Link>
            </li>
          </>
        )}
        {subCategoryName && (
          <>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
              <Link to={`/${pathSegments[0]}/${pathSegments[1]}`} className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-[#f553c7]">
                {subCategoryName}
              </Link>
            </li>
          </>
        )}
        {articleName && (
          <>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
              <span className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900">
                {articleName}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}


export default BreadCrumbs;
