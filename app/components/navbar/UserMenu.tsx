'use client';
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps>  = ({
    currentUser
}) => {
    const router = useRouter();
    const rentModal = useRentModal();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(
      () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // Open Rent Modal
        rentModal.onOpen();
      },
      [currentUser, loginModal, rentModal],
    );
    

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div className="hidden md:block text-sm font-semibold 
            py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" 
            onClick={onRent}>
                Airbnb your home
            </div>
            <div className="border-[1px] border-neutral-200 p-4 md:py-1.5 md:px-2 rounded-full  
            transition cursor-pointer flex flex-row items-center gap-3 hover:shadow-md"
            onClick={toggleOpen}>
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
        </div>
        {isOpen && (
            <div 
            className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden
            right-0 top-12 text-sm">
                 <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                    <>
                        <MenuItem 
                        onClick={ () => {}}
                        label="Messages"
                        />
                        <MenuItem 
                        onClick={() => router.push('/trips')}
                        label="Trips"
                        />
                        <MenuItem 
                        onClick={ () => {}}
                        label="Wishlists"
                        />
                        <MenuItem 
                        onClick={ () => router.push('/favorites')}
                        label="My Favorites"
                        />
                        <MenuItem 
                        onClick={ () => router.push('/reservations')}
                        label="Reservations"
                        />
                        <MenuItem 
                        onClick={ () => router.push('/properties')}
                        label="My Properties"
                        />
                        <hr />
                        <MenuItem 
                        onClick={rentModal.onOpen}
                        label="Airbnb my home"
                        />
                        <MenuItem 
                        onClick={ () => {}}
                        label="Account"
                        />
                        <hr />
                        <MenuItem 
                        onClick={ () => {}}
                        label="Help"
                        />
                        <MenuItem 
                        onClick={ () => signOut()}
                        label="Log out"
                        />

                        
                    </>

                    ) : (

                    <>
                        <MenuItem 
                        onClick={() => {loginModal.onOpen()}}
                        label="Login"
                        />
                        <MenuItem 
                        onClick={ () => {registerModal.onOpen()}}
                        label="Sign Up"
                        />
                    </>
                    )}
                 </div>
            </div>
        )}
    </div>
  );
}

export default UserMenu;