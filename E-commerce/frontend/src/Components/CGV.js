import React from "react";

export default function CGV() {
    return (
        <>
            <div className={"px-12 py-12 flex flex-col gap-12"}>
                <h1 className={"font-bold text-2xl"}>Conditions Générales de Vente (CGV) pour Kompozant</h1>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-xl"}>1. Introduction</h2>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>1.1 Acceptation des conditions</h3>
                        <p>L'utilisation de notre site web et l'achat de nos produits impliquent votre acceptation
                            pleine et
                            entière de ces Conditions Générales de Vente. Veuillez les lire attentivement avant de
                            procéder
                            à toute transaction.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>1.2 Définitions</h3>
                        <p>Dans ces CGV, les termes suivants auront les significations suivantes :</p>
                        <p>"Kompozant" : Référence à notre entreprise.</p>
                        <p>"Site" : Notre site web d'e-commerce.</p>
                        <p>"Client" : Toute personne ou entité qui effectue un achat sur notre site.</p>
                        <p>"Produits" : Les articles et les services que nous proposons à la vente sur notre site.</p>
                    </div>
                </div>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-xl"}>2. Commandes</h2>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>2.1 Passation de commande</h3>
                        <p>Lorsque vous passez une commande sur notre site, vous vous engagez à acheter les produits
                            conformément aux termes et conditions énoncés ici. Nous nous réservons le droit d'accepter
                            ou de
                            refuser toute commande à notre discrétion.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>2.2 Confirmation de commande</h3>
                        <p>Une fois votre commande passée, vous recevrez une confirmation par e-mail ou par le biais du
                            site. Cette confirmation indiquera les détails de votre commande, y compris le prix
                            total.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>2.3 Annulation de commande</h3>
                        <p>Si vous souhaitez annuler une commande, veuillez nous contacter dans les plus brefs délais.
                            Les
                            annulations sont soumises à nos politiques d'annulation en vigueur à ce moment-là.</p>
                    </div>
                </div>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-xl"}>3. Prix et Paiement</h2>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>3.1 Prix</h3>
                        <p>Les prix des produits sont affichés sur notre site. Les prix sont en euros et incluent toutes
                            les
                            taxes
                            applicables, sauf indication contraire.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>3.2 Paiement</h3>
                        <p>Nous acceptons les paiements par carte de crédit, PayPal, et d'autres méthodes de paiement.
                            Les
                            paiements doivent être effectués au moment de la commande.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>3.3 Facturation</h3>
                        <p>Une facture détaillée sera incluse avec votre commande. Vous pouvez également accéder à vos
                            factures
                            électroniques sur votre compte client.</p>
                    </div>
                </div>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-xl"}>4. Livraison et Retours</h2>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>4.1 Livraison des produits</h3>
                        <p>Nous nous engageons à expédier vos produits dans les délais indiqués lors de la commande. Les délais de livraison peuvent varier en fonction de la destination et du type de produit.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>4.2 Frais de livraison</h3>
                        <p>Les frais de livraison sont indiqués lors de la commande. Ils dépendent du poids, de la taille et de la destination de la commande.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>4.3 Réception des produits</h3>
                        <p>Il est de votre responsabilité de vérifier les produits à la réception et de signaler tout dommage ou défaut dans les 7 jours suivant la réception.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>4.4 Retours et remboursements</h3>
                        <p>Consultez notre politique de retour sur notre site pour plus d'informations sur les retours et les remboursements.</p>
                    </div>
                </div>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-xl"}>5. Garantie et Service Après-Vente</h2>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>5.1 Garantie des produits</h3>
                        <p>Nous offrons une garantie de 2 ans sur nos produits. Consultez notre politique de garantie pour plus de détails.</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <h3 className={"text-lg"}>5.2 Réclamations et support client</h3>
                        <p>Pour toute réclamation ou question concernant nos produits ou services, veuillez nous contacter à <a href={"mailto:support@kompozant.com"} className={"hover:text-[#f553c7]"}>support@kompozant.com</a>.</p>
                    </div>
                </div>

            </div>
        </>
    );
}
