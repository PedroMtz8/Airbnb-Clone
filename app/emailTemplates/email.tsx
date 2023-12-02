import { Tailwind, Button, Img } from "@react-email/components";

interface EmailProps {
  title: string;
  price: number;
  url: string;
  imageSrc: string;
}

export default function ReserveEmail({ title, price, url, imageSrc }: EmailProps){
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <p className="text-[24px] font-bold " >Confirmation</p>
      <p>You have reserved {title} for ${price}!</p>
      <Img src={imageSrc} alt={title} width="300" height="300" className='object-fit my-[20px]' />
      <Button
        href={url}
        className="bg-brand rounded px-3 py-2 font-medium leading-4 text-white"
        // style={{ border: "1px solid blue" }}
      >
        View reservation
      </Button>
    </Tailwind>
  );
};