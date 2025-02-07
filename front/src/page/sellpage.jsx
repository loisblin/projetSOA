// src/page/sellpage.jsx

import React, { useState, useEffect } from 'react';  // L'importation correcte ici
import { useNavigate } from 'react-router-dom';

// Importation du composant Order depuis le remote
const Order = React.lazy(() => import('remote/Order'));

const SellPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Une fois le composant chargé, on arrête le loading
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Commande in progress</h1>

        {loading ? (
          <p>loading...</p>
        ) : (
          <Order /> 
        )}
      </div>
    </div>

  );
};

export default SellPage;
