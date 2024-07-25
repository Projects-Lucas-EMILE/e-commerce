import React, {useState} from "react";
import {useCart} from "../Contexts/CartContext";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Contexts/AuthContext";
import {axiosLogin} from "../apiCall";

export default function Basket() {
  const {cartData, removeFromCart, clearCart} = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [promocode, setPromocode] = useState("");
  const navigate = useNavigate();
  const {user} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // New state variable for error message
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosLogin(email, password);
      const sessionId = response["session_id"];
      localStorage.setItem("session_id", sessionId);
      login(response["user_data"]);
    } catch (error) {
      setError("Adresse email ou mot de passe incorrect. Veuillez vérifier vos informations et réessayer."); // Set the error message
    }
  };

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => {
      let carPriceDiscounted = 0;

      if (item.discount) {
        carPriceDiscounted = (item.price - (item.discount * item.price) / 100);
        return total + carPriceDiscounted * item.quantity;
      } else {
        return total + item.price * item.quantity;
      }
    }, 0).toFixed(2);
  };


  const calculateTotalPriceIssam = () => {
    const totalBeforeDiscount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = totalBeforeDiscount * 0.50;
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;
    return totalAfterDiscount.toFixed(2);
  };

  const getItemCounts = () => {
    const itemCounts = {};
    cartData.forEach((item) => {
      if (itemCounts[item.id]) {
        itemCounts[item.id].count++;
      } else {
        itemCounts[item.id] = { ...item, count: 1 };
      }
    });
    return Object.values(itemCounts);
  };

  const GuestOrder = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const checkoutAnon = () => {
    navigate("/address", { state: {} });
  };

  const applyPromoCode = () => {
      return calculateTotalPrice();
  };

  return (
    <>
      <div className="px-8 md:px-32 xl:px-96 mt-20 min-h-screen mb-20">
        <h1 className="text-center md:text-start text-4xl font-semibold mb-4">Panier</h1>
        {cartData.length === 0 ? (
            <div className={"flex flex-col gap-4"}>
                <p className="text-lg">Votre panier est vide.</p>
                <a
                    href="/"
                    className="text-center w-max p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                >Faire des achats</a>
            </div>
        ) : (
          <div>
            {getItemCounts().map((item) => {
              let carPriceDiscounted = "";

              if (item.discount) {
                carPriceDiscounted = (item.price - (item.discount * item.price) / 100);
              }

              return (
                <div key={item.id} className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 py-4">
                  <div className={"flex flex-col items-center text-center md:flex-row"}>
                    <img src={item.img} alt='img' className="w-32 h-32 md:w-16 md:h-16 object-contain rounded-md mr-4" />
                    <div className="flex flex-col justify-between items-center md:items-start">
                      <a href={`/${item.id_category}/${item.id_subcategory}/${item.id}/${item.name}`} className="hover:underline text-lg md:text-xl uppercase">
                        {item.name}
                      </a>
                      <p className="text-xs md:text-md">Quantité : {item.count}</p>
                      {carPriceDiscounted !== "" ? (
                        <div className="flex gap-4">
                          <p className="text-[#f553c7] text-md md:text-lg font-semibold">{carPriceDiscounted.toFixed(2)} €</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-md md:text-lg line-through">{item.price.toFixed(2)} €</p>
                            <p className="text-xs text-[#f553c7]">-{item.discount}%</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-md md:text-lg font-semibold">{item.price.toFixed(2)} €</p>
                      )}
                    </div>
                  </div>
                  <button
                    className="hover:text-red-500 px-4 py-2 text-xl md:text-lg"
                    onClick={() => removeFromCart(item.id)}
                  >Supprimer
                  </button>
                </div>
              );
            })}

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="flex flex-col md:flex-row items-center gap-2 w-max">
                <h2 className="uppercase text-xs md:text-lg">Total du panier :</h2>
                <h2 className="uppercase text-xl md:text-xl font-semibold">{applyPromoCode()} €</h2>
              </div>

              <div className="md:col-span-2 flex flex-col md:flex-row gap-4 items-center">
                <button
                  className="bg-black hover:bg-red-500 text-white w-full md:w-auto px-6 py-3 rounded-lg font-semibold"
                  onClick={() => clearCart()}
                >
                  Vider le panier
                </button>
                <button
                  className="bg-black hover:bg-[#f553c7] text-white w-full md:w-auto px-6 py-3 rounded-lg font-semibold"
                  onClick={() => GuestOrder()}
                >
                  Valider la commande
                </button>
              </div>
            </div>


          </div>
        )}

      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {!user ? ( // Utilisez la négation pour vérifier si l'utilisateur n'est PAS connecté
            <div className="bg-white w-full md:w-[800px] p-8 rounded-lg">

              <div className="flex flex-col items-center w-full">
                <h3 className="text-2xl font-semibold mb-4">Finaliser ma commande</h3>
                <div className="flex flex-col items-center w-full gap-2">
                  {error && (
                      <div className="bg-red-200 p-2 rounded-md w-full flex justify-center items-center">
                        {error}
                      </div>

                  )}
                  <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-70 p-3 border border-gray-300 focus:none focus:outline-0 rounded mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        required
                        className="w-70 p-3 border border-gray-300 rounded mb-3 focus:outline-0"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Me Connecter"
                        className="w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                    />
                  </form>
                  <p>Pas encore client ?</p>
                  <a
                      href="/register"
                      className="test_email text-center w-full p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                  >Créer mon compte</a>
                  <button
                      className="test_email w-full p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                      onClick={checkoutAnon}
                  >
                    Poursuivre la commande
                  </button>
                </div>


                {/* <div className="w-full flex flex-col mt-1">
                <button
                  className="test_email w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                  onClick={directBuy}
                >
                  Achat direct
                </button>
              </div> */}
              </div>
              <div className="w-full flex flex-col mt-1">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold mt-4"
                  onClick={() => closeModal()}
                >
                  Annuler
                </button>
              </div>
            </div>
          ) :
            <div className="bg-white w-full md:w-[800px] p-8 rounded-lg">

              <div className="flex flex-col items-center w-full">
                <h3 className="text-2xl font-semibold mb-4">Finaliser ma commande</h3>

                <div className="w-full flex flex-col mt-1">
                  <button
                    className="test_email w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                    onClick={checkoutAnon}
                  >
                    Poursuivre la commande
                  </button>
                </div>
                {/* <div className="w-full flex flex-col mt-1">
                <button
                  className="test_email w-70 p-3 bg-black text-white cursor-pointer border-none rounded-md hover:bg-[#f553c7]"
                  onClick={directBuy}
                >
                  Achat direct
                </button>
              </div> */}
              </div>
              <div className="w-full flex flex-col mt-1">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold mt-4"
                  onClick={() => closeModal()}
                >
                  Annuler
                </button>
              </div>
            </div>
          }
        </div>
      )}
    </>
  );
}
