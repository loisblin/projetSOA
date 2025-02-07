import React, { useState, useEffect } from "react";

const Order = () => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((response) => response.json())
      
      .then((data) => {
        console.log("Commandes récupérées:", data);
        setOrders(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false); 
      });
  }, []);

  
  const handleInformationChange = (index, event) => {
    const newOrders = [...orders];
    const updatedOrder = { ...newOrders[index], information: event.target.value };
    newOrders[index] = updatedOrder;
    setOrders(newOrders); 
  };

  
  const handleUpdateInformation = (id, information) => {
    console.log("id de la commande",id)
   
    fetch(`http://localhost:3001/orders/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        information: information, 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("order update:", data); 
      })
      .catch((error) => {
        console.error("Erroor update:", error);
      });
  };


  if (loading) {
    return <p>loading order</p>;
  }

  return (
    <div>
 
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
      
          <th className="border px-8 py-6 text-xl">product</th>
          <th className="border px-8 py-6 text-xl">quantity</th>
          <th className="border px-8 py-6 text-xl">buyer</th>
          <th className="border px-8 py-6 text-xl">Information to return</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr
            key={order.id}
            className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} 
          >
            
            <td className="border px-8 py-6 text-xl">{order.product}</td>
            <td className="border px-8 py-6 text-xl">{order.quantity}</td>
            <td className="border px-8 py-6 text-xl">{order.buyer}</td>
            <td className="border px-8 py-6 text-xl">
              <div className="flex items-center space-x-4"> 
                <input
                  type="text"
                  value={order.information || ""}
                  onChange={(event) => handleInformationChange(index, event)}
                  placeholder="Modify information"
                  className="border p-4 w-full text-xl"
                />
            
                <button
                  onClick={() => handleUpdateInformation(order._id, order.information)}
                  className="px-6 py-4 bg-blue-500 text-white rounded text-xl"
                >
                  Validate
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


  );
};

export default Order;
