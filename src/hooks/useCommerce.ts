import { useContext } from "react";
import CommerceContext from "../context/CommerceProvider";

const useCommerce = () => {
    const context = useContext(CommerceContext);

    if (!context) {
        throw new Error("useCommerce debe usarse dentro de un CommerceProvider");
    }

    return context;
};

export default useCommerce;