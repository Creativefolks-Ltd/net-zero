import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserEmail } from "../redux-store/actions/admin";
import { updateEmailValidation } from "../helpers/validations/Schema";
import PasswordInput from "./PasswordInput";


function UpdateEmailModal({
    show,
    user,
    onClose,
    mutate
}) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const [fields, setFields] = useState({
        email: "",
        admin_password: ""
    })
    const [errors, setErrors] = useState({
        email: "",
        admin_password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFields((prev) => ({
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

        const validationErrors = updateEmailValidation(fields);

        setErrors((prev) => ({
            ...prev,
            [name]: validationErrors[name] || "",
        }));
    };

    const resetForm = () => {
        setFields({
            email: "",
            admin_password: "",
        });

        setErrors({
            email: "",
            admin_password: "",
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleUpdateEmail = async (e) => {
        e.preventDefault();

        const validationErrors = updateEmailValidation(fields);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }


        try {
            // API call here
            setLoading(true);

            await dispatch(
                updateUserEmail({
                    user_id: user.id,
                    fields,
                })
            ).unwrap();

            toast.success("Email updated successfully");

            handleClose();

            // Refresh users
            mutate();

        } catch (error) {
            console.log("UPDATE EMAIL ERROR:", error);

            const apiErrors = error?.errorMsg;

            // Field-level API error
            if (
                apiErrors &&
                typeof apiErrors === "object" &&
                !Array.isArray(apiErrors)
            ) {
                const emailError = apiErrors.email?.[0];

                if (emailError) {
                    setErrors((prev) => ({
                        ...prev,
                        email: emailError,
                    }));
                }
            }
            // General API error
            else if (typeof apiErrors === "string") {
                toast.error(apiErrors);
            }
            // Fallback
            else {
                toast.error(
                    error?.message || "Failed to update email"
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
                                Update Email
                            </h5>

                            <p className="text-muted small mb-0">
                                Update the email address for{" "}
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

                    <form onSubmit={handleUpdateEmail} className="mt-0 admin-form">


                        <div className="modal-body px-4">

                            <div className="form-div mb-3">
                                <label className="form-label mb-2">
                                    Current Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control border"
                                    value={user?.email || ""}
                                    disabled
                                />

                            </div>

                            <div className="form-div mb-3">

                                <label className="form-label mb-2">
                                    New Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control border ${errors.email ? "invalidInput" : ""
                                        }`}
                                    placeholder="Enter new email"
                                    value={fields.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && (
                                    <span className="input-error-msg">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <div className="form-div password-field mb-3">
                                <label className="form-label mb-2">
                                    Admin Password
                                </label>

                                <PasswordInput
                                    name="admin_password"
                                    className={`form-control border ${errors.admin_password ? "invalidInput" : ""}`}
                                    placeholder="Admin password"
                                    value={fields.admin_password}
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
                                disabled={loading}
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
                                    "Update Email"
                                )}

                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default UpdateEmailModal;