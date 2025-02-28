import Swal from "sweetalert2";

/**
 * Displays a SweetAlert popup with customizable options.
 * @param {string} type - Type of alert: "SUCCESS", "FAILED", "WARNING", "INFO"
 * @param {string} title - Title of the alert
 * @param {string} text - Message to display
 * @param {boolean} showCancelButton - Whether to show the cancel button (default: false)
 * @param {string} confirmButtonText - Custom text for confirm button (default: "OK")
 * @param {function} onConfirm - Callback function for confirmation button
 */
const SweetAlert = ({
    type = "INFO",
    title,
    text,
    showCancelButton = false,
    confirmButtonText = "OK",
    onConfirm
}) => {
    const confirmButtonColor = "#81c14b";
    const cancelButtonColor = "#d33";

    const alertConfig = {
        title,
        text,
        icon: type === "FAILED" ? "error" : type.toLowerCase(),
        showCancelButton,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
    };

    Swal.fire(alertConfig).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm();
        }
    });
};

export default SweetAlert;
