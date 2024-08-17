
const redirectToLogin = () => {
    location.href = '../html/login.html'; 
};

const redirectToRegister = () => {
    location.href = '../html/registrarce.html';
};

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('iniciarBtn');
    const registerButton = document.getElementById('registraseBtn');

    if (loginButton) {
        loginButton.addEventListener('click', redirectToLogin);
    }

    if (registerButton) {
        registerButton.addEventListener('click', redirectToRegister);
    }
});
