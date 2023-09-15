'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div style={{ width: "100px" }} >

            <Image alt="Logo"
                onClick={() => router.push("/")}
                className="
                  hidden 
                  md:block 
                  cursor-pointer
                  w-full
                  h-auto
                  "
                width="0"
                height="0"
                sizes="100vw"
                src="/images/logo.png"
                priority={true}
            />
        </div>
    )
}

export default Logo;