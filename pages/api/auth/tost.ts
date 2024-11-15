import { toast } from 'react-toastify';

// Function to show success toast
const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

// Function to show warning toast
const showWarningToast = (message: string) => {
    toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

// Function to show info toast
const showInfoToast = (message: string) => {
    toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export { showSuccessToast, showWarningToast, showInfoToast };
