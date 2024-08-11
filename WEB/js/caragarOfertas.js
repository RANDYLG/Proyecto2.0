document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const nombreUsuarioSpan = document.getElementById('nombreUsuario');
    const perfilBtn = document.getElementById('perfilBtn');
    const buscarOfertasBtn = document.getElementById('buscarOfertas');
    const busquedaInput = document.getElementById('busqueda');
    const nivelAcademicoSelect = document.getElementById('nivelAcademico');
    const ofertasContainer = document.getElementById('ofertasContainer');

    const detallesModal = new bootstrap.Modal(document.getElementById('detallesModal'), {});
    const detallesTitulo = document.getElementById('detallesTitulo');
    const detallesEmpresa = document.getElementById('detallesEmpresa');
    const detallesResponsabilidades = document.getElementById('detallesResponsabilidades');
    const detallesRequisitos = document.getElementById('detallesRequisitos');
    const detallesBeneficios = document.getElementById('detallesBeneficios');
    const detallesUbicacion = document.getElementById('detallesUbicacion');
    const detallesFechaPublicacion = document.getElementById('detallesFechaPublicacion');

    const cargarOfertas = () => {
        const busqueda = busquedaInput.value.toLowerCase();
        const nivelAcademico = nivelAcademicoSelect.value;

        fetch(`http://127.0.0.1:5000/ofertas?busqueda=${busqueda}&nivelAcademico=${nivelAcademico}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data received from server:', data); 

            if (Array.isArray(data)) { 
                ofertasContainer.innerHTML = '';
                if (data.length === 0) {
                    alert('No se encontraron ofertas');
                } else {
                    data.forEach(oferta => {
                        const ofertaCard = document.createElement('div');
                        ofertaCard.classList.add('card', 'mb-3');
                        ofertaCard.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">${oferta.titulo_puesto}</h5>
                                <p class="card-text">${oferta.descripcion_empresa}</p>
                                <p class="card-text"><small class="text-muted">${oferta.responsabilidades}</small></p>
                                <button class="btn btn-success aceptarBtn" data-id="${oferta.id}">Aceptar</button>
                                <button class="btn btn-primary detallesBtn" data-id="${oferta.id}" data-oferta='${JSON.stringify(oferta)}'>Detalles</button>
                            </div>
                        `;
                        ofertasContainer.appendChild(ofertaCard);
                    });

                    document.querySelectorAll('.aceptarBtn').forEach(button => {
                        button.addEventListener('click', () => {
                            alert(`Oferta aceptada con ID: ${button.dataset.id}`);
                        });
                    });

                    document.querySelectorAll('.detallesBtn').forEach(button => {
                        button.addEventListener('click', () => {
                            const oferta = JSON.parse(button.dataset.oferta);
                            detallesTitulo.textContent = oferta.titulo_puesto;
                            detallesEmpresa.textContent = oferta.descripcion_empresa;
                            detallesResponsabilidades.textContent = oferta.responsabilidades;
                            detallesRequisitos.textContent = oferta.requisitos;
                            detallesBeneficios.textContent = oferta.beneficios;
                            detallesUbicacion.textContent = oferta.ubicacion;
                            detallesFechaPublicacion.textContent = new Date(oferta.fecha_publicacion).toLocaleDateString();

                            detallesModal.show();
                        });
                    });
                }
            } else {
                console.error('Expected array but received:', data);
                alert('Ocurrió un error al obtener las ofertas.');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    if (usuario) {
        // Mostrar el nombre del usuario en la página
        nombreUsuarioSpan.textContent = `Bienvenido(a), ${usuario.nombre}`;

        perfilBtn.addEventListener('click', () => {
            window.location.href = '../html/pgnUsuarios-perfil.html';
        });

        buscarOfertasBtn.addEventListener('click', () => {
            window.location.href = '../html/pgnUsuarios_buscarOfertas.html';
        });

        // Cerrar sesión
        cerrarSesionBtn.addEventListener('click', () => {
            localStorage.removeItem('usuario');
            alert('Se está cerrando la sesión');
            window.location.href = '../html/login.html';
        });


        buscarOfertasBtn.addEventListener('click', cargarOfertas);
        busquedaInput.addEventListener('input', cargarOfertas);
        nivelAcademicoSelect.addEventListener('change', cargarOfertas);
    }

    cargarOfertas();
});


