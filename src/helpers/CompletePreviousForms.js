import Swal from "sweetalert2";

export const CompletePreviousForms = () => {
  Swal.fire({
    title: "Warning!",
    text: "Please ensure all previous forms are completed before proceeding further.",
    icon: "warning",
    showCancelButton: false,
    confirmButtonColor: "#81c14b",
  });
}