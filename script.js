document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const emailInput = document.getElementById('email');
    const privacyConsent = document.getElementById('privacyConsent');
    const emailError = document.getElementById('emailError');
    const privacyError = document.getElementById('privacyError');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario

        let isValid = true;

        // Validación del Email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'El email es obligatorio.';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Introduce un email válido.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validación del consentimiento de privacidad
        if (!privacyConsent.checked) {
            privacyError.textContent = 'Debes aceptar la política de privacidad.';
            privacyError.style.display = 'block';
            isValid = false;
        } else {
            privacyError.style.display = 'none';
        }

        form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        // ... (Tu lógica de validación del email y el consentimiento va aquí) ...
        // ... (Asegúrate de no borrar las validaciones existentes) ...

        // Validación del Email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'El email es obligatorio.';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Introduce un email válido.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validación del consentimiento de privacidad
        if (!privacyConsent.checked) {
            privacyError.textContent = 'Debes aceptar la política de privacidad.';
            privacyError.style.display = 'block';
            isValid = false;
        } else {
            privacyError.style.display = 'none';
        }


        if (isValid) {
            // 1. Ocultar el formulario
            form.classList.add('hidden');
            
            // 2. Mostrar el mensaje de confirmación
            const confirmationMessage = document.getElementById('confirmationMessage');
            confirmationMessage.classList.remove('hidden');

            // 3. (Opcional) Puedes añadir un pequeño scroll para asegurar que el mensaje sea visible
            confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // En un entorno real, la llamada al servidor para la suscripción iría aquí
            // fetch('/api/subscribe', { method: 'POST', body: data });
        }
    });

    // ... (El resto de las funciones y listeners se mantienen) ...
    });

    // Función para validar formato de email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Ocultar mensajes de error al escribir/cambiar
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value)) {
            emailError.style.display = 'none';
        }
    });

    privacyConsent.addEventListener('change', () => {
        if (privacyConsent.checked) {
            privacyError.style.display = 'none';
        }
    });
});