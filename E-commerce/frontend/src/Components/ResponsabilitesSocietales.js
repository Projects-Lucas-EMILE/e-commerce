import React from "react";

export default function ResponsabilitesSocietales() {
    return (
        <div className="px-12 py-12 flex flex-col gap-12">
            <h1 className="font-bold text-2xl">Responsabilités Sociétales de Kompozant</h1>
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">1. Engagement envers la Société</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">1.1 Responsabilité Sociale</h3>
                    <p>
                        Chez Kompozant, nous sommes engagés envers la société et nous nous efforçons de contribuer positivement à nos communautés locales et à la société en général.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">1.2 Responsabilité Environnementale</h3>
                    <p>
                        Nous nous engageons à minimiser notre impact sur l'environnement en adoptant des pratiques durables et en favorisant l'utilisation responsable des ressources.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">2. Responsabilité envers nos Employés</h2>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">2.1 Conditions de Travail</h3>
                    <p>
                        Nous nous engageons à offrir des conditions de travail justes, sécuritaires et inclusives à nos employés, en respectant toutes les lois du travail en vigueur.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg">2.2 Développement Personnel</h3>
                    <p>
                        Nous encourageons le développement professionnel et personnel de nos employés en leur offrant des opportunités de formation et de croissance au sein de l'entreprise.
                    </p>
                </div>
            </div>
        </div>
    );
}
