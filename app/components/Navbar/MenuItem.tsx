'use client';

interface MenuItemProps {
    onClick: () => void;
    label: string
}

function MenuItem({onClick, label}: MenuItemProps){
    return(
        <div
            onClick={onClick}
            className="
                px-4
                py-3
                hover:bg-white-100
                transition
                font-semibold
                "
        >
            {label}

        </div>
    )
}

export default MenuItem;