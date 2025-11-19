document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const formHeader = document.querySelector('.form-header');
    const discountBanner = document.querySelector('.discount-banner');
    
    // Contenedores de pasos
    const reviewStep = document.getElementById('reviewStep');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Campos del formulario
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const privacyConsent = document.getElementById('privacyConsent');
    
    // Elementos de la revisión
    const reviewEmail = document.getElementById('reviewEmail');
    const reviewName = document.getElementById('reviewName');
    const reviewInterests = document.getElementById('reviewInterests');
    const confirmDataButton = document.getElementById('confirmDataButton');
    const editDataButton = document.getElementById('editDataButton');

    // Mensajes de error
    const emailError = document.getElementById('emailError');
    const privacyError = document.getElementById('privacyError');

    // --- Funciones de control de flujo ---

    // Muestra el formulario y oculta los otros pasos
    function showForm() {
        formHeader.classList.remove('hidden');
        discountBanner.classList.remove('hidden');
        form.classList.remove('hidden');
        reviewStep.classList.add('hidden');
        confirmationMessage.classList.add('hidden');
    }

    // Muestra el paso de revisión y oculta el formulario
    function showReview() {
        formHeader.classList.add('hidden');
        discountBanner.classList.add('hidden');
        form.classList.add('hidden');
        reviewStep.classList.remove('hidden');
        confirmationMessage.classList.add('hidden');
    }

    // Muestra el mensaje de éxito final y oculta todo lo demás
    function showConfirmation() {
        formHeader.classList.add('hidden');
        discountBanner.classList.add('hidden');
        form.classList.add('hidden');
        reviewStep.classList.add('hidden');
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Función para validar formato de email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Lógica de llenado de datos y eventos ---

    // 1. Manejo del envío inicial del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

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


        if (isValid) {
            // Llenar los datos de la pantalla de revisión
            reviewEmail.textContent = emailInput.value.trim();
            
            // Si no se introduce nombre, mostrar un valor por defecto
            reviewName.textContent = nameInput.value.trim() || '(No especificado)';

            // Llenar la lista de intereses
            const selectedInterests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
                .map(checkbox => checkbox.parentNode.textContent.trim());

            reviewInterests.innerHTML = ''; // Limpiar lista anterior
            if (selectedInterests.length > 0) {
                selectedInterests.forEach(interest => {
                    const li = document.createElement('li');
                    li.textContent = interest;
                    reviewInterests.appendChild(li);
                });
            } else {
                reviewInterests.innerHTML = '<li>Ninguno seleccionado</li>';
            }

            // Transición al paso de revisión
            showReview();
        }
    });

    // 2. Botón de Confirmar y Suscribir (Paso de Revisión -> Confirmación)
    confirmDataButton.addEventListener('click', () => {
        // Aquí iría el código real de envío de datos al servidor.
        // Simulamos un envío exitoso:
        console.log("Datos enviados al servidor. ¡Suscripción confirmada!");
        showConfirmation();
        form.reset(); // Limpiar el formulario subyacente
    });

    // 3. Botón de Editar Datos (Paso de Revisión -> Formulario)
    editDataButton.addEventListener('click', () => {
        showForm();
    });

    // Ocultar mensajes de error al escribir/cambiar (Para mejor UX)
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

    // Asegurar que solo el formulario se vea al inicio
    showForm();
});