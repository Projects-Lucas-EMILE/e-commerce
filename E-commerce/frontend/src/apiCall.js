import axios from "axios";

const url = process.env.REACT_APP_URL;

export const axiosArticles = (page, name, order) => {
    return axios.get(`${url}/product/api?page=${page}&name=${name}&order=${order}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des articles :", error);
            throw error;
        });
}

export const axiosArticlesbyCategory = (id_category, page, name, order) => {
    return axios.get(`${url}/product/api?page=${page}&category_id=${id_category}&name=${name}&order=${order}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des articles :", error);
            throw error;
        });
}

export const axiosArticlesbyDiscount = async (page, name, order, discount) => {
    try {
        const response = await axios.get(`${url}/product/api?page=${page}&name=${name}&order=${order}&discount=${discount}`);
        return response.data;
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des articles :", error);
        throw error;
    }
}

export const axiosArticlesbySubCategory = (id_category, id_subcategory, page, name, order) => {
    return axios.get(`${url}/product/api?page=${page}&category_id=${id_category}&sub_category_id=${id_subcategory}&name=${name}&order=${order}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des articles :", error);
            throw error;
        });
}

export const axiosArticleInfos = (id) => {
    return axios.get(`${url}/product/api/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des articles :", error);
            throw error;
        });
}

export const axiosCategories = () => {
    return axios.get(`${url}/category/api`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
            throw error;
        });
}

export const axiosSubCategories = (id) => {
    return axios.get(`${url}/category/api/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
            throw error;
        });
}

export async function axiosIncrementViews(articleId) {
    try {
        await axios.put(`${url}/product/api/${articleId}/increment-views`);
    } catch (error) {
        console.error("Erreur lors de l'incrémentation des vues:", error);
        throw error;
    }
}

export const axiosLogin = (email, password) => {
    return axios.post(`${url}/log`, {
        email,
        password,
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Erreur de connexion :", error);
            throw error;
        });
}

export const axiosRegister = (values) => {
    return axios.post(`${url}/signin`, values)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error("Erreur de connexion :", error);
            throw error;
        });
}

export const axiosMakePayment = (paymentData) => {
    return axios.post(`${url}/order/api`, paymentData)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
};
