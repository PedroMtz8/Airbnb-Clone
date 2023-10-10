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
    const router = useRouter();
    const { listingData, totalPrice, currentUser, onSubmit } = useListing();

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
                const description = `Rent :${listingData?.title}, Reference DB Property ID: ${listingData?.id} `
                try {
                    const res = await axios.post('/api/transactions',{
                        id,
                        amount: totalPrice,
                        email: currentUser.email,
                        userName: currentUser.name,
                        description,
                    });
                    toast.success('Payment successful')

                    console.log(res.data);
                    if(onSubmit){
                        onSubmit();
                    }
                    toast.success('Listing reserved')
                    router.push("/trips");

                } catch (error) {
                    console.log(error);
                    toast.error('Hubo un error')
                }
            }
        }
    }
    return (
        <form>
          <CardElement />
          <div>
            <p>Property to reserve: {listingData?.title} Rooms: {listingData?.roomCount} </p>
            <p>Total Price: {totalPrice} </p>
            <button onClick={onConfirmSubmit} >Buy</button>
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
            {/* <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            <Input
                id="password"
                label="Password"
                    type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                    required
                />
                <Button
                    disabled={isLoading}
                    label={"Continue"}
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                /> */}
                <div className="flex justify-center translate-y-3">
                    {/* <p>Or</p> */}
                </div>

            </div>
        </>
    )

    // const footerContent = (
    //     <div className="flex flex-col gap-4 ">
    //         <hr />
    //         <Button
    //             outline
    //             label="Continue with Google"
    //             icon={FcGoogle}
    //             onClick={() => signIn('google')}
    //         />
    //         <Button
    //             outline 
    //             label="Continue with Github"
    //             icon={AiFillGithub}
    //             onClick={() => signIn('github')}
    //         />
    //         <div
    //             className="
    //       text-neutral-500 
    //       text-center 
    //       mt-4 
    //       font-light
    //     "
    //         >
    //             <p>Already have an account?
    //                 <span
    //                     onClick={onToggle}
    //                     className="
    //           text-neutral-800
    //           cursor-pointer 
    //           hover:underline
    //         "
    //                 > Log in</span>
    //             </p>
    //         </div>
    //     </div>
    // )

    return (
        <Modal
            disabled={isLoading}
            isOpen={confirmReservation.isOpen}
            title="Reserve property"
            actionLabel="Continue"
            onClose={confirmReservation.onClose}
            onSubmit={() => {}}
            body={bodyContent}
            // footer={footerContent}
        />
    );
}

export default ConfirmReservationModal;

