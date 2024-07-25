import kompozant from "../Kompozant.png";
import Category from "./Category";
import React, { useEffect, useState } from "react";
import {
    axiosArticles,
    axiosArticlesbyCategory,
    axiosArticlesbySubCategory,
    axiosCategories,
    axiosSubCategories
} from "../apiCall";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useCart } from "../Contexts/CartContext";
import Placeholder from "../placeholder.png";
import { useAuth } from "../Contexts/AuthContext";

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [articleSuggestions, setArticleSuggestions] = useState([]);
    const [inputFocused, setInputFocused] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const { id_category, id_subcategory, id } = useParams();
    const [loading, setLoading] = useState(true);
    const { totalItems } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentURL, setCurrentURL] = useState('');
    const { user } = useAuth();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartData, setCartData } = useCart();
    const { removeFromCart, clearCart } = useCart();

    useEffect(() => {
        const getCategories = async () => {
            try {
                let response;
                if (id_category) {
                    response = await axiosSubCategories(id_category);
                } else {
                    response = await axiosCategories();
                }
                setCategories(response);
                setLoading(false);
            } catch (error) {
                console.log("Erreur lors de la récupération des articles:", error);
                setLoading(false);
            }
        };
        getCategories();
    }, [id_category]);

    useEffect(() => {
        const getSuggestions = async () => {
            try {
                let response;
                if (searchTerm.length < 3) {
                    setInputFocused(false);
                }
                else {
                    setInputFocused(true);
                    if (id_category && id_subcategory && id) {
                        response = await axiosArticles(1, searchTerm, "views desc");
                    } else if (id_category && id_subcategory) {
                        response = await axiosArticlesbySubCategory(id_category, id_subcategory, 1, searchTerm, "views desc");
                    } else if (id_category) {
                        response = await axiosArticlesbyCategory(id_category, 1, searchTerm, "views desc");
                    } else {
                        response = await axiosArticles(1, searchTerm, "views desc");
                    }
                    setArticleSuggestions(response);
                }

            } catch (error) {
                console.log("Erreur lors de la récupération des articles:", error);
            }
        };
        getSuggestions();
    }, [id_category, id_subcategory, searchTerm]);


    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };
    const untoggleSidebar = () => {
        if (sidebar) {
            setSidebar(false);
        }
    };

    const calculateTotalPrice = () => {
        return cartData.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toFixed(2);
    };

    const getItemCounts = () => {
        const itemCounts = {};
        cartData.forEach((item) => {
            if (itemCounts[item.id]) {
                itemCounts[item.id].count++;
            } else {
                itemCounts[item.id] = { ...item, count: 1 };
            }
        });
        return Object.values(itemCounts);
    };

    const search = (e) => {
        e.preventDefault();
        setLoading(true);

        const url = new URL(window.location.href);
        url.searchParams.set('name', searchTerm);
        setCurrentURL(url.href);
        window.location.href = url.href;
    }

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeInputFocused = () => {
        setTimeout(() => {
            setInputFocused(false);
        }, 200);
    }

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <header
                onClick={untoggleSidebar}
                className={
                    "flex flex-col items-center justify-center md:flex-row bg-[#393939]"
                }
            >
                <a href={"/"} className={"pl-4"}>
                    <img
                        src={kompozant}
                        className={"w-[250px] h-[50px] object-cover bg-clip-content"}
                        alt="logo"
                    />
                </a>
                <div
                    className={"flex w-full flex-col self-center text-white gap-4 p-4"}
                >
                    <div className={"flex flex-col md:flex-row w-full gap-4 px-8"}>
                            <button
                                className="flex bg-[#1E1E1E] rounded-full items-center px-8 py-2 gap-2"
                                onClick={toggleSidebar}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <g clipPath="url(#clip0_11_28)">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 3.75C0 3.55109 0.0790176 3.36032 0.21967 3.21967C0.360322 3.07902 0.551088 3 0.75 3H15.25C15.4489 3 15.6397 3.07902 15.7803 3.21967C15.921 3.36032 16 3.55109 16 3.75C16 3.94891 15.921 4.13968 15.7803 4.28033C15.6397 4.42098 15.4489 4.5 15.25 4.5H0.75C0.551088 4.5 0.360322 4.42098 0.21967 4.28033C0.0790176 4.13968 0 3.94891 0 3.75ZM0 8C0 7.80109 0.0790176 7.61032 0.21967 7.46967C0.360322 7.32902 0.551088 7.25 0.75 7.25H15.25C15.4489 7.25 15.6397 7.32902 15.7803 7.46967C15.921 7.61032 16 7.80109 16 8C16 8.19891 15.921 8.38968 15.7803 8.53033C15.6397 8.67098 15.4489 8.75 15.25 8.75H0.75C0.551088 8.75 0.360322 8.67098 0.21967 8.53033C0.0790176 8.38968 0 8.19891 0 8ZM0.75 11.5C0.551088 11.5 0.360322 11.579 0.21967 11.7197C0.0790176 11.8603 0 12.0511 0 12.25C0 12.4489 0.0790176 12.6397 0.21967 12.7803C0.360322 12.921 0.551088 13 0.75 13H15.25C15.4489 13 15.6397 12.921 15.7803 12.7803C15.921 12.6397 16 12.4489 16 12.25C16 12.0511 15.921 11.8603 15.7803 11.7197C15.6397 11.579 15.4489 11.5 15.25 11.5H0.75Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11_28">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Menu
                            </button>
                        <form onSubmit={search}
                            className={"flex bg-[#4b4b4b] rounded-full w-full items-center"}
                        >
                            <input
                                className={"bg-transparent w-full text-white px-8 focus:outline-0"}
                                type="text"
                                placeholder="recherche ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setInputFocused(true)}
                                onBlur={closeInputFocused}
                            />
                            {inputFocused && articleSuggestions.length > 0 && (
                                <div
                                    className={
                                        "absolute drop-shadow-lg z-10 top-52 md:top-16 flex flex-col justify-start flex-wrap bg-[#4b4b4b] rounded-2xl px-4 mr-10 md:mr-0 py-6 gap-4"
                                    }
                                >
                                    {articleSuggestions.map((suggestion, index) => {
                                        let pricediscounted = "";

                                        if (suggestion.discount) {
                                            pricediscounted = (suggestion.price - (suggestion.discount * suggestion.price) / 100);
                                        }

                                        return (
                                        <a key={index} className={"z-20 hover:drop-shadow-2xl opacity-60 hover:opacity-100"}
                                           href={`/${suggestion.category.id}/${suggestion.subCategory.id}/${suggestion.id}/${suggestion.name}`}>
                                            <div key={index}
                                                className={"flex flex-wrap justify-between items-center md:gap-4 break-all"}>
                                                <div className={"flex items-center md:gap-4"}>
                                                    {suggestion.images.length > 0 ? (
                                                        <img
                                                            src={`http://localhost:3000/products/images/${suggestion.images[0].image}`}
                                                            className="w-10 h-10 object-contain"
                                                            alt={`${index + 1}`}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={Placeholder}
                                                            className="w-10 h-10 object-contain"
                                                            alt="Placeholder"
                                                        />
                                                    )}
                                                    <h1 className={"text-sm max-w-md"}>{suggestion.name}</h1>
                                                </div>
                                                {pricediscounted !== "" ?
                                                    <div className={"flex gap-4"}>
                                                        <p className={"font-semibold text-[#f553c7] hover:none hover:decoration-0"}>{pricediscounted.toFixed(2)} €</p>
                                                        <div className={"flex items-center gap-2"}>
                                                            <p className={"line-through hover:none"}>{suggestion.price.toFixed(2)} €</p>
                                                            <p className="text-[#f553c7] hover:none">-{suggestion.discount}%</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    <p className={"font-semibold hover:none hover:decoration-0"}>{suggestion.price.toFixed(2)} €</p>
                                                }
                                            </div>
                                        </a>
                                        );
                                    })}
                                </div>
                            )}
                            <button type={"submit"}
                                className={"bg-transparent text-white px-8 hover:text-[#f553c7]"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="33"
                                    height="33"
                                    viewBox="0 0 33 33"
                                    fill="currentcolor"
                                >
                                    <path
                                        d="M30.825 28.75L22.1625 20.0875C21.475 20.6375 20.6844 21.0729 19.7906 21.3937C18.8969 21.7146 17.9458 21.875 16.9375 21.875C14.4396 21.875 12.3257 21.0097 10.596 19.279C8.86625 17.5483 8.00092 15.4345 8 12.9375C8 10.4396 8.86533 8.32575 10.596 6.596C12.3267 4.86625 14.4405 4.00092 16.9375 4C19.4354 4 21.5493 4.86533 23.279 6.596C25.0088 8.32667 25.8741 10.4405 25.875 12.9375C25.875 13.9458 25.7146 14.8969 25.3937 15.7906C25.0729 16.6844 24.6375 17.475 24.0875 18.1625L32.75 26.825L30.825 28.75ZM16.9375 19.125C18.6562 19.125 20.1174 18.5232 21.321 17.3196C22.5246 16.116 23.1259 14.6553 23.125 12.9375C23.125 11.2188 22.5232 9.75758 21.3196 8.554C20.116 7.35042 18.6553 6.74908 16.9375 6.75C15.2188 6.75 13.7576 7.35179 12.554 8.55538C11.3504 9.75896 10.7491 11.2197 10.75 12.9375C10.75 14.6562 11.3518 16.1174 12.5554 17.321C13.759 18.5246 15.2197 19.1259 16.9375 19.125Z"
                                    />
                                </svg>
                            </button>
                        </form>
                        <div className={"flex justify-between gap-4"}>
                            {user ? (
                                <a className="flex text-lg items-center gap-2 md:w-max" href={`/profil`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 14c4.14 0 7.5 1.57 7.5 3.5V20H4v-2.5c0-1.93 3.36-3.5 7.5-3.5m6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13v-1.5M11.5 5A3.5 3.5 0 0 1 15 8.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 8.5A3.5 3.5 0 0 1 11.5 5m0 1A2.5 2.5 0 0 0 9 8.5a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 14 8.5A2.5 2.5 0 0 0 11.5 6Z"/></svg>
                                    <p className={"hidden lg:flex"}>Bonjour, {user.first_name} {user.last_name}</p>
                                </a>                            ) : (
                                <a className="flex text-lg items-center gap-2 hover:text-[#f553c7] md:w-max" href="/connect">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 14c4.14 0 7.5 1.57 7.5 3.5V20H4v-2.5c0-1.93 3.36-3.5 7.5-3.5m6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13v-1.5M11.5 5A3.5 3.5 0 0 1 15 8.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 8.5A3.5 3.5 0 0 1 11.5 5m0 1A2.5 2.5 0 0 0 9 8.5a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 14 8.5A2.5 2.5 0 0 0 11.5 6Z"/></svg>
                                    <p className={"hidden lg:flex"}>Bonjour, identifiez-vous</p>
                                </a>
                            )}


                            <div className="cart-icon relative">
                                <div
                                    className="cart-icon relative"
                                    onMouseEnter={toggleCart}
                                    onMouseLeave={toggleCart}
                                >
                                    <a href="/basket" className={"hover:text-[#f553c7]"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 20 20"><path fill="currentColor" d="M2.997 3.496a.5.5 0 0 1 .5-.5h.438c.727 0 1.145.473 1.387.945c.165.323.284.717.383 1.059H16a1 1 0 0 1 .962 1.272l-1.496 5.275A2 2 0 0 1 13.542 13H8.463a2 2 0 0 1-1.93-1.473l-.642-2.355a.513.513 0 0 1-.01-.032L4.85 5.643l-.1-.337c-.1-.346-.188-.652-.32-.909c-.159-.31-.305-.4-.496-.4h-.438a.5.5 0 0 1-.5-.5ZM6.845 8.87l.653 2.396a1 1 0 0 0 .965.736h5.08a1 1 0 0 0 .961-.727L16 6H6l.845 2.869ZM10 15.499a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0Zm6 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0Z"/></svg>
                                    </a>
                                    {isCartOpen && (
                                        <div className="drop-shadow-xl z-10 absolute top-[100%] right-0 bg-white text-black rounded-md px-2 py-2 min-w-[450px]">
                                            <h1 className="text-2xl font-semibold mb-4">Votre Panier :</h1>
                                            {cartData.length === 0 ? (
                                                <p className="text-lg">Votre panier est vide.</p>
                                            ) : (
                                                <div>
                                                    {getItemCounts().map((item) => {
                                                        let carPriceDiscounted = "";

                                                        if (item.discount) {
                                                            carPriceDiscounted = (item.price - (item.discount * item.price) / 100);
                                                        }

                                                        return (
                                                            <div key={item.id} className="flex items-center border-b border-gray-300 py-4">
                                                                <img src={item.img} alt='img' className="w-16 h-16 object-contain rounded-md mr-4" />
                                                                <div className="flex-1">
                                                                    <a href={`/${item.id_category}/${item.id_subcategory}/${item.id}/${item.name}`} className="hover:underline text-md uppercase">{item.name}</a>
                                                                    <p className="text-sm">Quantité : {item.count}</p>
                                                                    {carPriceDiscounted !== "" ? (
                                                                        <div className="flex gap-4">
                                                                            <p className="text-[#f553c7] text-md font-semibold">{carPriceDiscounted.toFixed(2)} €</p>
                                                                            <div className="flex items-baseline gap-2">
                                                                                <p className="text-md line-through">{item.price.toFixed(2)} €</p>
                                                                                <p className="text-xs text-[#f553c7]">-{item.discount}%</p>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <p className="text-md font-semibold">{item.price.toFixed(2)} €</p>
                                                                    )}
                                                                </div>
                                                                <button
                                                                    className="hover:text-red-500 px-4 py-2 text-lg md:text-md"
                                                                    onClick={() => removeFromCart(item.id)}
                                                                >
                                                                    Supprimer
                                                                </button>
                                                            </div>
                                                        );
                                                    })}

                                                    {/*Total du panier + boutton accéder au panier*/}
                                                    <div className="flex mt-4 justify-between">
                                                        <h2 className="text-xl uppercase">Total : {calculateTotalPrice()} €</h2>
                                                    <a href="/basket" className="text-xl font-semibold text-[#f553c7] hover:text-black">Accéder au Panier</a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {totalItems > 0 && (
                                    <a href={"/basket"} className="absolute text-sm -top-2 -right-2 bg-[#f553c7] text-white rounded-full px-1">
                                        {totalItems}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header >
            <Sidebar
                id_category={id_category}
                sidebar={sidebar}
                categories={categories}
            />
        </>
    )
        ;
}
