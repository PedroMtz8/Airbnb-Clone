'use client'
import { useState, useEffect, useCallback } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

function Modal({
    isOpen, onClose, onSubmit,
    title, body, footer,
    actionLabel, disabled,
    secondaryAction, secondaryLabel }
    : ModalProps) {

    const [showModal, setShowModal] = useState(isOpen);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)

    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit()

    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction()
    }, [disabled, secondaryAction])

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <>
            <div className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70
        ">
            </div>
        </>
    )
}

export default Modal;