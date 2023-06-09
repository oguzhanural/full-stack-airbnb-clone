'use client';
import { signIn } from "next-auth/react"
import axios from "axios";
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"; 
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation"; /* old way next/router */ 



const LoginModal = () => {
    // first thing first...
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email:'',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
         setIsLoading(true);
         signIn("credentials", {
            ...data,
            redirect: false,
         })
         .then((clb) => {
            setIsLoading(false);
            if (clb?.ok) {
                toast.success("Logged In");
                router.refresh();
                loginModal.onClose();
            }
            if (clb?.error) {
                toast.error(clb.error);
            }
         })
    }

    const toggle = useCallback(
      () => {
        loginModal.onClose();
        registerModal.onOpen();
      },
      [loginModal, registerModal],
    );
    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            
            <Heading
            title="Welcome back"
            subtitle="Login to your account"
            />

            {/* Input component using here. */}
            <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>
    );

    // Footer Content for login like Google, Facebook, Email, Apple etc.
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
           <hr />
           <Button 
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={ () => signIn('google')}
           />
           <Button 
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={ () => signIn('github')}
           /> 
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div className="">
                        First time using Airbnb?
                    </div>
                    <div 
                    onClick={toggle}
                    className="text-neutral-800 cursor-pointer hover:underline">
                        Create an account
                    </div>
                </div>
                
            </div>
        </div>
    );


  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal