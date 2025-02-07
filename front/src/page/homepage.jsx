import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buyer, setBuyer] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrders, setViewOrders] = useState(false);
  const location = useLocation();

  const username = location.state?.username || "";

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commandes:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      product,
      quantity,
      seller: "sell",
      buyer: username,
      information: "",
    };

    try {
      const response = await fetch("http://localhost:3001/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Commande créée avec succès!");
        setProduct("");
        setQuantity(1);
        setBuyer("");
      } else {
        alert("Erreur lors de la création de la commande");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue");
    }
  };

  const filteredOrders = orders.filter((order) => order.buyer === username);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={() => setViewOrders(!viewOrders)}
          className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mb-4"
        >
          {viewOrders ? "Create New Order" : "View My Orders"}
        </button>

        {viewOrders ? (
          <div>
            <h2 className="text-2xl font-bold">My Orders</h2>
            {loading ? (
              <p>Loading...</p>
            ) : filteredOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {filteredOrders.map((order, index) => (
                  <li key={index} className="p-3 border border-gray-300 rounded-lg bg-gray-100">
                    <strong>Product:</strong> {order.product} <br />
                    <strong>Quantity:</strong> {order.quantity} <br />
                    <strong>Information:</strong> {order.information}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center">New Order</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700" htmlFor="product">
                  Product
                </label>
                <input
                  type="text"
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Name of product"
                  className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Quantity"
                  min="1"
                  className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
              >
                Create the order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
