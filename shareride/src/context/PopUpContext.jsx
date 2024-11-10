import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
// import toast from "react-hot-toast";

const PopUpContext = createContext();

function PopUpProvider({ children }) {
    const [message, setPopUPMessage] = useState(null);
    const [isPopUPVisible, setIsPopUPVisible] = useState(false);
    const [onYesFunc, setOnYesFunc] = useState(null);
    const [isOnYesFucSuccessful,SetIsOnYesFucSuccessful] = useState(null);

    return (
        <PopUpContext.Provider
            value={{
                message,
                setPopUPMessage,
                isPopUPVisible,
                setIsPopUPVisible,
                onYesFunc,
                setOnYesFunc,
                isOnYesFucSuccessful,
                SetIsOnYesFucSuccessful
            }}
        >
            {children}
        </PopUpContext.Provider>
    );
}

function usePopUp() {
    const context = useContext(PopUpContext);
    if (context === undefined) {
        throw new Error("usePopUp must be used within a PopUpProvider");
    }
    return context;
}

// PropTypes for PopUpProvider (optional, for type checking)
PopUpProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PopUpProvider, usePopUp };
