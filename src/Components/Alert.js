import React from 'react'
import "./Alert_style.css"

function Alert(props) {
    const { alertText } = props;
    const capitalize = (word) => {
        if (word === "danger") { word = "Error" }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        alertText && <div className={`toast align-items-center text-bg-${alertText.type} border-0 alert-msg ${alertText ? "alertAnimationIn" : ""}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    <strong>{capitalize(alertText.type)}</strong>: {alertText.msg}
                </div>
            </div>
        </div>
    )
}

export default Alert
