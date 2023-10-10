import Stripe from 'stripe';
import { NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});



import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();

  let clientId;
  // console.log('STRIPE KEY: ', process.env.STRIPE_SECRET_KEY);
  const {
    id,
    amount,
    description,
    email,
    userName,
  } = body;
  // console.log(body);

  const amountWithTwoZeros = Number(amount.toString() + '00');

  try {
    const existingCustomer = await stripe.customers.list({
      email: email,
      limit: 1
    });

    if (existingCustomer.data.length > 0) {
      clientId = existingCustomer.data[0].id;
    }
    else {
      const newCustomer = await stripe.customers.create({
        name: userName,
        email: email,
      });
      clientId = newCustomer.id
    }

    const payment = await stripe.paymentIntents.create({
      amount: amountWithTwoZeros,
      currency: 'usd',
      description,
      payment_method: id,
      confirm: true,
      customer: clientId,
      payment_method_types: [
        'card',
      ],
    });

    return NextResponse.json({ message: 'creado', payment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error }, { status: 200 });

  }



}