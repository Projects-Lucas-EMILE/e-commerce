import React, { useEffect, useState } from "react";
import Placeholder from "../placeholder.png";
import SmallArticle from "./SmallArticle";
import { axiosArticlesbySubCategory } from "../apiCall";
import Loading from "./Loading";
import { useLocation, useParams } from "react-router-dom";
import BreadCrumbs from "./BreadCrumb";

export default function Article() {
    const { id_category, id_subcategory } = useParams();
    const [articles, setArticles] = useState([]);
    const [order, setOrder] = useState('views desc');
    const [currentPage, setCurrentPage] = useState(1);
    const isPreviousPageDisabled = currentPage === 1;
    const [isNextPageDisabled, setIsNextPageDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nameParam = queryParams.get("name") ? queryParams.get("name") : '';

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await axiosArticlesbySubCategory(id_category, id_subcategory, currentPage, nameParam, order);
                setArticles(response);

                const responseNextPage = await axiosArticlesbySubCategory(id_category, id_subcategory, currentPage + 1, nameParam, order);
                setIsNextPageDisabled(responseNextPage.length === 0);

                setLoading(false);
            } catch (error) {
                console.log('Erreur lors de la récupération des articles:', error);
                setLoading(false);
            }
        };
        getArticles();
    }, [currentPage, nameParam, order]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setLoading(true);
        window.scrollTo(0, 0);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            setLoading(true);
            window.scrollTo(0, 0);
        }
    };

    const handleSort = (e) => {
        e.preventDefault();
    };

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <BreadCrumbs />
            <div className="min-h-screen mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {articles.length > 0 ? (
                    <>
                        <div className={"flex flex-col gap-12 md:gap-0 md:flex-row items-center justify-end mb-20"}>
                            <form onSubmit={handleSort} className="flex items-center mb-4 space-x-4">
                                <label htmlFor="sortSelect" className="font-semibold">
                                    Trier par:
                                </label>
                                <select
                                    id="sortSelect"
                                    value={order}
                                    onChange={(e) => setOrder(e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="views">Pertinence</option>
                                    <option value="price">Prix Croissant</option>
                                    <option value="price desc">Prix Décroissant</option>
                                </select>
                            </form>
                        </div>
                        <div
                            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {articles.map(article => (
                                <div className={"relative rounded-2xl flex basis-1/5 md:basis-1/6 flex-col"}
                                    key={article.id}>
                                    <SmallArticle
                                        key={article.id}
                                        id={article.id}
                                        img={article.images.length > 0 ? `http://localhost:3000/products/images/${article.images[0].image}` : Placeholder}
                                        name={article.name}
                                        desc={article.description}
                                        price={article.price}
                                        id_category={article.category.id}
                                        name_category={article.category.name}
                                        id_subcategory={article.subCategory.id}
                                        name_subcategory={article.subCategory.name}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center items-center mt-8 gap-20">
                            <button
                                className="text-[#f553c7] disabled:text-neutral-500 w-max flex items-center justify-center gap-4 px-4 py-2 hover:text-black"
                                onClick={handlePreviousPage}
                                disabled={isPreviousPageDisabled}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"
                                    />
                                </svg>
                            </button>
                            <p className={"text-2xl font-bold"}>{currentPage}</p>
                            <button
                                className="text-[#f553c7] disabled:text-neutral-500 w-max flex items-center justify-center gap-4 px-4 py-2 hover:text-black"
                                onClick={handleNextPage}
                                disabled={isNextPageDisabled}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </>
                ) :
                    <div className={"flex justify-center items-center gap-4"}>
                        <h1 className={"text-3xl"}>Aucun résultat</h1>
                        <h1 className={"text-3xl font-semibold text-[#f553c7]"}>:(</h1>
                    </div>
                }
            </div>
        </>
    );
}