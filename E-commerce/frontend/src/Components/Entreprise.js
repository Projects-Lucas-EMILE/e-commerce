import React from "react";
import Kompozant from "../Kompozant.png";

export default function Entreprise() {
    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
        <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-6 py-6 flex flex-col gap-12">
            <img src={Kompozant} alt={"Kompozant Logo"} className={"drop-shadow-2xl w-full md:w-2/3 self-center"}></img>
            <div className="flex flex-col gap-8">
                <div className="bg-white rounded-2xl px-4 py-8 flex flex-col gap-2">
                    <p>
                        Kompozant est un tout nouveau site e-commerce spécialisé dans la vente de composants informatiques, qui a été lancé en août 2023. Cette plateforme en ligne propose une vaste gamme de produits tels que processeurs, cartes graphiques, mémoire RAM, disques durs, cartes mères et bien d'autres composants essentiels pour la construction, la mise à niveau ou la réparation d'ordinateurs. Kompozant se distingue par son catalogue diversifié, des prix compétitifs et des informations détaillées sur chaque produit pour aider les clients à prendre des décisions éclairées. En offrant une expérience d'achat en ligne conviviale et des options de livraison rapides, Kompozant vise à satisfaire les besoins des passionnés d'informatique, des professionnels et de tous ceux qui recherchent des composants de haute qualité pour leurs projets informatiques.                    </p>
                </div>
            </div>
        </div>
            </>
    );
}
