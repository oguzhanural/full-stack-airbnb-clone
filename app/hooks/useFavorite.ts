import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
 
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        // console.log(currentUser?.favoriteIds);
        
        const list = currentUser?.favoriteIds || []; // daha önceden favorilere eklemediği için boş array döner.

        return list.includes(listingId);    // listingId değerini içermediği için - çünkü boş - false dönüyor.

    }, [currentUser, listingId]);


    const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser) {
            // login modal will open if tries to add to favorites without logging in.
            return loginModal.onOpen();
        }
        // console.log(currentUser);

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success');

        } catch (error) {
            toast.error('Something went wrong');
        }

    }, [currentUser, hasFavorited, listingId, loginModal, router]);
    // console.log(hasFavorited);

    return {
        hasFavorited,
        toggleFavorite
    }

}

export default useFavorite;


