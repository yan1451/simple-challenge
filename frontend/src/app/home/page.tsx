"use client";
import { useEffect } from "react";
import { loginConfirmation } from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logout } from "@/services/api";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";


const HomePage = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuth();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await loginConfirmation();
        setCurrentUser(user.name);
        console.log("Usuário logado com sucesso");
      } catch (error) {
        console.error("Erro ao verificar login:", error);
      }
    };

    checkLogin();
  }, []);

  const logoutRequest = async () => {
    try {
      await logout();
      toast.success("Você saiu com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao realizar logout. Tente novamente.");
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4 animate-bounce">Bem-vindo! {currentUser }</h1>
        <p className="text-lg mb-6">
          Você está logado com sucesso. Explore e aproveite a experiência.
        </p>
        <button
          className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition-all"
          onClick={() => alert("Explorar funcionalidades!")}
        >
          Explore
        </button>
      </div>
      <footer className="absolute bottom-4 text-sm text-white/70">
      <button
          className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition-all"
          onClick={logoutRequest}
        >
          Sair
        </button>
      </footer>
    </div>
  );
};

export default HomePage;