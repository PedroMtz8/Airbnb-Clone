import nodemailer from "nodemailer";
import { render } from '@react-email/render';
import ReserveEmail from '../emailTemplates/email';

const emailSender = "pedrocmartinez568@gmail.com"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: emailSender,
    pass: process.env.MAILER_PASSWORD
  },
});

type ReservationMail = (email: string, description: string, price: number, listingId: string, title: string, url: string, imageSrc: string) => Promise<void>;

export const sendReserveMail: ReservationMail = async (
  email,
  description,
  price,
  listingId,
  title,
  url,
  imageSrc,
) => {

  const emailHtml = render(ReserveEmail({ title, price, url, imageSrc }));

  const mailOptions = {
    from: emailSender,
    to: email,
    subject: `Thanks for reserving with Airbnb, enjoy your trip!`,
    text: `You have reserved ${title} for ${price}!`,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it at a higher level if needed.
  }
};


export const welcomeMail = async (name: string, email: string) => {
  const mailOptions = {
    from: emailSender,
    to: email,
    subject: `Welcome to Airbnb ${name}!`,
    text: `Welcome to Airbnb ${name}!`,
    html: `
    <h1>${name} You signed up Airbnb</h1>
    <p>Enjoy traveling with all available trips around the world!</p>
    `
  };


  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Sent mail', info);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it at a higher level if needed.
  }
}