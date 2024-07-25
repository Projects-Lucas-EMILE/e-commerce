import React from "react";
import Kompozant from "../Kompozant.png";

export default function Actu() {
    return (
        <>
            <div className={"h-1 w-full bg-[#f553c7]"}></div>
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-6 py-6 flex flex-col gap-12">
                <div className="flex gap-8">
                    <div className={"w-[250px] bg-[#f553c7] rounded-2xl px-6 py-6 flex justify-center items-center sm:flex-row gap-6"}>
                        <p className={"text-white font-bold"}>Septembre 2023</p>
                    </div>
                    <div className="bg-white rounded-2xl px-6 py-6 flex flex-col sm:flex-row gap-6 w-full">
                        <div className={"flex flex-col gap-3"}>
                            <h1 className={"text-[#f553c7] font-semibold text-xl"}>Refonte du site</h1>
                            <p>Le 5 septembre 2023, le site a été repensé pour mieux correspondre aux attentes des clients.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className={"w-[250px] bg-[#f553c7] rounded-2xl px-6 py-6 flex justify-center items-center sm:flex-row gap-6"}>
                        <p className={"text-white font-bold"}>Septembre 2023</p>
                    </div>
                    <div className="bg-white rounded-2xl px-6 py-6 flex flex-col sm:flex-row gap-6 w-full">
                        <div className={"flex flex-col gap-3"}>
                            <h1 className={"text-[#f553c7] font-semibold text-xl"}>10 000 articles vendus</h1>
                            <p>Le 1er septembre 2023, le nombre d'articles vendus sur Kompozant a atteint le million.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className={"w-[250px] bg-[#f553c7] rounded-2xl px-6 py-6 flex justify-center items-center sm:flex-row gap-6"}>
                        <p className={"text-white font-bold"}>Août 2023</p>
                        </div>
                        <div className="bg-white rounded-2xl px-6 py-6 flex flex-col sm:flex-row gap-6 w-full">
                    <div className={"flex flex-col gap-3"}>
                            <h1 className={"text-[#f553c7] font-semibold text-xl"}>Lancement de Kompozant</h1>
                            <p>Kompozant a été lancé en août 2023.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
