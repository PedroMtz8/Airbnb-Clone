'use client';

import { useRef } from 'react';
import { BiSearch } from "react-icons/bi"
import useClickOutside from '@/app/hooks/useClickOutside';
import useExtendedNavbar from '@/app/hooks/useExtendedNavbar';


const Search = () => {
    const navbarState = useExtendedNavbar();
    const { onOpen, onClose} = useExtendedNavbar();
    const modalRef = useRef(null);
    useClickOutside<HTMLDivElement>(modalRef, onClose, onOpen);
    
    return (
        <div
            ref={modalRef}
            className="
                border-[1px]
                md:w-auto
                py-2
                rounded-full
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
                relative
                flex
                justify-center
            "
            >
            {
                navbarState.isOpen && <ExtendedSearch />
            }
            
            <div
                className="
                  flex
                  flex-row
                  items-center
                  justify-between
                  "
            >
                <div
                    className="
                        text-sm
                        font-semibold
                        px-6
                        "
                >
                    Anywhere

                </div>
                <div
                    className="
                        hidden
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                        flex-1
                        text-center
                        "
                >
                    Any week
                </div>
                <div
                    className="
                        text-sm
                        md:pl-6
                        pl-3
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                        "
                >
                    <div className="hidden sm:block"> Add Guests </div>
                    <div className="
                        p-2
                        bg-rose-500
                        rounded-full
                        text-white
                        "
                    >
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Search;

function ExtendedSearch() {
    return (
        <div className="min-w-[350px] w-[600px] h-[300px] bg-white border-[1px] shadow absolute top-[60px] rounded-md mx-[30px] ">
            <h1>Hola</h1>
        </div>
    )
}


