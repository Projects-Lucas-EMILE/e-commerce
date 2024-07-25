import React from "react";

export default function ReturnMethods() {
    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-6 py-6 flex flex-col gap-12">
                <div className="bg-white rounded-2xl px-6 py-6">
                    <h2 className="text-[#f553c7] text-2xl font-semibold mb-4">Modes de retour</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Retour pour remboursement</h3>
                        <p>Si vous n'êtes pas satisfait de votre achat, vous pouvez demander un retour pour remboursement dans les 30 jours suivant la date d'achat. Votre article doit être dans son état d'origine.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Échange de produit</h3>
                        <p>Nous acceptons les échanges de produits dans les 30 jours suivant la date d'achat. L'article doit être non utilisé et dans son emballage d'origine.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Retour de produit défectueux</h3>
                        <p>Si vous recevez un produit défectueux, veuillez nous contacter dans les 7 jours suivant la réception pour organiser un retour ou un remplacement.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
