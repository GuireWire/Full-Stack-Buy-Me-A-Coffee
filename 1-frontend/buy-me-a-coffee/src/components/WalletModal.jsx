import { useEffect, useRef } from 'react';

export const WalletModal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-[#1F1B18] rounded-2xl p-6 w-[320px]">
                {children}
            </div>
        </div>
    );
};