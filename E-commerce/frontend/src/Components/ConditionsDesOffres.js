import React from "react";

export default function ConditionsDesOffres() {
    return (
        <div className="px-12 py-12 flex flex-col gap-12">
            <h1 className="font-bold text-2xl">Conditions des Offres pour Kompozant</h1>
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">1. Offres et Réductions</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">1.1 Offres Promotionnelles</h3>
                    <p>
                        Nous pouvons proposer des offres promotionnelles, y compris des réductions et des codes promotionnels, pour certains produits ou services. Ces offres sont soumises à des conditions spécifiques et peuvent être limitées dans le temps.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">1.2 Utilisation des Codes Promotionnels</h3>
                    <p>
                        Les codes promotionnels doivent être utilisés conformément aux instructions spécifiques. Ils peuvent être soumis à des restrictions, notamment une utilisation par client ou une date d'expiration.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">2. Conditions d'Acceptation</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">2.1 Acceptation des Offres</h3>
                    <p>
                        En acceptant nos offres, vous acceptez de respecter les conditions spécifiques associées à chaque offre, ainsi que nos Conditions Générales d'Utilisation.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">2.2 Modifications des Offres</h3>
                    <p>
                        Nous nous réservons le droit de modifier ou de retirer nos offres à tout moment, sans préavis.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">3. Éligibilité</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">3.1 Conditions d'Éligibilité</h3>
                    <p>
                        Certaines offres peuvent être soumises à des conditions d'éligibilité spécifiques, telles que le montant minimum d'achat ou la catégorie de produits concernée.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">3.2 Non-Éligibilité</h3>
                    <p>
                        Nous nous réservons le droit de refuser l'acceptation d'une offre si les conditions d'éligibilité ne sont pas remplies.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">4. Limitation de Responsabilité</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">4.1 Responsabilité en Cas de Modification</h3>
                    <p>
                        Nous ne sommes pas responsables des modifications, des retraits ou des annulations d'offres, y compris les offres promotionnelles.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">4.2 Utilisation de Codes Promotionnels</h3>
                    <p>
                        Les codes promotionnels sont soumis à disponibilité et peuvent être retirés à tout moment sans préavis.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">5. Durée des Offres</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">5.1 Période de Validité</h3>
                    <p>
                        Chaque offre aura une période de validité spécifique indiquée dans les conditions de l'offre. Les offres expireront après cette période.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">5.2 Fin des Offres</h3>
                    <p>
                        Nous nous réservons le droit de mettre fin à une offre avant sa date d'expiration prévue, à notre discrétion.
                    </p>
                </div>
            </div>
        </div>
    );
}
