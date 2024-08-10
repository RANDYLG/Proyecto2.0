document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const empresaBtn = document.getElementById('empresaBtn');
    const publicarOfertasBtn = document.getElementById('publicarOfertasBtn');
    const inicioBtn = document.getElementById('inicioBtn');

    const nombreUsuarioSpan = document.getElementById('nombreUsuario');
    const usuario = JSON.parse(localStorage.getItem('usuario')); 

    if (usuario) {
        // Mostrar el nombre del usuario en la página
        nombreUsuarioSpan.textContent = `Bienvenido(a), ${usuario.nombre}`;
    }

    inicioBtn.addEventListener('click', () => {
        window.location.href = '../html/pgnEmpresa.html';
    });

    cerrarSesionBtn.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        alert('Se está cerrando la sesión');
        window.location.href = '../html/login.html';
    });

    empresaBtn.addEventListener('click', () =>{
        window.location.href = '../html/pgnEmpresa_empresa.html';
    })

    publicarOfertasBtn.addEventListener('click', () =>{
        window.location.href = '../html/pgnEmpresa_publicarOferta.html';
    })
});

const guardarEmpresa = () => {
    const formaJuridica = document.getElementById('formaJuridica').value;
    const nombreEmpresa = document.getElementById('nombreEmpresa').value;
    const nit = document.getElementById('nit').value;
    const descripcion = document.getElementById('descripcion').value;

    if (!formaJuridica || !nombreEmpresa || !nit || !descripcion) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const data = {
        formaJuridica,
        nombreEmpresa,
        nit,
        descripcion
    };

    fetch('http://127.0.0.1:5000/guardar_empresa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            document.getElementById('empresaForm').reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al guardar la empresa.');
    });
};

const agregarRequisito = () => {
    const requisitosContainer = document.getElementById('requisitosContainer');
    const newRequisitoDiv = document.createElement('div');
    newRequisitoDiv.classList.add('input-group', 'mb-2');
    newRequisitoDiv.innerHTML = `
        <select class="form-select" required>
            <option value="" disabled selected>Seleccione un requisito</option>
            <option value="Tecnico profesional Gestion de Sistemas Electricos">Técnico profesional Gestión de Sistemas Eléctricos</option>
            <option value="Tecnologo Gestion de Sistemas Electricos">Tecnólogo Gestión de Sistemas Eléctricos</option>
            <option value="Ingenieria Electrica">Ingeniería Eléctrica</option>
            <option value="Tecnico profesional en Seguridad y Salud en el Trabajo">Técnico profesional en Seguridad y Salud en el Trabajo</option>
            <option value="Tecnologo en gestion de Seguridad y Salud en el Trabajo">Tecnólogo en gestión de Seguridad y Salud en el Trabajo</option>
            <option value="Ingenieria en Seguridad y Salud en el trabajo">Ingeniería en Seguridad y Salud en el trabajo</option>
            <option value="Tecnico profesional en Operacion de Procesos Industriales">Técnico profesional en Operación de Procesos Industriales</option>
            <option value="Tecnologo en Gestion de Procesos Industriales">Tecnólogo en Gestión de Procesos Industriales</option>
            <option value="Ingenieria Industrial">Ingeniería Industrial</option>
            <option value="Tecnico profesional en Mantenimiento Electromecanico">Técnico profesional en Mantenimiento Electromecánico</option>
            <option value="Tecnologo en Gestion de Sistemas Electromecanicos">Tecnólogo en Gestión de Sistemas Electromecánicos</option>
            <option value="Tecnico profesional en Mantenimiento Electronico Industrial">Técnico profesional en Mantenimiento Electrónico Industrial</option>
            <option value="Tecnologo en Automatizacion Electronica Industrial">Tecnólogo en Automatización Electrónica Industrial</option>
            <option value="Ingenieria Mecatronica">Ingeniería Mecatrónica</option>
            <option value="Tecnico profesional en Mantenimiento de Sistemas Informaticos">Técnico profesional en Mantenimiento de Sistemas Informáticos</option>
            <option value="Tecnologo en Gestion de Sistemas Informaticos">Tecnólogo en Gestión de Sistemas Informáticos</option>
            <option value="tecnico profesional Instalacion y Mantenimiento de Redes de Telecomunicaciones">Técnico profesional Instalación y Mantenimiento de Redes de Telecomunicaciones</option>
            <option value="Tecnologo en Gestion de Redes de Telecomunicaciones">Tecnólogo en Gestión de Redes de Telecomunicaciones</option>
            <option value="Ingenieria Telematica">Ingeniería Telemática</option>
        </select>
        <button type="button" class="btn btn-danger" onclick="eliminarRequisito(this)">Eliminar</button>
    `;
    requisitosContainer.appendChild(newRequisitoDiv);
};

const eliminarRequisito = (button) => {
    button.parentElement.remove();
};

const guardarOferta = () => {
    const tituloPuesto = document.getElementById('tituloPuesto').value;
    const descripcionEmpresa = document.getElementById('descripcionEmpresa').value;
    const responsabilidades = document.getElementById('responsabilidades').value;
    const requisitosSelects = document.querySelectorAll('#requisitosContainer select');
    const requisitos = Array.from(requisitosSelects).map(select => select.value);
    const beneficios = document.getElementById('beneficios').value;
    const ubicacion = document.getElementById('ubicacion').value;

    if (!tituloPuesto || !descripcionEmpresa || !responsabilidades || !beneficios || !ubicacion || requisitos.includes('')) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const data = {
        tituloPuesto,
        descripcionEmpresa,
        responsabilidades,
        requisitos,
        beneficios,
        ubicacion
    };

    fetch('http://127.0.0.1:5000/guardar_oferta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            document.getElementById('ofertaForm').reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al guardar la oferta.');
    });
};
