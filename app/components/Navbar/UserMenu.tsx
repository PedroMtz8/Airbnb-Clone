'use client';
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import { useCallback, useEffect, useRef, useState } from "react"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/userRentModal";
import { signOut } from "next-auth/react"
import { SaveUser } from "@/app/types";
import { useRouter } from 'next/navigation';
import useUserMenu from '@/app/hooks/useUserMenu';

interface UserMenuProps {
    currentUser?: SaveUser | null
}

function UserMenu({ currentUser }: UserMenuProps) {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const { isOpen, onOpen, onClose, modalRef } = useUserMenu();
    const router = useRouter();

    const toggleMenu = useCallback(() => {
        isOpen ? onClose() : onOpen();
        // setIsOpen(value => !value)
    }, [onOpen, onClose, isOpen]);

    const onRent = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();
        rentModal.onOpen();

    }, [currentUser, loginModal, rentModal]);

    useEffect(() => {
        function handleClick(event: any) {

          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Cierra el menú si se hace clic fuera del menú del usuario
          }
        }
    
        // Agregar el event listener al montar el componente
        document.addEventListener('click', handleClick);
    
        // Remover el event listener al desmontar el componente
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, [modalRef, onClose]);

    return (
        <div className="relative "
        >
            <div className="flex flex-row items-center gap-3"
                onClick={toggleMenu}
                ref={modalRef}
            >
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Airbnb your home
                </div>
                <div
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block" >
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {
                isOpen && (
                    <div className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    " >
                        <div className="flex flex-col cursor-pointer" >
                            {
                                currentUser ? (
                                    <>
                                        <MenuItem 
                                            onClick={() => {
                                                router.push("/trips")
                                                toggleMenu()
                                            }} 
                                            label="My trips" />
                                        <MenuItem 
                                            onClick={() => {
                                                router.push("/favorites")
                                                toggleMenu()
                                            }} 
                                            label="My favorites" />
                                        <MenuItem 
                                            onClick={() => {
                                                router.push("/reservations")
                                                toggleMenu()
                                            }} 
                                            label="My reservations" />
                                        <MenuItem 
                                            onClick={() => { 
                                                router.push("/properties")
                                                toggleMenu()
                                            }} 
                                            label="My properties" />
                                        <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                                        <hr />
                                        <MenuItem onClick={() => signOut()} label="Logout" />
                                    </>
                                )
                                    :
                                    (
                                        <>
                                <MenuItem onClick={loginModal.onOpen} label="Login" />
                                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />                            
                            </>
                                    )
                            }

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserMenu;
