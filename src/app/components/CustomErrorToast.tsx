import toast from "react-hot-toast";
import {Bounce} from "react-toastify";

export const customErrToast = (str: string | undefined) => {
    return toast(str, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}