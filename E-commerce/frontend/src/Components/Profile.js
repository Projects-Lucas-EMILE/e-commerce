import React, {useState} from "react";
import {useAuth} from "../Contexts/AuthContext";

export default function Profile() {
    const {user, logout} = useAuth();
    const [commandes, setCommandes] = useState(true);
    const [profile, setProfile] = useState(false);
    const [mdp, setMdp] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    let formattedPhoneNumber = "";

    if (user) {
        const phoneNumber = user.phone.toString();

        if (phoneNumber.length === 9) {
            formattedPhoneNumber = '0' + phoneNumber;
        }
    }

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    const handleProfile = () => {
        if (profile === false) {
            setProfile(true);
            setCommandes(false);
            setMdp(false);
        } else {
            setProfile(false);
            setCommandes(true);
        }
    };

    const handleCommandes = () => {
        setCommandes(true);
        setProfile(false);
        setMdp(false);
    };

    const handleMdp = () => {
        if (mdp === false) {
            setMdp(true);
            setProfile(false);
            setCommandes(false);
        } else {
            setMdp(false);
            setProfile(true);
        }
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();
        setNewPassword("");
        setMdp(false);
        setProfile(true);
    };

    const orders = [
        {code: "3", prix: "1000", suivi: "En cours"},
        {code: "1", prix: "10", suivi: "En cours"},
        {code: "2", prix: "100", suivi: "Expédié"},
    ];

    return (
        <div className={"bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 min-h-screen"}>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="flex flex-col md:flex-row p-8 gap-4">
                {user && (
                    <div className={"bg-white rounded-2xl px-4 py-8 w-full md:w-1/3 flex flex-col text-xs gap-2"}>
                        <p className={"text-2xl font-bold mb-8"}>Bonjour, {user.first_name} {user.last_name}</p>
                        <div className={"flex flex-wrap gap-2 items-center"}>
                            <p className="text-gray-600 uppercase">Prénom :</p>
                            <p className={"text-lg"}>{user.first_name}</p>
                        </div>
                        <div className={"flex flex-wrap gap-2 items-center"}>
                            <p className="text-gray-600 uppercase">Nom :</p>
                            <p className={"text-lg"}>{user.last_name}</p>
                        </div>
                        <div className={"flex flex-wrap gap-2 items-center"}>
                            <p className="text-gray-600 uppercase">Adresse e-mail :</p>
                            <p className={"text-lg"}>{user.email}</p>
                        </div>
                        <div className={"flex flex-wrap gap-2 items-center"}>
                            <p className="text-gray-600 uppercase">Numéro de téléphone :</p>
                            <p className={"text-lg"}>{formattedPhoneNumber}</p>
                        </div>
                        <div className={"flex flex-wrap gap-2 items-center"}>
                            <p className="text-gray-600 uppercase">Date de naissance :</p>
                            <p className={"text-lg"}>{user.birthdate.date.substring(0, 10)}</p>
                        </div>
                        <div className={"flex flex-wrap gap-2 items-center"}>
                            <p className="text-gray-600 uppercase">Pays :</p>
                            <p className={"text-lg"}>{user.country}</p>
                        </div>
                        <p
                            className="text-lg cursor-pointer border-none rounded-md hover:underline my-2"
                            onClick={handleCommandes}
                        >
                            Mes Commandes
                        </p>
                        <p
                            className="text-lg cursor-pointer border-none rounded-md hover:underline my-2"
                            onClick={handleProfile}
                        >
                            Modifier mon profil
                        </p>
                        <button
                            className="bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12 mt-4"
                            onClick={handleLogout}
                        >
                            Déconnexion
                        </button>
                    </div>
                )
                }
                <div className={"bg-white rounded-2xl px-4 py-8 w-full md:w-2/3 flex flex-col gap-12 text-xs"}>
                    {commandes ? (
                        <div>
                            <p className="text-xl font-bold mb-2">Mes commandes :</p>
                            <ul>
                                {orders.map((order, index) => (
                                    <li key={index} className={"flex flex-col mb-8"}>
                                        <div className={"flex flex-col gap-2"}>
                                            <div className={"flex flex-col"}>

                                                <p>Numéro de Facture : {order.code}</p>
                                                <p>Total du Panier : {order.prix}€</p>
                                                {order.suivi === "Expédié" ? (
                                                        <p className={"text-green-500"}>Suivi de la
                                                            commande: {order.suivi}</p>)
                                                    : order.suivi === "En cours" ? (
                                                            <p className={"text-yellow-500"}>Suivi de la
                                                                commande: {order.suivi}</p>)
                                                        : (
                                                            <p>Suivi de la
                                                                commande: {order.suivi}</p>)}
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-2">
                                                <button
                                                    className="bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12"
                                                >
                                                    Suivre la commande
                                                </button>
                                                <button
                                                    className="bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12"
                                                >
                                                    Imprimer la facture
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {profile === true ? (
                        <form className={"flex flex-col gap-8"}>
                            <div className={"flex flex-col gap-4"}>
                                <div className={"flex flex-col gap-2"}>
                                    <label htmlFor="firstName" className="text-gray-600 uppercase">
                                        Prénom :
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder={user.first_name}
                                        className="border border-gray-400 rounded-md px-4 py-2"
                                    />
                                </div>
                                <div className={"flex flex-col gap-2"}>
                                    <label htmlFor="firstName" className="text-gray-600 uppercase">
                                        Nom :
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder={user.last_name}
                                        className="border border-gray-400 rounded-md px-4 py-2"
                                    />
                                </div>
                                <div className={"flex flex-col gap-2"}>
                                    <label htmlFor="firstName" className="text-gray-600 uppercase">
                                        Adresse e-mail :
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder={user.email}
                                        className="border border-gray-400 rounded-md px-4 py-2"
                                    />
                                </div>
                                <div className={"flex flex-col gap-2"}>
                                    <label htmlFor="firstName" className="text-gray-600 uppercase">
                                        Numéro de téléphone :
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder={formattedPhoneNumber}
                                        className="border border-gray-400 rounded-md px-4 py-2"
                                    />
                                </div>
                                <div className={"flex flex-col gap-2"}>
                                    <label htmlFor="firstName" className="text-gray-600 uppercase">
                                        Pays :
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        placeholder={user.country}
                                        className="border border-gray-400 rounded-md px-4 py-2"
                                    />
                                </div>
                            </div>
                            <div className={"flex flex-col gap-2"}>
                                <button
                                    onClick={handleMdp}
                                    className="bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12 mt-4"
                                >
                                    Modifier mon mot de passe
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12 mt-4"
                                >
                                    Enregistrer les modifications
                                </button>
                                <button
                                    onClick={handleProfile}
                                    className="bg-red-500 text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12 mt-4"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    ) : null}
                    {mdp === true ? (
                        <form onSubmit={handleSubmitPasswordChange} className={"flex flex-col gap-8"}>
                            <div className={"flex flex-col gap-4"}>
                                <div className={"flex flex-col gap-2"}>
                                    <label htmlFor="newPassword" className="text-gray-600 uppercase">
                                        Nouveau mot de passe :
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        className="border border-gray-400 rounded-md px-4 py-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div className={"flex flex-col gap-2"}>
                                <button
                                    type="submit"
                                    className="bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12 mt-4"
                                >
                                    Changer le mot de passe
                                </button>
                                <button
                                    onClick={handleMdp}
                                    className="bg-red-500 text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7] py-3 px-12 mt-4"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    ) : null}
                </div>
            </div>
        </div>
    );
}