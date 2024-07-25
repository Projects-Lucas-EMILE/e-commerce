import React, { useState } from "react";
import { axiosLogin } from "../apiCall";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Connect = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // New state variable for error message
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosLogin(email, password);
            const sessionId = response["session_id"];
            localStorage.setItem("session_id", sessionId);
            login(response["user_data"]);
        } catch (error) {
            setError("Adresse email ou mot de passe incorrect. Veuillez vérifier vos informations et réessayer."); // Set the error message
        }
    };

    const handleCreateAccountClick = () => {
        const emailInput = document.querySelector('form.w-full:nth-child(3) > input:nth-child(1)');
        const email = emailInput.value;
        sessionStorage.setItem("previousEmail", email);
        navigate("/register", { state: { email } });
    };

    return (
        <>
            <div className={"h-2 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex-col w-full justify-center items-center gap-8 py-32">
                <div className={"flex flex-col md:flex-row w-full justify-center items-center gap-16 p-8"}>
                    <div className="flex flex-col items-center w-full">
                        <h3 className="text-2xl font-semibold mb-4">Déjà Client ?</h3>
                        {error && (
                            <div className="bg-red-200 p-2 rounded-md w-full flex justify-center items-center">
                                {error}
                            </div>

                        )}
                        <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-70 p-3 border border-gray-300 focus:none focus:outline-0 rounded mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                required
                                className="w-70 p-3 border border-gray-300 rounded mb-3 focus:outline-0"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="submit"
                                value="Me Connecter"
                                className="w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                            />                        </form>
                    </div>

                    <div className="flex flex-col items-center w-full">
                        <h3 className="text-2xl font-semibold mb-4">Nouveau client ?</h3>
                        <p className="mb-3">
                            Afin de profiter de tous les avantages de Kompozant, des offres exclusives, d'avoir un suivi
                            optimum de vos commandes, il suffit d'un clic :
                        </p>

                        <form className="w-full flex flex-col">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-70 p-3 border border-gray-300 rounded mb-3 focus:outline-0"
                            />
                            <input
                                type="submit"
                                value="Créer mon compte"
                                className="test_email w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                                onClick={handleCreateAccountClick}
                            />
                        </form>                    </div>
                </div>
            </div>
        </>
    );
};

export default Connect;