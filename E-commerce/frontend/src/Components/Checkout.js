import React from "react";
import {useCart} from "../Contexts/CartContext";
import {useLocation, useNavigate} from "react-router-dom";


export default function Checkout() {
    const {cartData} = useCart();
    const location = useLocation();
    const navigate = useNavigate();


    const calculateTotalPrice = () => {
        return cartData.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toFixed(2);
    };

    const calculateTotalDelivery = () => {
        let paystaxes = 0;
        const pays = addressDetails.country.toLowerCase();
        if (pays === "france") {
            paystaxes = 2;
        } else {
            paystaxes = 5;
        }
        const totalDelivery = cartData.reduce(
            (total, item) => total + item.weight * item.quantity,
            2
        ) + paystaxes;

        return totalDelivery.toFixed(2);
    };

    const calculateTotal = () => {
        const totalPrice = calculateTotalPrice();
        const totalDelivery = calculateTotalDelivery();
        const total = (parseFloat(totalPrice) + parseFloat(totalDelivery)).toFixed(2);
        return total;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate("/bank", { state: { total: calculateTotal(), addressDetails: addressDetails } });

    };

    const addressDetails = location.state?.address || {};

    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div
                className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 drop-shadow-lg rounded-lg w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Résumé de la commande</h1>
                    {cartData.length === 0 ? (
                        <p className="text-lg text-center">Votre panier est vide.</p>
                    ) : (
                        <div className="text-center flex flex-col gap-6">
                            <div className={"flex flex-col gap-2"}>
                                <h2 className="text-xl font-medium">Panier :</h2>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Montant du panier
                                        : {calculateTotalPrice()} €</p>
                                    <p className="text-sm font-medium text-gray-700">Frais de ports
                                        : {calculateTotalDelivery()} €</p>
                                    <p className="text-sm font-medium text-gray-700">Total : {calculateTotal()} €</p>
                                </div>
                            </div>

                            {Object.keys(addressDetails).length > 0 && (
                                <div className={"flex flex-col gap-2"}>
                                    <h2 className="text-xl font-medium">Adresse de livraison :</h2>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Nom complet
                                            : {addressDetails.fullName}</p>
                                        <p className="text-sm font-medium text-gray-700">Adresse
                                            : {addressDetails.streetAddress}, {addressDetails.postalCode} {addressDetails.city}</p>
                                        <p className="text-sm font-medium text-gray-700">Pays
                                            : {addressDetails.country}</p>
                                    </div>
                                </div>
                            )}
                                <form onSubmit={handleSubmit}>
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#f553c7]"
                                    >
                                        Procéder au paiement
                                    </button>
                                </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
