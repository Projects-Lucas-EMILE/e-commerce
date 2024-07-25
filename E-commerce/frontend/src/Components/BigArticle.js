import React, {useEffect, useState} from "react";
import {useCart} from "../Contexts/CartContext";
import Placeholder from "../placeholder.png";
import "./BigArticle.css"; // Fix Later

export default function BigArticle({
                                       id,
                                       img,
                                       name,
                                       desc,
                                       price,
                                       id_category,
                                       category,
                                       id_subcategory,
                                       sub,
                                       features,
                                       weight,
                                       stock,
                                       images,
                                       discount
                                   }) {

    const [activeIndex, setActiveIndex] = useState(0);
    const stockText = stock < 1 ? "Rupture de stock." : `Stock : ${stock}`;
    const stockTextColor = stock < 1 ? "text-[#f553c7]" : "text-green-500";
    const [quantity, setQuantity] = useState(1);
    const quantityOptions = Array.from({length: Math.min(5, stock)}, (_, index) => index + 1);
    const { cartData, addToCart } = useCart(); // Add setCartData
    const [isModalOpen, setModalOpen] = useState(false);

    const GuestOrder = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleAddToCart = () => {
        const totalQuantityInCart = cartData.reduce((total, item) => {
            if (item.id === id) {
                return total + item.quantity;
            }
            return total;
        }, 0);

        const remainingSpace = Math.min(5, stock) - totalQuantityInCart;

        if (quantity > remainingSpace || totalQuantityInCart >= Math.min(5, stock)) {
            GuestOrder();
            return;
        }

        for (let i = 0; i < quantity; i++) {
            const item = {
                id,
                id_category,
                id_subcategory,
                img,
                name,
                price,
                quantity: 1,
                weight,
                discount,
            };
            addToCart(item);
        }
    };


    const handleCarouselClick = (next) => {
        const totalImages = images.length;
        setActiveIndex((prevIndex) => {
            if (next) {
                return (prevIndex + 1) % totalImages;
            } else {
                return (prevIndex - 1 + totalImages) % totalImages;
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleCarouselClick(true);
        }, 5000);

        return () => clearInterval(interval);
    });

    let pricediscounted = "";
    if (discount) {
        pricediscounted = (price - (discount * price) / 100);
    }

    return (

        <div className="w-full flex flex-col md:flex-row min-h-screen mt-12">
            <div className="w-full md:w-1/2">
                <div className="relative h-96 md:h-96">
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <div
                                key={index}
                                className={`duration-700 ease-in-out ${index === activeIndex ? "block" : "hidden"
                                }`}
                                data-carousel-item={index === activeIndex ? "active" : ""}
                            >
                                <img
                                    src={`http://localhost:3000/products/images/${image.image}`}
                                    className="absolute w-auto h-full top-0 left-0 right-0 bottom-0 m-auto object-contain"
                                    alt={`${index + 1}`}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="duration-700 ease-in-out block">
                            <img
                                src={Placeholder}
                                className="absolute w-auto h-full top-0 left-0 right-0 bottom-0 m-auto object-contain"
                                alt="Placeholder"
                            />
                        </div>
                    )}
                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                data-carousel-prev
                                onClick={() => handleCarouselClick(false)}
                            >
                <span
                    className="mx-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 dark:bg-white/30 group-hover:bg-[#f553c7] dark:group-hover:bg-[#f553c7] dark:group-hover:text-black group-active:bg-black group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 1 1 5l4 4"/>
                  </svg>
                  <span className="sr-only m">Previous</span>
                </span></button>
                            <button
                                type="button"
                                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                data-carousel-next
                                onClick={() => handleCarouselClick(true)}
                            >
                <span
                    className="mx-11 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 dark:bg-white/30 group-hover:bg-[#f553c7] dark:group-hover:bg-[#f553c7] dark:group-hover:text-black group-active:bg-black group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full flex flex-col md:w-1/2 mt-6">
                <div className="flex-col gap-4">
                    <h1 className="text-3xl font-semibold">{name}</h1>
                    <div className="flex gap-4 items-baseline">
                        <a href={`/${id_category}`} className="text-2xl text-[#f553c7]">
                            {category}
                        </a>
                        <a href={`/${id_category}/${id_subcategory}`} className="text-lg">
                            {sub}
                        </a>
                    </div>
                    <p className="text-lg font-light mt-4">{desc}</p>
                    <label className={"flex items-center gap-2"}>
                        Quantité :
                    <select
                        className="w-16 px-2 py-1 text-lg border rounded-md"
                        value={quantity}
                        onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            setQuantity(newQuantity);
                        }}
                    >
                        {quantityOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    </label>
                    {pricediscounted !== "" ? (
                        <div className={"flex flex-col md:flex-row items-baseline gap-4 mt-4"}>
                            <h3 className="text-5xl font-semibold text-[#f553c7]">
                                {price.toFixed(2)} €
                            </h3>
                            <div className={"flex items-baseline gap-2"}>
                                <h3 className="text-3xl line-through">{price.toFixed(2)} €</h3>
                                <h3 className="text-3xl text-[#f553c7]">-{discount}%</h3>
                            </div>
                        </div>
                    ) : (
                        <h3 className="text-5xl font-semibold mt-4">
                            {price.toFixed(2)} €
                        </h3>
                    )}
                    <h3 className={`text-md mt-4 ${stockTextColor}`}>
                        {stockText}
                    </h3>

                    <button
                        className={`bg-[#f553c7] mt-2 disabled:bg-neutral-500 flex items-center gap-4 px-4 py-2 rounded-2xl text-xl text-white hover:bg-black`}
                        disabled={stock < 1}
                        onClick={handleAddToCart}
                    >
                        Ajouter au panier
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 72 72"
                            fill="none"
                        >
                            <path
                                d="M60.75 16.875H50.5772C50.2803 13.2128 48.6159 9.79645 45.9149 7.30553C43.2139 4.81462 39.6742 3.43162 36 3.43162C32.3258 3.43162 28.7861 4.81462 26.0851 7.30553C23.3841 9.79645 21.7197 13.2128 21.4228 16.875H11.25C9.75816 16.875 8.32742 17.4676 7.27252 18.5225C6.21763 19.5774 5.625 21.0082 5.625 22.5V56.25C5.625 57.7418 6.21763 59.1726 7.27252 60.2275C8.32742 61.2824 9.75816 61.875 11.25 61.875H60.75C62.2418 61.875 63.6726 61.2824 64.7275 60.2275C65.7824 59.1726 66.375 57.7418 66.375 56.25V22.5C66.375 21.0082 65.7824 19.5774 64.7275 18.5225C63.6726 17.4676 62.2418 16.875 60.75 16.875ZM36 10.125C37.8935 10.1252 39.7236 10.8076 41.1549 12.0473C42.5862 13.287 43.5229 15.0009 43.7934 16.875H28.2066C28.4771 15.0009 29.4138 13.287 30.8451 12.0473C32.2764 10.8076 34.1065 10.1252 36 10.125ZM59.625 55.125H12.375V23.625H21.375V27C21.375 27.8951 21.7306 28.7535 22.3635 29.3865C22.9964 30.0194 23.8549 30.375 24.75 30.375C25.6451 30.375 26.5036 30.0194 27.1365 29.3865C27.7694 28.7535 28.125 27.8951 28.125 27V23.625H43.875V27C43.875 27.8951 44.2306 28.7535 44.8635 29.3865C45.4965 30.0194 46.3549 30.375 47.25 30.375C48.1451 30.375 49.0035 30.0194 49.6365 29.3865C50.2694 28.7535 50.625 27.8951 50.625 27V23.625H59.625V55.125Z"
                                fill="white"
                            />
                        </svg></button>
                </div>
                <div className={"flex-col gap-4 mt-20"}>
                    <h1 className={"text-xl"}>Caractéristiques :</h1>
                    <p>{features}</p>
                    <h2 className={"text-lg"}>Poids : {weight}kg</h2>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white flex flex-col gap-4 w-full md:w-[400px] p-8 rounded-lg">

                            <h3 className="text-2xl font-semibold">Ajout au panier impossible</h3>
                            <p>Vous avez dépassé la quantité maximale commandable pour ce produit.</p>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold mt-4"
                                onClick={() => closeModal()}
                            >
                                Annuler
                            </button>
                    </div>
                </div>
            )
            }
        </div>
    );
}