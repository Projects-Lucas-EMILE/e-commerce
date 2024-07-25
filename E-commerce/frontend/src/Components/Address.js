import React, {useState} from "react";
import {useCart} from "../Contexts/CartContext";
import {useNavigate} from "react-router-dom";

export default function Address() {
    const {cartData} = useCart();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullName: "",
        streetAddress: "",
        city: "",
        country: "",
        postalCode: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can add logic here to save the address and proceed with the order
        navigate("/checkout", { state: { address: address } });
    };

    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div
                className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8  drop-shadow-lg rounded-lg w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Coordonnées de livraison</h1>
                    {cartData.length === 0 ? (
                        <p className="text-lg">Votre panier est vide.</p>
                    ) : (
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                        Nom complet
                                    </label>
                                    <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={address.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                                    Adresse de livraison
                                </label>
                                <input
                                    type="text"
                                    id="streetAddress"
                                    name="streetAddress"
                                    value={address.streetAddress}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                        Code postal
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                        pattern="[0-9]{5}"
                                    />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    Ville
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={address.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Pays
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={address.country}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                    />
                            </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#f553c7]"
                                >
                                    Continuer vers la commande
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
