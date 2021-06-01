import Swal, { SweetAlertIcon } from 'sweetalert2';

export const showAlert = (titleText = 'Something happened.', alertType?: SweetAlertIcon): void => {
    Swal.fire({
        titleText,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Dismiss',
        icon: alertType,
        showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation',
        },
        hideClass: {
            popup: '',
            backdrop: '',
        },
    });
};
export const drawRect = (detections:[], ctx:any) =>{
    // Loop through each prediction
    detections.forEach(prediction => {

            // Extract boxes and classes
        const x = prediction['bbox'][0];
        const y = prediction['bbox'][1];
        const width = prediction['bbox'][2];
        const height = prediction['bbox'][3];

        const text = prediction['class'];

        if(text === "person"){

            // Set styling
            ctx.strokeStyle = '#008000';
            ctx.font = '18px Arial';

            // Draw rectangles and text
            ctx.beginPath();
            ctx.fillStyle = '#008000'
            ctx.lineWidth = 10;
            ctx.fillText(text, x, y);
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }


    });
}
