document.addEventListener('DOMContentLoaded', () => {
    const ingresarBtn = document.getElementById('ingresarBtn');
    const regresarBtn = document.getElementById('regresarBtn');
    

    regresarBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
    

    ingresarBtn.addEventListener('click', verificar);
});

const verificar = () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let tipo_usuario = '';
    if (username.endsWith('@uni.edu.co')) {
        tipo_usuario = 'estudiante';
    } else if (username.endsWith('@uni.empresa.co')) {
        tipo_usuario = 'empresa';
    } else if (username.endsWith('@uni.admin.co')) {
        tipo_usuario = 'administrador';
    } else {
        alert("Dominio de usuario no reconocido.");
        return;
    }

    fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            usuario: username,
            password: password,
            tipo_usuario: tipo_usuario
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        return response.json();
    })
    .then(data => {
        console.log('Inicio de sesión exitoso:', data);
        const user = data.user;
        alert("Bienvenido");

        localStorage.setItem("usuario", JSON.stringify(user));

        if (user.tipo_usuario === 'estudiante') {
            window.location.href = "../html/pgnUsuarios.html";
        } else if (user.tipo_usuario === 'empresa') {
            window.location.href = "../html/pgnEmpresa.html";
        } else if (user.tipo_usuario === 'administrador') {
            window.location.href = "../html/pgnAdmin.html";
        } else {
            alert("Usuario con dominio desconocido.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
};
