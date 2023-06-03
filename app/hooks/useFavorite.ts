import axios from "axios";
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from "react-hot-toast"

import { SaveUser } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SaveUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) return loginModal.onOpen();

    try {
      let request;
      if (hasFavorite) {
        request = () => axios.delete(`/api/favorite/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorite/${listingId}`)
      }

      await request();
      router.refresh();
      toast.success("Success")

    } catch (error) {
      toast.error("Something went wrong")
    }
  },
    [currentUser, hasFavorite, listingId, loginModal, router])

  return {
    toggleFavorite,
    hasFavorite,
  }
}

export default useFavorite;