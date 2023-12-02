'use client';
import axios from "axios";

import { useCallback, useState } from "react";
import Modal from "./Modal";
import Input from "../Input/Input";
import Heading from "../Heading";
import Button from "../Button";
import useConfirmReservation from '@/app/hooks/useConfirmReservation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { SafeListing, SaveUser } from '@/app/types';
import useListing from '@/app/providers/useListing';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const confirmModal = useConfirmReservation();
    const router = useRouter();
    const { listingData, totalPrice, currentUser, onSubmit } = useListing();
    const lData = listingData as unknown as SafeListing;
    // SafeListing

    const onConfirmSubmit = async (e: any) => {
        e.preventDefault();
        if (stripe && elements){

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)!,
            });
            if(!error){
                const { id } = paymentMethod;
                // console.log(paymentMethod, listingContext)
                setIsLoading(true);
                const description = `Rent :${lData.title}, Reference DB Property ID: ${lData.id} `
                try {
                    await axios.post('/api/transactions',{
                        id,
                        amount: totalPrice,
                        email: currentUser.email,
                        userName: currentUser.name,
                        description,
                        title: lData.title,
                        url: window.location.origin + '/trips',
                        imageSrc: lData.imageSrc,
                    });
                    toast.success('Payment successful')

                    if(onSubmit){
                        onSubmit();
                    }
                    toast.success('Listing reserved')
                    router.refresh();

                } catch (error) {
                    console.log(error);
                    toast.error('Hubo un error')
                }
                finally{
                    confirmModal.onClose();
                    setIsLoading(false);
                    setTimeout(() => {
                        router.push("/trips");
                    }, 1000)
                }
            }
        }
    }
    return (
        <form onSubmit={onConfirmSubmit}>
          <CardElement />
          <div className='flex flex-col gap-4 mt-4'>
            <p><b> Property to reserve:</b> {listingData?.title} </p>
            <p><b>Rooms:</b> {listingData?.roomCount} </p>
            <p> <b>Total Price:</b> {totalPrice} </p>
            <Button label='Buy' onClick={onConfirmSubmit} disabled={isLoading} type='submit' />
          </div>
        </form>
    )
}

function StripePayment(){

    return (
      <Elements stripe={stripePromise} >
        <CheckoutForm />
      </Elements>
    )
  }

const ConfirmReservationModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const confirmReservation = useConfirmReservation();

    const bodyContent = (
        <>

            <div className="flex flex-col gap-4 relative">
               <Heading
                    title="Confirm Reservation"
                    subtitle="Add your debit or credit card"
                />
                <StripePayment />
            </div>
        </>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={confirmReservation.isOpen}
            title="Reserve property"
            actionLabel="Continue"
            onClose={confirmReservation.onClose}
            onSubmit={() => {}}
            body={bodyContent}
            showBtn={false}
            // footer={footerContent}
        />
    );
}

export default ConfirmReservationModal;

