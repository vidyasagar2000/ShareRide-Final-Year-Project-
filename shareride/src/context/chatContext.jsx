import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const chatContext = createContext();

function ChatProvider({ children }) {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [chatWith, setChatWith] = useState({});

    return (
        <chatContext.Provider
            value={{
                isChatVisible,
                setIsChatVisible,
                chatWith,
                setChatWith,
            }}
        >
            {children}
        </chatContext.Provider>
    );
}

function useChat() {
    const context = useContext(chatContext); // Pass the context here
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider"); // Updated error message
    }
    return context;
}

// PropTypes for ChatProvider (optional, for type checking)
ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ChatProvider, useChat }; // Exporting the corrected component
