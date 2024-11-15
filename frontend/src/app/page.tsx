"use client";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { login } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (user: FormData) => {
    try {
      const { accessToken } = await login(user.email, user.password);
      if (accessToken) {
        toast.success("Login realizado com sucesso! Redirecionando...");

        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    } catch (error) {
      console.error("Erro de login:", error);
      toast.error("Erro ao logar, email ou senha inválidos");
    }
  };

  return (
    <div className="flex items-center rounded-md border border-gray-500">
      <div className="rounded-md p-2">
        <Image
          src="/logo.jpg"
          className="rounded-md"
          alt="logo"
          width={500}
          height={600}
        />
      </div>
      <FormContainer className="flex flex-col items-start justify-between rounded-md p-4">
        <h1 className="text-white text-3xl">Login</h1>
        <span className="text-gray-400 text-sm mt-4 mb-2">
          Criar uma nova conta?{" "}
          <Link
            className="hover:underline text-blue-600 dark:text-blue-500"
            href="/sign-up"
          >
            Clique aqui!
          </Link>
        </span>
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name="email"
            placeholder="Email"
            register={register}
            errors={errors}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Senha"
            register={register}
            errors={errors}
          />
          <Button className="bg-[#5C4DA8] rounded-md my-4 text-white p-2">
            Entrar
          </Button>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
