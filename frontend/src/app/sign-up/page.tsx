"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import InputField from "@/components/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import FormContainer from "@/components/FormContainer";
import { createFormSchema } from "@/schemas/createFormSchema";
import Link from "next/link";
import { createUser } from "@/services/api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

type error = {
  message: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(createFormSchema) });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await createUser(data);
      if (response.status === 201) {
        toast.success("Usuário criado com sucesso! Redirecionando...");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      const err = error as error;
      if (err.message === "Request failed with status code 409") {
        toast.error("Erro ao criar usuário. Email já cadastrado");
      } else {
        toast.error("Erro ao criar usuário");
      }
    }
  };

  return (
    <div className="flex justify-center items-center rounded-md border border-gray-500">
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
        <h1 className="text-white text-3xl">Criar uma conta</h1>
        <span className="text-gray-400 text-xs my-2">
          Já possui uma conta?{" "}
          <Link
            className="hover:underline text-blue-600 dark:text-blue-500"
            href="/"
          >
            Entrar
          </Link>
        </span>
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name="name"
            placeholder="Nome"
            register={register}
            errors={errors}
          />
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
          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Confirme a senha"
            register={register}
            errors={errors}
          />
          <Button className="bg-[#5C4DA8] rounded-md my-4 text-white p-2">
            Criar conta
          </Button>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
