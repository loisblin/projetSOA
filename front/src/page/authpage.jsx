import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
    ? "http://localhost:8000/api/auth/login" 
    : "http://localhost:8000/api/auth/register";

      try {
        console.log("Envoi des données au serveur...", {url, username, password });
        const response = await axios.post(url, {
          username,
          password,
          role: "buyer", 
        }, {
          headers: {
            "Content-Type": "application/json", 
          }
        });
    
      console.log("Réponse du serveur:2", response.data);
      if (isLogin) {
        
        localStorage.setItem("user", JSON.stringify(response.data.user)); 
    
      
        if (username === "sell") {
          navigate("/sell"); 
        } else {
          console.log("username send home page ", username);
          navigate("/home", { state: { username } });
        }
      } else {
       
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Erreur:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.message : "Erreur inconnue");
    }
  };

  return (
    <div className="min-h-screen h-screen bg-gradient-to-r from-blue-200 to-blue-400 flex justify-center items-center">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Connection" : "Inscription"}</h2>
      <div className="flex flex-col space-y-4">
  <input
    type="text"
    placeholder="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    placeholder="password"
    value={password}e
    onChange={(e) => setPassword(e.target.value)}
  />

  <div className="flex space-x-4 mb-4 justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {isLogin ? "login" : "register"}
            </button>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              {isLogin ? "created a account" : "i have already an account"}
            </button>
          </div>
      </div>
      </div>
    </div>
  );
};

export default AuthPage;
