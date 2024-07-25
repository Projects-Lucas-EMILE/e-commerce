import React from "react";

export default function DeliveryMethods() {
    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-6 py-6 flex flex-col gap-12">
                <div className="bg-white rounded-2xl px-6 py-6">
                    <h2 className="text-[#f553c7] text-2xl font-semibold mb-4">Modes de livraison</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Livraison standard</h3>
                        <p>La livraison standard est gratuite pour toutes les commandes et prend généralement de 5 à 7 jours ouvrables pour être livrée.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Livraison express</h3>
                        <p>Pour une livraison plus rapide, nous proposons une option de livraison express moyennant des frais supplémentaires. Les commandes livrées avec cette option arrivent en 2 à 3 jours ouvrables.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Retrait en magasin</h3>
                        <p>Si vous préférez, vous pouvez choisir l'option de retrait en magasin. Nous vous tiendrons informé dès que votre commande sera prête à être récupérée dans notre magasin physique.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
