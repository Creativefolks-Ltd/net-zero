import React, { useState } from "react";


const PasswordInput = ({ name, className, changeHandler, placeholder, blurHandler, value }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowHide = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        // <div className="password-input-box">
        <>
            <input
                name={name}
                type={showPassword ? "text" : "password"}
                className={className}
                value={value}
                placeholder={placeholder}
                onChange={changeHandler}
                onBlur={blurHandler}
            />
            <i className={`fa-solid fa  ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={handleShowHide} ></i>
        </>
        // </div>
    )
}

export default PasswordInput;
