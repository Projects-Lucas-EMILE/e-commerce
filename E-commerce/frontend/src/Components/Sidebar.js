import Category from "./Category";
import Kompozant from "../Kompozant.png";
import React, {useEffect, useState} from "react";
import {axiosCategories, axiosSubCategories} from "../apiCall";
import Loading from "./Loading";

export default function Sidebar({sidebar}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            try {
                let response = await axiosCategories();
                setCategories(response);
                setLoading(false);
            } catch (error) {
                console.log("Erreur lors de la récupération des articles:", error);
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    if (loading) {
        return <Loading/>
    }
    return (
        sidebar && (
            <div className="drop-shadow-lg fixed z-10 top-0 left-0 bottom-0 w-full max-w-[250px] bg-[#393939] overflow-y-auto">
                <a href={"/"}>
                <img src={Kompozant} alt={"Kompozant Logo"}></img>
                </a>
                <div className="flex flex-col h-full p-3 gap-4 bg-[#393939] text-white w-60">
                    <a className="text-[#f553c7]" href="/nouveautés&promotions">
                        Nouveautés & promotions
                    </a>
                    {categories.map((category) => (
                        <div className="flex flex-col" key={category.id}>
                            <Category key={category.id} id={category.id} name={category.name} />
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}