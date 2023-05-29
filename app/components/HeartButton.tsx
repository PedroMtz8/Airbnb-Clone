import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SaveUser } from '../types';


interface HeartButtonProps {
  listingId: string;
  currentUser?: SaveUser | null
}

function HeartButton({ listingId, currentUser }: HeartButtonProps) {
  const isFavorite = false;
  const toggleFavorite = () => {

  }
  return (
    <div
      onClick={toggleFavorite}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart
        size={28}
        className='
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        '
      />
      <AiFillHeart
        size={24}
        className={
          isFavorite ? "fill-rose-500" : "fill-neutral-500/70"
        }
      />
    </div>
  )
}

export default HeartButton;