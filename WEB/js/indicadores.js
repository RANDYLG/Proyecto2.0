document.addEventListener('DOMContentLoaded', () => {
    cargarTotalUsuarios();
    cargarTotalEmpresas();
    cargarTotalHV();
    cargarTotalOfertas();
});

const cargarTotalUsuarios = () => {
    fetch('http://127.0.0.1:5000/getTotalUsuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ERROR, ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('totalUsuarios').textContent = data.totalUsuarios;
    })
    .catch(error => console.error('Error:', error));
};

const cargarTotalEmpresas = () => {
    fetch('http://127.0.0.1:5000/getTotalEmpresas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ERROR, ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('totalEmpresas').textContent = data.totalEmpresas;
    })
    .catch(error => console.error('Error:', error));
};

const cargarTotalHV = () => {
    fetch('http://127.0.0.1:5000/getTotalHV', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ERROR, ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('totalHV').textContent = data.totalHV;
    })
    .catch(error => console.error('Error:', error));
};

const cargarTotalOfertas = () => {
    fetch('http://127.0.0.1:5000/getTotalOfertas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ERROR, ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('totalOfertas').textContent = data.totalOfertas;
    })
    .catch(error => console.error('Error:', error));
};
