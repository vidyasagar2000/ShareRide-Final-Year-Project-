import "./PopUp.css"; // Importing the CSS file
import PropTypes from 'prop-types';
import { usePopUp } from '../context/PopUpContext';

function PopUp() {
    // Get context values
    const { 
        message, 
        isPopUPVisible, 
        setIsPopUPVisible, 
        onYesFunc,
        setOnYesFunc,
        setPopUPMessage,
        SetIsOnYesFucSuccessful
    } = usePopUp(); // Call the usePopUp function

    const handleConfirm = async () => {
        console.log("handle confirm clicked");
        
        if (onYesFunc) {
            const res = await onYesFunc(); // Call the yes function if defined
            
            if (res) {
                SetIsOnYesFucSuccessful(true);
            } else {
                SetIsOnYesFucSuccessful(false); // Optionally handle failure
            }
        }
        
        // Hide the popup after confirming
        setIsPopUPVisible(false); 
        setOnYesFunc(null); 
        setPopUPMessage(null);
    };

    const handleCancel = () => {
        console.log("handle cancel clicked");
        setIsPopUPVisible(false); // Hide the popup on cancel
        setOnYesFunc(null);
        setPopUPMessage(null);
    };

    console.log("isPopUPVisible", isPopUPVisible);
    
    return (
        isPopUPVisible && (
            <div className="PopupContainer">
                <div className="PopupContent">
                    <div>
                        <p>{message} ?</p>
                    </div>
                    <div className="flex mt-4">
                        <button
                            onClick={handleConfirm}
                            className="PopupButton YesButton"
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleCancel}
                            className="PopupButton CancelButton"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

// Prop Validation
PopUp.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default PopUp;
