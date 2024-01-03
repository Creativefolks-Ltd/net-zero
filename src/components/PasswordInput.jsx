import React, { useState } from "react";


const PasswordInput = ({ name, className, changeHandler, placeholder, blurHandler, value, showPassword, setShowPassword }) => {

    const showHidePassword = (e) => {
        setShowPassword(!showPassword)
    }

    return (
        // <div className="password-input-box">
        <>
            <input name={name} type={showPassword ? "text" : "password"} className={className} value={value} placeholder={placeholder} onChange={changeHandler} onBlur={blurHandler} />
            <i class={`fa-solid fa  ${showPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={(e) => showHidePassword(e)}></i>
        </>
        // </div>
    )
}

export default PasswordInput;
