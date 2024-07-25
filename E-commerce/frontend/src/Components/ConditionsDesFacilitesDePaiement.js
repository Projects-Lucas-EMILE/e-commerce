import React from "react";

export default function ConditionsDesFacilitesDePaiement() {
    return (
        <div className="px-12 py-12 flex flex-col gap-12">
            <h1 className="font-bold text-2xl">Conditions des Facilités de Paiement pour Kompozant</h1>
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">1. Offres de Paiement Échelonné</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">1.1 Options de Paiement</h3>
                    <p>
                        Nous proposons des options de paiement échelonné pour certains produits ou services. Ces options permettent aux clients de payer en plusieurs versements.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">1.2 Conditions Spécifiques</h3>
                    <p>
                        Chaque offre de paiement échelonné aura des conditions spécifiques, y compris le montant des versements, la fréquence des paiements et les frais éventuels.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">2. Acceptation des Offres de Paiement</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">2.1 Acceptation</h3>
                    <p>
                        En acceptant nos offres de paiement échelonné, vous acceptez de respecter les conditions spécifiques associées à chaque offre, ainsi que nos Conditions Générales d'Utilisation.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">2.2 Éligibilité</h3>
                    <p>
                        Certaines offres de paiement échelonné peuvent être soumises à des conditions d'éligibilité spécifiques, telles que des vérifications de crédit.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">3. Paiements et Échéanciers</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">3.1 Fréquence des Paiements</h3>
                    <p>
                        Les paiements échelonnés doivent être effectués conformément à l'échéancier spécifié dans les conditions de l'offre. Tout retard de paiement peut entraîner des frais supplémentaires.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">3.2 Modification des Échéances</h3>
                    <p>
                        Si vous avez besoin de modifier l'échéancier de paiement, veuillez nous contacter à l'avance pour discuter des options disponibles.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">4. Frais et Intérêts</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">4.1 Frais de Traitement</h3>
                    <p>
                        Certains plans de paiement échelonné peuvent inclure des frais de traitement. Ces frais seront clairement indiqués dans les conditions de l'offre.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">4.2 Intérêts</h3>
                    <p>
                        Les offres de paiement échelonné peuvent inclure des intérêts. Le taux d'intérêt applicable sera spécifié dans les conditions de l'offre.
                    </p>
                </div>
            </div>

        </div>
    );
}
