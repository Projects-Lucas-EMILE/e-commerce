import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { axiosMakePayment } from "../apiCall";
import { useCart } from "../Contexts/CartContext";
import { isAfter, addYears } from 'date-fns';

const Bank = () => {
    const { cartData, clearCart } = useCart();
    const location = useLocation();
    const [error, setError] = useState('');
    const total = location.state?.total || "0.00";
    const addressDetails = location.state?.addressDetails || {};

    const [formData, setFormData] = useState({
        cardNumber: '',
        billingAddress: '',
        expiryDate: '',
        cvv: '',
    });

    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "expiryDate" && value.length > 5) {
            return;
        }
        if (name === "expiryDate" && value.length === 2 && !value.includes("/")) {
            setFormData({ ...formData, [name]: value + "/" });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const Paiement = () => {
        window.location.href = '/';
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const [expiryMonth, expiryYear] = formData.expiryDate.split('/');
        const expiryDate = new Date(`20${expiryYear}`, expiryMonth - 1);

        const threeYearsFromNow = addYears(currentDate, 3);
        if (expiryDate >= currentDate && expiryDate <= threeYearsFromNow) {
            const paymentData = {
                cardNumber: formData.cardNumber,
                expiryDate: formData.expiryDate,
                cvv: formData.cvv,
                billingAddress: formData.billingAddress,
                cartData: cartData,
            };

            axiosMakePayment(paymentData)
                .then(response => {
                    setPaymentSuccess(true);
                    clearCart();
                })
                .catch(error => {
                    console.error("Erreur lors du paiement :", error);
                });
        } else {
            setError('Date d\'expiration invalide.');
        }
    };


    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 drop-shadow-lg rounded-lg w-96">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Paiement Sécurisé</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="billing-address" className="block text-sm font-medium text-gray-700">
                                Titulaire de la carte :
                            </label>
                            <input
                                type="text"
                                id="billing-address"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border border-gray-300 focus:none focus:outline-0 rounded p-3"
                            />

                            <div className="mb-4">
                                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                    Numéro de carte :
                                </label>
                                <input
                                    type="text"
                                    id="card-number"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-300 focus:none focus:outline-0 rounded p-3"
                                    minLength="16"
                                    maxLength="16"
                                    pattern="[0-9]{16}"
                                />
                            </div>


                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                                        Date d'expiration :
                                    </label>
                                    <input
                                        type="text"
                                        id="expiry-date"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        placeholder="MM/YY"
                                        required
                                        inputMode={"numeric"}
                                        className="mt-1 w-full border border-gray-300 focus:none focus:outline-0 rounded p-3"
                                        maxLength="5"
                                    />
                                    {error && <p className="text-red-500 text-xs">{error}</p>}
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                        CVV :
                                    </label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        required
                                        inputMode={"numeric"}
                                        className="mt-1 w-full border border-gray-300 focus:none focus:outline-0 rounded p-3"
                                        minLength="3" maxLength="3"
                                        pattern="[0-9]{3}"
                                    />
                                </div>
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
            {paymentSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white flex flex-col p-8 rounded-lg w-[400px] gap-6">

                        <div className="flex flex-col items-center gap-6">
                            <div className={"flex justify-center items-center gap-3"}>
                                <h1 className={"text-2xl"}>Paiement réussi !</h1>
                                <h1 className={"text-2xl font-semibold text-[#f553c7]"}>:)</h1>
                            </div>
                            <p className="mb-3">
                                Merci pour votre achat chez Kompozant ! Nous apprécions votre confiance. Votre satisfaction est notre priorité.
                            </p>
                        </div>

                        <button
                            className="test_email w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                            onClick={Paiement}
                        >
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Bank;