import Button from './Button.jsx';

const TransactionModal = ({ isOpen, onClose, status, hash, errorMessage }) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    };

    const getErrorMessage = () => {
        if (errorMessage) {
            return errorMessage;
        }
        // Default error messages based on common scenarios
        return 'Something went wrong with your transaction. Please try again.';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-[90%] max-w-md rounded-3xl bg-s1 p-8 shadow-xl">
                <div className="flex flex-col items-center gap-6">
                    {/* Icon */}
                    <div className={`text-6xl ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {status === 'success' ? '✓' : '✕'}
                    </div>

                    {/* Message */}
                    <div className="text-center">
                        <h3 className="mb-2 text-xl font-bold text-p4">
                            {status === 'success' ? 'Transaction Successful!' : 'Transaction Failed'}
                        </h3>
                        <p className="text-s4">
                            {status === 'success'
                                ? 'Thank you for your support! Your coffee purchase has been confirmed.'
                                : getErrorMessage()}
                        </p>
                        {hash && (
                            <a
                                href={`https://sepolia.explorer.zksync.io/tx/${hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 block text-p3 hover:underline"
                            >
                                View Your Transaction on a Block Explorer
                            </a>
                        )}
                    </div>

                    {/* Close button */}
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;