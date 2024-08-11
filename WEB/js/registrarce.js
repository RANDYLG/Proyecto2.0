document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const tipoUsuarioSelect = document.getElementById('tipoUsuario');
    const usuarioInput = document.getElementById('usuario');
    const registrarBtn = document.getElementById('registrarBtn');
    const regresarBtn = document.getElementById('regresarBtn');

    const generateEmail = () => {
        const nombre = nombreInput.value.replace(/\s+/g, '').toLowerCase();
        const tipoUsuario = tipoUsuarioSelect.value;
        let email = '';

        if (tipoUsuario === 'empresa') {
            email = `${nombre}@uni.empresa.co`;
        } else if (tipoUsuario === 'estudiante') {
            email = `${nombre}@uni.edu.co`;
        } else if (tipoUsuario === 'administrador') {
            email = `${nombre}@uni.admin.co`;
        }

        usuarioInput.value = email;
    };

    const mostrarAlerta = (mensaje) => {
        alert(mensaje);
    };

    const validarContrasena = (contrasena) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+])[A-Za-z\d!@#$%^&*+]{6,}$/;
        return regex.test(contrasena);
    };

    tipoUsuarioSelect.addEventListener('change', generateEmail);
    nombreInput.addEventListener('input', generateEmail);

    const validateForm = () => {
        if (!nombreInput.value.trim()) {
            mostrarAlerta('Por favor, ingrese su nombre');
            return false;
        }
        if (!passwordInput.value.trim()) {
            mostrarAlerta('Por favor, ingrese su contraseña');
            return false;
        }
        if (!validarContrasena(passwordInput.value)) {
            mostrarAlerta('La contraseña debe tener al menos una letra mayúscula, un símbolo, un número y mínimo 6 caracteres');
            return false;
        }
        if (!confirmPasswordInput.value.trim()) {
            mostrarAlerta('Por favor, confirme su contraseña');
            return false;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            mostrarAlerta('Las contraseñas no coinciden');
            return false;
        }
        if (!tipoUsuarioSelect.value.trim()) {
            mostrarAlerta('Por favor, seleccione un tipo de usuario');
            return false;
        }
        if (!usuarioInput.value.trim()) {
            mostrarAlerta('El campo de usuario no puede estar vacío');
            return false;
        }
        return true;
    };

    registrarBtn.addEventListener('click', () => {
        if (validateForm()) {
            const data = {
                nombre: nombreInput.value,
                password: passwordInput.value,
                tipo_usuario: tipoUsuarioSelect.value,
                usuario: usuarioInput.value
            };

            fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                mostrarAlerta(data.message);
                if (data.success) {
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

    regresarBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});
