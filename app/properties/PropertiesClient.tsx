'use client';
import axios from 'axios';
import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/Listings/ListingCard';
import { useCallback, useState } from 'react';
import { SafeListing, SaveUser } from '../types'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SaveUser | null;
}

function PropertiesClient({listings, currentUser}: PropertiesClientProps) {
  const router = useRouter();

  const date = new Date();
  const isoDate = date.toISOString();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string)=> {
    setDeletingId(id)

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted")
        router.refresh();
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId("");
      })
  }, [router])

  return(
    <Container>
      <Heading
        title="Properties"
        subtitle={`List of your properties`}
      />
      <div
        className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
      >
      {
        listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            // reservation={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id || isoDate > listing.endDate }
            actionLabel={'Delete Property'}
            currentUser={currentUser}
          />
        ))
      }
      </div>
    </Container>
  )
}


export default PropertiesClient;