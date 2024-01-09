import Swal from 'sweetalert2';
import { useEffect } from 'react';

const SweetAlert = ({ type, title, text, imageUrl, imageWidth, imageHeight, confirmButtonColor, cancelButtonColor, callback }) => {
    useEffect(() => {
        if (type && title && text) {
            const swalConfig = {
                title,
                text,
                icon: type,
                imageUrl,
                imageWidth,
                imageHeight,
                showCancelButton: false,
                confirmButtonColor,
                cancelButtonColor,
            };

            Swal.fire(swalConfig).then((result) => {
                if (callback && result.isConfirmed) {
                    callback();
                }
            });
        }
    }, [type, title, text, imageUrl, imageWidth, imageHeight, confirmButtonColor, cancelButtonColor, callback]);

    return null;
};

export default SweetAlert;
