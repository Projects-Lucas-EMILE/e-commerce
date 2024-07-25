import React, { useState, useEffect } from "react";
import { axiosRegister } from "../apiCall";
import { useLocation, Navigate } from "react-router-dom";

export default function Register() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthdate: "",
        phone: "",
        country: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [redirectToConnect, setRedirectToConnect] = useState(false);

    useEffect(() => {
        if (location.state && location.state.email) {
            const previousEmail = location.state.email;
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: previousEmail,
            }));
        }
    }, [location.state]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid =
            formData.first_name &&
            formData.last_name &&
            formData.email &&
            formData.password &&
            formData.birthdate &&
            formData.phone &&
            formData.country;

        setValid(isFormValid);
        setSubmitted(true);

        if (isFormValid) {
            try {
                await axiosRegister(formData);
                setRedirectToConnect(true);
            } catch (error) {
                console.error("Erreur lors de l'envoi des données au backend:", error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    if (redirectToConnect) {
        return (
            <Navigate
                to="/connect"
                state={{ formData }}
            />
        );
    }

    return (
        <>
            <div className="h-1 w-full bg-[#f553c7]"></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 min-h-screen flex flex-col justify-center items-center pt-10 pb-24">
                <div className="flex flex-col md:flex-row mt-8 space-y-8 md:space-y-0 md:space-x-16">
                    <div className="flex flex-col space-y-8">
                        <img
                            className="w-[200px] md:w-[400px] object-cover shadow-lg hover:scale-110 transition-transform duration-30"
                            src="https://img.freepik.com/vecteurs-libre/illustration-salle-jeu-plat-organique_23-2148920342.jpg"
                            alt="family"
                        />
                        <img
                            className="w-[200px] md:w-[400px] object-cover shadow-lg hover:rotate-3 transition-transform duration-300"
                            src="https://img.freepik.com/premium-vector/detailed-gamer-room-with-neon-lights_52683-60423.jpg"
                            alt="family"
                        />
                        <img
                            className="w-[200px] md:w-[400px] object-cover shadow-lg hover:scale-90 transition-transform duration-30"
                            src="https://img.freepik.com/free-vector/organic-flat-design-gamer-room_52683-60824.jpg"
                            alt="family"
                        />
                    </div>
                    <form className="w-full md:w-96 flex flex-col p-8 bg-white rounded-lg shadow-md"
                        onSubmit={handleSubmit}>
                        <h1 className="text-center p-3 font-bold text-xl">
                            Créez votre compte Kompozant
                        </h1>
                        <input
                            className={`p-3 text-lg border border-gray-500 mt-3 focus:outline-0 ${submitted && !formData.first_name ? "border-red-500" : ""
                                }`}
                            type="text"
                            placeholder="Prénom"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                        {submitted && !formData.first_name && (
                            <span className="text-red-500 font-normal">
                                Veuillez entrer un prénom
                            </span>
                        )}


                        <input
                            className={`p-3 text-lg border border-gray-500 mt-3 focus:outline-0 ${submitted && !formData.last_name ? "border-red-500" : ""
                                }`}
                            type="text"
                            placeholder="Nom"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                        {submitted && !formData.last_name && (
                            <span className="text-red-500 font-normal">
                                Veuillez entrer un nom
                            </span>
                        )}

                        <input
                            className={`p-3 text-lg border border-gray-500 mt-3 focus:outline-0 ${submitted && !formData.email ? "border-red-500" : ""
                                }`}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {submitted && !formData.email && (
                            <span className="text-red-500 font-normal">
                                Veuillez entrer une adresse mail
                            </span>
                        )}

                        <input
                            className={`p-3 text-lg border border-gray-500 mt-3 focus:outline-0 ${submitted && !formData.password ? "border-red-500" : ""
                                }`}
                            type="password"
                            placeholder="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {submitted && !formData.password && (
                            <span className="text-red-500 font-normal">
                                Veuillez entrer un password
                            </span>
                        )}

                        <input
                            className={`p-3 text-lg border border-gray-500 mt-3 focus:outline-0 ${submitted && !formData.birthdate ? "border-red-500" : ""
                                }`}
                            type="date"
                            placeholder="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleInputChange}
                        />
                        {submitted && !formData.birthdate && (
                            <span className="text-red-500 font-normal">
                                Veuillez entrer un birthdate
                            </span>
                        )}

                        <input
                            className={`p-3 text-lg border border-gray-500 mt-3 focus:outline-0 ${submitted && !formData.phone ? "border-red-500" : ""
                                }`}
                            type="tel"
                            placeholder="Téléphone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {submitted && !formData.phone && (
                            <span className="text-red-500 font-normal">
                                Veuillez entrer un numero
                            </span>
                        )}

                        <input
                            className={`p-3 text-lg border border-gray-500 mt-3 focus:outline-0 ${submitted && !formData.country ? "border-red-500" : ""
                                }`}
                            type="text"
                            placeholder="Pays"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                        {submitted && !formData.country && (
                            <span className="text-red-500 font-normal">
                                Veuillez entrer un pays
                            </span>
                        )}
                        <input
                            type="submit"
                            value="Créer mon compte"
                            className="bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-24 mt-4"
                        />
                    </form>
                </div>
            </div>

        </>
    );
}