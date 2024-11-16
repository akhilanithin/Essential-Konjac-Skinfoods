import { toast } from 'react-toastify';

// Function to show success toast
const showSuccessToast = (message) => {
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
const showWarningToast = (message) => {
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
const showInfoToast = (message) => {
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

// Function to show error toast
const showErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export { showSuccessToast, showWarningToast, showInfoToast, showErrorToast };
