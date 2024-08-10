document.addEventListener('DOMContentLoaded', () => {
    const perfilForm = document.getElementById('perfilForm');
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const nombreUsuarioSpan = document.getElementById('nombreUsuario');
    const perfilBtn = document.getElementById('perfilBtn');
    const buscarOfertasBtn = document.getElementById('buscarOfertas');
    
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
    }

    perfilForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            nombre_completo: document.getElementById('nombreCompleto').value.trim(),
            edad: document.getElementById('edad').value.trim(),
            fecha_nacimiento: document.getElementById('fechaNacimiento').value.trim(),
            genero: document.getElementById('genero').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            carne_conducir: document.getElementById('carneConducir').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim(),
            formaciones: JSON.stringify(getFormaciones()),
            experiencias: JSON.stringify(getExperiencias()),
            competencias: JSON.stringify(getCompetencias()),
            idiomas: JSON.stringify(getIdiomas()),
            referencias: JSON.stringify(getReferencias()),
            pasatiempos: document.getElementById('pasatiempos').value.trim()
        };

        const camposObligatorios = [
            'nombre_completo',
            'edad',
            'fecha_nacimiento',
            'genero',
            'correo',
            'telefono',
            'direccion',
            'descripcion'
        ];

        for (let campo of camposObligatorios) {
            if (!formData[campo]) {
                alert(`El campo ${campo.replace('_', ' ')} es obligatorio.`);
                return;
            }
        }

        fetch('http://127.0.0.1:5000/guardar_formulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });

    // Funciones para obtener datos de formaciones, experiencias, competencias, idiomas y referencias
    const getFormaciones = () => {
        const formaciones = [];
        document.querySelectorAll('#formacionFieldset .formacion').forEach((formacion, index) => {
            formaciones.push({
                formacion: formacion.value,
                institucion: document.querySelectorAll('#formacionFieldset .institucion')[index].value,
                localidad: document.querySelectorAll('#formacionFieldset .localidad')[index].value,
                fechaInicio: document.querySelectorAll('#formacionFieldset .fechaInicio')[index].value,
                fechaFin: document.querySelectorAll('#formacionFieldset .fechaFin')[index].value,
                aunPresente: document.querySelectorAll('#formacionFieldset .aunPresente')[index].checked
            });
        });
        return formaciones;
    };

    const getExperiencias = () => {
        const experiencias = [];
        document.querySelectorAll('#experienciaFieldset .puesto').forEach((puesto, index) => {
            experiencias.push({
                puesto: puesto.value,
                empresa: document.querySelectorAll('#experienciaFieldset .empresa')[index].value,
                localidad: document.querySelectorAll('#experienciaFieldset .localidadExp')[index].value,
                fechaInicio: document.querySelectorAll('#experienciaFieldset .fechaInicioExp')[index].value,
                fechaFin: document.querySelectorAll('#experienciaFieldset .fechaFinExp')[index].value,
                aunPresente: document.querySelectorAll('#experienciaFieldset .aunPresenteExp')[index].checked,
                descripcion: document.querySelectorAll('#experienciaFieldset .descripcionExp')[index].value
            });
        });
        return experiencias;
    };

    const getCompetencias = () => {
        const competencias = [];
        document.querySelectorAll('#competenciasFieldset .competencia').forEach((competencia, index) => {
            competencias.push({
                competencia: competencia.value,
                nivel: document.querySelectorAll('#competenciasFieldset .nivelCompetencia')[index].value
            });
        });
        return competencias;
    };

    const getIdiomas = () => {
        const idiomas = [];
        document.querySelectorAll('#idiomasFieldset .idioma').forEach((idioma, index) => {
            idiomas.push({
                idioma: idioma.value,
                nivel: document.querySelectorAll('#idiomasFieldset .nivelIdioma')[index].value
            });
        });
        return idiomas;
    };

    const getReferencias = () => {
        const referencias = [];
        document.querySelectorAll('#referenciasFieldset .nombreReferencia').forEach((nombre, index) => {
            referencias.push({
                nombre: nombre.value,
                empresa: document.querySelectorAll('#referenciasFieldset .empresaReferencia')[index].value,
                localidad: document.querySelectorAll('#referenciasFieldset .localidadReferencia')[index].value,
                telefono: document.querySelectorAll('#referenciasFieldset .telefonoReferencia')[index].value,
                correo: document.querySelectorAll('#referenciasFieldset .correoReferencia')[index].value
            });
        });
        return referencias;
    };


    document.getElementById('agregarFormacion').onclick = () => agregarFormacion();
    document.getElementById('agregarExperiencia').onclick = () => agregarExperiencia();
    document.getElementById('agregarCompetencia').onclick = () => agregarCompetencia();
    document.getElementById('agregarIdioma').onclick = () => agregarIdioma();
    document.getElementById('agregarReferencia').onclick = () => agregarReferencia();
});

const agregarFormacion = () => {
    const formacionFieldset = document.getElementById('formacionFieldset');
    const nuevaFormacion = `
        <div class="mb-3">
            <label class="form-label">Formación:</label>
            <select class="form-select formacion">
                <option value="">Seleccione</option>
                <option value="Técnico">Técnico</option>
                <option value="Tecnologo">Tecnologo</option>
                <option value="Ingenieria">Ingenieria</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Institución:</label>
            <input type="text" class="form-control institucion">
        </div>
        <div class="mb-3">
            <label class="form-label">Localidad:</label>
            <input type="text" class="form-control localidad">
        </div>
        <div class="mb-3">
            <label class="form-label">Fecha de inicio:</label>
            <input type="date" class="form-control fechaInicio">
        </div>
        <div class="mb-3">
            <label class="form-label">Fecha de fin:</label>
            <input type="date" class="form-control fechaFin">
        </div>
        <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input aunPresente">
            <label class="form-check-label" for="aunPresente">Aún presente</label>
        </div>`;
    formacionFieldset.insertAdjacentHTML('beforeend', nuevaFormacion);
};

const agregarExperiencia = () => {
    const experienciaFieldset = document.getElementById('experienciaFieldset');
    const nuevaExperiencia = `
        <div class="mb-3">
            <label class="form-label">Puesto:</label>
            <input type="text" class="form-control puesto">
        </div>
        <div class="mb-3">
            <label class="form-label">Empresa:</label>
            <input type="text" class="form-control empresa">
        </div>
        <div class="mb-3">
            <label class="form-label">Localidad:</label>
            <input type="text" class="form-control localidadExp">
        </div>
        <div class="mb-3">
            <label class="form-label">Fecha de inicio:</label>
            <input type="date" class="form-control fechaInicioExp">
        </div>
        <div class="mb-3">
            <label class="form-label">Fecha de fin:</label>
            <input type="date" class="form-control fechaFinExp">
        </div>
        <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input aunPresenteExp">
            <label class="form-check-label" for="aunPresenteExp">Aún presente</label>
        </div>
        <div class="mb-3">
            <label class="form-label">Descripción:</label>
            <textarea class="form-control descripcionExp"></textarea>
        </div>`;
    experienciaFieldset.insertAdjacentHTML('beforeend', nuevaExperiencia);
};

const agregarCompetencia = () => {
    const competenciasFieldset = document.getElementById('competenciasFieldset');
    const nuevaCompetencia = `
        <div class="mb-3">
            <label class="form-label">Competencia:</label>
            <input type="text" class="form-control competencia">
        </div>
        <div class="mb-3">
            <label class="form-label">Nivel:</label>
            <select class="form-select nivelCompetencia">
                <option value="">Seleccione</option>
                <option value="Bajo">Bajo</option>
                <option value="Medio">Medio</option>
                <option value="Alto">Alto</option>
            </select>
        </div>`;
    competenciasFieldset.insertAdjacentHTML('beforeend', nuevaCompetencia);
};

const agregarIdioma = () => {
    const idiomasFieldset = document.getElementById('idiomasFieldset');
    const nuevoIdioma = `
        <div class="mb-3">
            <label class="form-label">Idioma:</label>
            <input type="text" class="form-control idioma">
        </div>
        <div class="mb-3">
            <label class="form-label">Nivel:</label>
            <select class="form-select nivelIdioma">
                <option value="">Seleccione</option>
                <option value="Bajo">Bajo</option>
                <option value="Medio">Medio</option>
                <option value="Alto">Alto</option>
                <option value="Nativo">Nativo</option>
            </select>
        </div>`;
    idiomasFieldset.insertAdjacentHTML('beforeend', nuevoIdioma);
};

const agregarReferencia = () => {
    const referenciasFieldset = document.getElementById('referenciasFieldset');
    const nuevaReferencia = `
        <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input type="text" class="form-control nombreReferencia">
        </div>
        <div class="mb-3">
            <label class="form-label">Empresa:</label>
            <input type="text" class="form-control empresaReferencia">
        </div>
        <div class="mb-3">
            <label class="form-label">Localidad:</label>
            <input type="text" class="form-control localidadReferencia">
        </div>
        <div class="mb-3">
            <label class="form-label">Teléfono:</label>
            <input type="text" class="form-control telefonoReferencia">
        </div>
        <div class="mb-3">
            <label class="form-label">Correo:</label>
            <input type="email" class="form-control correoReferencia">
        </div>`;
    referenciasFieldset.insertAdjacentHTML('beforeend', nuevaReferencia);
};
