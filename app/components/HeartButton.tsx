'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";
import ClientOnly from "./ClientOnly";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    // we are gonna modified later.
    // const hasFavorited = false;
    // const toggleFavorite = () => {};
    
    // replaced it with useFavorite hook
    // console.log(listingId);
    const { hasFavorited, toggleFavorite } = useFavorite({listingId, currentUser});
    // console.log(hasFavorited);

  return (
    <div onClick={toggleFavorite}
    className="relative hover:opacity-80 transition cursor-pointer">
        <AiOutlineHeart
            size={28}
            className="fill-white absolute -top-[2px] -right-[2px]" 
        />
        <AiFillHeart 
            size={24}
            className={
                hasFavorited ? "fill-rose-600" : "fill-neutral-500/70"
            }
        />
    </div>
  )
}

export default HeartButton