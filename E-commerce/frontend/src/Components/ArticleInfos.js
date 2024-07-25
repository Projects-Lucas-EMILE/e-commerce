import "../App.css";
import Placeholder from "../placeholder.png";
import BigArticle from "./BigArticle";
import React, { useEffect, useState } from "react";
import { axiosArticleInfos, axiosIncrementViews } from "../apiCall";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import BreadCrumbs from "./BreadCrumb";
import { useAuth } from "../Contexts/AuthContext";

export default function ArticleInfos() {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth;

  useEffect(() => {
    const getArticleInfos = async () => {
      try {
        const response = await axiosArticleInfos(id);
        setArticle(response);
        setLoading(false);
        await axiosIncrementViews(id);
      } catch (error) {
        console.log("Erreur lors de la récupération des articles:", error);
        setLoading(false);
      }
    };
    getArticleInfos();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumbs />
      <BigArticle
        id={article.id}
        name={article.name}
        desc={article.description}
        price={article.price}
        images={article.images}
        img={
          article.images.length > 0
            ? `http://localhost:3000/products/images/${article.images[0].image}`
            : Placeholder
        }
        id_category={article.category.id}
        category={article.category.name}
        id_subcategory={article.subCategory.id}
        sub={article.subCategory.name}
        features={article.features}
        weight={article.weight}
        stock={article.stock}
        discount={article.discount}
      />
    </>
  );
}
