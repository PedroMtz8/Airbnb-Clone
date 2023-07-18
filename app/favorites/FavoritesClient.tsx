'use client';

import { SafeListing, SaveUser } from '../types';

interface FavoritesClientProps {
  listings: SafeListing[] | null;
  currentUser?: SaveUser;
}

function FavoritesClient({listings, currentUser}: FavoritesClientProps){
  return(
    <div>Here will be favorites listing</div>
  )
}

export default FavoritesClient;
