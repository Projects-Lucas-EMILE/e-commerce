import React from "react";

export default function FAQ() {
    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-6 py-6 flex flex-col gap-12">
                <div className="bg-white rounded-2xl px-6 py-6">
                    <h2 className="text-[#f553c7] text-2xl font-semibold mb-4">Questions fréquentes</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Question : Quels sont les produits disponibles sur Kompozant ?</h3>
                        <p>Kompozant propose une large gamme de composants informatiques, y compris des processeurs, des cartes graphiques, de la mémoire RAM, des disques durs, des cartes mères, des périphériques et bien plus encore.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Question : Comment puis-je suivre ma commande ?</h3>
                        <p>Vous pouvez suivre l'état de votre commande en vous connectant à votre compte Kompozant. Une fois connecté, vous pourrez voir les détails de votre commande et le statut de livraison en temps réel.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Question : Quels sont les modes de paiement acceptés ?</h3>
                        <p>Nous acceptons les paiements par carte de crédit (Visa, MasterCard, American Express) et PayPal. Toutes les transactions sont sécurisées.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl px-6 py-6">
                    <h2 className="text-[#f553c7] text-2xl font-semibold mb-4">Contacts</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Service client</h3>
                        <p>Si vous avez des questions ou des préoccupations, n'hésitez pas à contacter notre service client :</p>
                        <p>Email : contact@kompozant.com</p>
                        <p>Téléphone : 06 12 34 56 78</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Support technique</h3>
                        <p>Pour obtenir de l'aide technique concernant nos produits, veuillez contacter notre équipe de support technique :</p>
                        <p>Email : support@kompozant.com</p>
                        <p>Téléphone : 06 98 76 54 32</p>
                    </div>
                </div>
            </div>
        </>
    );
}
