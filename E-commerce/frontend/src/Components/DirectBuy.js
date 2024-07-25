import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { axiosMakePayment } from "../apiCall";
import { useCart } from "../Contexts/CartContext";



const Bank = () => {
    const { cartData, clearCart } = useCart();

    const location = useLocation();

    const total = location.state?.total || "0.00";
    const [formData, setFormData] = useState({
        cardNumber: '',
        billingAddress: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the payment data from formData and any other required information
        const paymentData = {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            billingAddress: formData.billingAddress,
            cartData: cartData,
        };

        axiosMakePayment(paymentData)
            .then(response => {
                alert('Le paiement a été validé avec succès !');
                clearCart();
            })
            .catch(error => {
                console.error("Erreur lors du paiement :", error);
            });
    };


    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 drop-shadow-lg rounded-lg w-96">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Paiement Sécurisé</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="grid-cols-2 gap-4 mb-4">

                            <div>
                                <label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                                    CVV :
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-300 focus:none focus:outline-0 rounded p-3"
                                />
                            </div>
                        </div>



                        <button
                            type="submit"
                            className="w-full py-3 px-6 w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                        >
                            Valider le paiement ({total} €)
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Bank;
