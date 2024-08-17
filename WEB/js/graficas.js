document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const nombreUsuarioSpan = document.getElementById('nombreUsuario'); 
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        nombreUsuarioSpan.textContent = `Bienvenido, ${usuario.nombre}`;
    }

    cerrarSesionBtn.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        alert('Se está cerrando la sesión');
        window.location.href = '../html/login.html';
    });

    const inicioBtn = document.getElementById('inicioBtn');
    inicioBtn.addEventListener('click', () => {
        window.location.href = '../html/pgnAdmin.html';
        cargarUsuarios();
    });

    const graficasBtn = document.getElementById('graficasBtn');
    graficasBtn.addEventListener('click', () => {
        window.location.href = '../html/pgnAdmin_graficas.html';
    });

    const editarUsuarioForm = document.getElementById('editarUsuarioForm');
    if (editarUsuarioForm) {
        editarUsuarioForm.addEventListener('submit', actualizarUsuario);
    }

    const cancelarEdicion = document.getElementById('cancelarEdicion');
    if (cancelarEdicion) {
        cancelarEdicion.addEventListener('click', () => {
            document.getElementById('formularioEdicion').style.display = 'none';
        });
    }
    

    cargarGraficas();
});

const cargarGraficas = () => {
    const paginaActual = window.location.pathname.split('/').pop();
    if (paginaActual === 'pgnAdmin_graficas.html') {
        cargarGraficaUsuarios();
        cargarGraficaFormasJuridicas();
        cargarGraficaRequisitos();
        cargarGraficaOfertasPorMes();
        cargarGraficaNivelRequisitos();
    }
};

const cargarGraficaUsuarios = () => {
    fetch('http://127.0.0.1:5000/countUsersByType', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.Tipo_usuario);
        const counts = data.map(item => item.cantidad);

        const ctx = document.getElementById('usuariosChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Usuarios',
                    data: counts,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Distribución de Usuarios'
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
};

const cargarGraficaFormasJuridicas = () => {
    fetch('http://127.0.0.1:5000/countEmpresasByFormaJuridica', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, 
    })
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.forma_juridica);
        const counts = data.map(item => item.cantidad);

        const ctx = document.getElementById('formasJuridicasChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Empresas',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Forma Jurídica Registradas'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
};

const cargarGraficaRequisitos = () => {
    fetch('http://127.0.0.1:5000/countRequisitos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.requisitos);
        const counts = data.map(item => item.cantidad);

        const ctx = document.getElementById('requisitosChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Carreras',
                    data: counts,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Carreras mas solicitadas'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
};

const cargarGraficaOfertasPorMes = () => {
    fetch('http://127.0.0.1:5000/countOffersByMonth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.mes);
        const counts = data.map(item => item.cantidad);

        const ctx = document.getElementById('ofertasMesChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ofertas Publicadas',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Ofertas Publicadas por Mes'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
};

const cargarGraficaNivelRequisitos = () => {
    fetch('http://127.0.0.1:5000/countNivelRequisitos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.requisitos);
        const counts = data.map(item => item.cantidad);

        const ctx = document.getElementById('nivelrequisitosChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Niveles',
                    data: counts,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Niveles academicos mas solicitados'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
};
