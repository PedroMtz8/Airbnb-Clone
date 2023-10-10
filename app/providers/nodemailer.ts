import nodemailer from "nodemailer";

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

type ReservationMail = (email: string, description: string, price: number, listingId: string, title: string, url: string) => Promise<void>;

export const sendReserveMail: ReservationMail = async (
  email,
  description,
  price,
  listingId,
  title,
  url
) => {
  const mailOptions = {
    from: emailSender,
    to: email,
    subject: `Thanks for reserving with Airbnb, enjoy your trip!`,
    text: `You have reserved ${title} for ${price}!`,
    html: `
    <h1>Confirmation</h1>
    <p>You have reserved ${title} for ${price}!</p>
    <p>You can see your reservation on the button below</p>
    <a href="${url}">
      <button>Go reservation</button>
    </a>
    `
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
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it at a higher level if needed.
  }
}