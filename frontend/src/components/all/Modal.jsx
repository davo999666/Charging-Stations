import { useNavigate } from "react-router-dom";
import {resetCharging} from "../../features/chargingSlice.js";
import {useDispatch} from "react-redux";


const Modal = ({ children }) => {
    const navigate = useNavigate();
   const dispatch = useDispatch();

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[400]">
            <div className="relative bg-amber-200 p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={() => {
                        // dispatch(resetCharging());
                        navigate("/");}}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
