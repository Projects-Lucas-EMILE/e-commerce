import React from "react";
import CBIcon from "../cb-icon.png";
import MasterCardIcon from "../mastercard-icon.png";
import VisaIcon from "../visa-icon.png";

export default function PaymentMethods() {
    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-6 py-6 flex flex-col gap-12">
                <div className="bg-white rounded-2xl px-6 py-6">
                    <h2 className="text-[#f553c7] text-2xl font-semibold mb-4">Modes de paiement acceptés</h2>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={CBIcon} alt={"Carte Bleue"} className="w-24 h-24 object-contain"></img>
                        <p>Vous pouvez effectuer vos achats en utilisant votre Carte Bleue.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={MasterCardIcon} alt={"MasterCard"} className="w-24 h-24 object-contain"></img>
                        <p>Nous acceptons également les paiements par MasterCard.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={VisaIcon} alt={"Visa"} className="w-24 h-24 object-contain"></img>
                        <p>Il est également possible de payer avec vos cartes Visa sur Kompozant.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
