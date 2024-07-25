import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Connect from "./Components/Connect";
import Article from "./Components/Article";
import Register from "./Components/RegisterPage";
import "./App.css";
import ArticleInfos from "./Components/ArticleInfos";
import Categories from "./Components/Categories";
import SubCategories from "./Components/SubCategories";
import Basket from "./Components/Basket";
import Address from "./Components/Address";
import DirectBuy from "./Components/DirectBuy";
import Checkout from "./Components/Checkout";
import { CartProvider } from "./Contexts/CartContext";
import Bank from "./Components/Bank";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import News from "./Components/News";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import Profile from "./Components/Profile";
import CGV from "./Components/CGV";
import CGU from "./Components/CGU";
import ConditionsDesOffres from "./Components/ConditionsDesOffres";
import ConditionsDesFacilitesDePaiement from "./Components/ConditionsDesFacilitesDePaiement";
import ResponsabilitesSocietales from "./Components/ResponsabilitesSocietales";
import Entreprise from "./Components/Entreprise";
import Actu from "./Components/Actu";
import FAQ from "./Components/FAQ";
import PaymentMethods from "./Components/PaymentsMethods";
import ReturnMethods from "./Components/ReturnMethods";
import DeliveryMethods from "./Components/DeliveryMethods";

const loadCartDataFromLocalStorage = () => {
  const storedCartData = localStorage.getItem("cartData");
  return storedCartData ? JSON.parse(storedCartData) : [];
};


function ConnectRoute() {
  const { user } = useAuth(); // Access the user state

  // If user is already authenticated, redirect to the home page
  if (user) {
    return <Navigate to="/" />;
  }

  return <Connect />;
}

function App() {
  const initialCartData = loadCartDataFromLocalStorage();

  return (
    <div>
      <Router>
        <AuthProvider>
          <CartProvider initialCartData={initialCartData}>
            <Header />
            <Routes>

              <Route path="/" element={<Article />} />
              <Route path="/connect" element={<ConnectRoute />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/:id_category" element={<Categories />} />
              <Route
                path="/:id_category/:id_subcategory"
                element={<SubCategories />}
              />
              <Route
                path="/:id_category/:id_subcategory/:id/:name"
                element={<ArticleInfos />}
              />
              <Route path="/cgv" element={<CGV />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="/conditions des offres" element={<ConditionsDesOffres />} />
              <Route path="/conditions des facilités de paiement" element={<ConditionsDesFacilitesDePaiement />} />
              <Route path="/responsabilités sociétales" element={<ResponsabilitesSocietales />} />
              <Route path="/kompozant" element={<Entreprise />} />
              <Route path="/actu" element={<Actu />} />
              <Route path="/questions fréquentes et contacts" element={<FAQ />} />
              <Route path="/modes de paiement" element={<PaymentMethods />} />
              <Route path="/modes de retour" element={<ReturnMethods />} />
              <Route path="/modes de livraisons" element={<DeliveryMethods />} />
              <Route path="/nouveautés&promotions" element={<News />} />
              <Route path="/register" element={<Register />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/address" element={<Address />} />
              <Route path="/directbuy" element={<DirectBuy />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/bank" element={<Bank />} />
            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;
