'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div style={{ width: "100px" }} >

            <Image alt="Logo"
                className="
                  hidden 
                  md:block 
                  cursor-pointer"
                width="100"
                height="100"
                src="/images/logo.png"
                style={{ height: "auto", width: "auto" }}
                priority={true}
            />
        </div>
    )
}

export default Logo;