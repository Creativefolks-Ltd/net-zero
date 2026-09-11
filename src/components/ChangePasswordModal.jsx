import React, { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserPassword } from "../redux-store/actions/admin";
import { updatePasswordValidation } from "../helpers/validations/Schema";


function ChangePasswordModal({
    show,
    user,
    onClose,
}) {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const [passwordFields, setPasswordFields] = useState({
        password: "",
        confirm_password: "",
        admin_password: "",
    })
    const [errors, setErrors] = useState({
        password: "",
        confirm_password: "",
        admin_password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPasswordFields((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;

        const validationErrors = updatePasswordValidation(passwordFields);

        setErrors((prev) => ({
            ...prev,
            [name]: validationErrors[name] || "",
        }));
    };


    const resetForm = () => {
        setPasswordFields({
            password: "",
            confirm_password: "",
            admin_password: "",
        });

        setErrors({
            password: "",
            confirm_password: "",
            admin_password: "",
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();

        const validationErrors = updatePasswordValidation(passwordFields);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }


        try {
            setLoading(true)
            const payload = {
                new_password: passwordFields?.password,
                reenter_password: passwordFields?.confirm_password,
                admin_password: passwordFields?.admin_password
            }
            await dispatch(
                updateUserPassword({
                    user_id: user.id,
                    fields: payload
                })
            ).unwrap();

            toast.success("Password changed successfully");

            handleClose();

        } catch (error) {
            console.log("UPDATE PASSWORD ERROR:", error);

            const apiErrors = error?.errorMsg;

            // Field-level validation errors
            if (
                apiErrors &&
                typeof apiErrors === "object" &&
                !Array.isArray(apiErrors)
            ) {
                setErrors((prev) => ({
                    ...prev,
                    password: apiErrors.new_password?.[0] || "",
                    confirm_password: apiErrors.reenter_password?.[0] || "",
                    admin_password: apiErrors.admin_password?.[0] || "",
                }));
            }
            // General API error
            else if (typeof apiErrors === "string") {
                toast.error(apiErrors);
            }
            // Fallback
            else {
                toast.error(
                    error?.message || "Failed to change password"
                );
            }
        } finally {
            setLoading(false);
        }
    };


    if (!show || !user) {
        return null;
    }

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content border-0 shadow">

                    <div className="modal-header">

                        <div>
                            <h5 className="modal-title fw-semibold mb-1">
                                Change Password
                            </h5>

                            <p className="text-muted small mb-0">
                                Set a new password for{" "}
                                <strong>
                                    {user?.first_name}{" "}
                                    {user?.last_name}
                                </strong>
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <form onSubmit={handleChangePassword} className="mt-0 admin-form">

                        <div className="modal-body px-4">

                            {/* New Password */}
                            <div className="form-div password-field mb-3">

                                <label className="form-label mb-2">
                                    New Password
                                </label>

                                <PasswordInput
                                    name="password"
                                    className={`form-control border ${errors.password ? "invalidInput" : ""
                                        }`}
                                    placeholder="Enter new password"
                                    value={passwordFields.password}
                                    changeHandler={handleChange}
                                    handleBlur={handleBlur}
                                />
                                {errors.password && (
                                    <span className="input-error-msg">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="form-div password-field mb-3">

                                <label className="form-label mb-2">
                                    Confirm Password
                                </label>

                                <PasswordInput
                                    name="confirm_password"
                                    className={`form-control border ${errors.confirm_password ? "invalidInput" : ""
                                        }`}
                                    placeholder="Confirm new password"
                                    value={passwordFields.confirm_password}
                                    changeHandler={handleChange}
                                    handleBlur={handleBlur}
                                />
                                {errors.confirm_password && (
                                    <span className="input-error-msg">
                                        {errors.confirm_password}
                                    </span>
                                )}
                            </div>

                            {/* Admin Password */}
                            <div className="form-div password-field mb-3">

                                <label className="form-label mb-2">
                                    Admin Password
                                </label>

                                <PasswordInput
                                    name="admin_password"
                                    className={`form-control border ${errors.admin_password ? "invalidInput" : ""
                                        }`}
                                    placeholder="Admin password"
                                    value={passwordFields.admin_password}
                                    changeHandler={handleChange}
                                    blurHandler={handleBlur}
                                />
                                {errors.admin_password && (
                                    <span className="input-error-msg">
                                        {errors.admin_password}
                                    </span>
                                )}

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-sm btn-success"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Updating...
                                    </div>
                                ) : (
                                    "Change Password"
                                )}

                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default ChangePasswordModal;