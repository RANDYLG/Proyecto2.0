document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const nombreUsuarioSpan = document.getElementById('nombreUsuario'); 
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const graficasBtn = document.getElementById('graficasBtn');
    const token = localStorage.getItem('token');
    const inicioBtn = document.getElementById('inicioBtn');

    if (!token) {
        alert('No has iniciado sesión');
        window.location.href = '../html/login.html';
        return;
    }

    if (usuario) {
        nombreUsuarioSpan.textContent = `Bienvenido, ${usuario.nombre}`;

        inicioBtn.addEventListener('click', () => {
            window.location.href = '../html/pgnAdmin.html';
        });

        graficasBtn.addEventListener('click', () => {
            window.open('../html/pgnAdmin_graficas.html', '_blank');
        });

        cerrarSesionBtn.addEventListener('click', () => {
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            alert('Se está cerrando la sesión');
            window.location.href = '../html/login.html';
        });

        let inactividadTimeout;
        const tiempoInactividad = 60000;

        const resetearInactividad = () => {
            clearTimeout(inactividadTimeout);
            inactividadTimeout = setTimeout(() => {
                alert('Has sido desconectado por inactividad.');
                localStorage.removeItem('usuario');
                localStorage.removeItem('token');
                window.location.href = '../html/login.html';
            }, tiempoInactividad);
        };

        document.onmousemove = resetearInactividad;
        document.onkeypress = resetearInactividad;
        resetearInactividad();
    }

    // const reporteBtn = document.getElementById('reporteBtn');
    // reporteBtn.addEventListener('click', () => {
    //     window.location.href = '../html/pgnAdmin_descargarReporte.html';
    // });

    const filtro = document.getElementById('filtro');
    if (filtro) {
        filtro.addEventListener('change', cargarUsuarios);
    }

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

    cargarUsuarios();
});

$(document).ready(() => {
    $('#usuariosTable').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });

    $('#editarUsuarioForm').on('submit', (event) => {
        actualizarUsuario(event);
    });
});


const cargarUsuarios = () => {
    fetch('http://127.0.0.1:5000/getAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const usuariosTable = $('#usuariosTable').DataTable();
        usuariosTable.clear(); // Limpia la tabla antes de agregar los datos

        const filtro = document.getElementById('filtro').value;
        const usuariosFiltrados = data.filter(usuario => {
            if (filtro === 'todos') return true;
            if (filtro === 'estudiante' && usuario.Tipo_usuario === 'estudiante') return true;
            if (filtro === 'empresa' && usuario.Tipo_usuario === 'empresa') return true;
            return false;
        });

        usuariosFiltrados.forEach(usuario => {
            usuariosTable.row.add([
                usuario.Nombre,
                usuario.Usuario,
                usuario.Tipo_usuario,
                `
                <button class="btn btn-warning btn-sm" onclick="editarUsuario('${usuario.Usuario}', '${usuario.Tipo_usuario}', '${usuario.Nombre}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.Usuario}', '${usuario.Tipo_usuario}')">Eliminar</button>
                <button class="btn btn-info btn-sm" onclick="verUsuario('${usuario.Usuario}', '${usuario.Tipo_usuario}')">Ver</button>
                `
            ]);
        });

        usuariosTable.draw(); // Dibuja la tabla después de agregar todos los datos
    })
    .catch(error => console.error('Error:', error));
};

const editarUsuario = (usuario, tipoUsuario, nombre) => {
    $('#editarUsuarioModal').modal('show');
    document.getElementById('editarUsuario').value = usuario;
    document.getElementById('editarTipoUsuario').value = tipoUsuario;
    document.getElementById('editarNombre').value = nombre;
};

const actualizarUsuario = (event) => {
    event.preventDefault();

    const usuario = document.getElementById('editarUsuario').value;
    const tipoUsuario = document.getElementById('editarTipoUsuario').value;
    const nombre = document.getElementById('editarNombre').value;
    const password = document.getElementById('editarPassword').value;

    fetch('http://127.0.0.1:5000/editar_usuario', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, nombre, password, tipo_usuario: tipoUsuario })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        $('#editarUsuarioModal').modal('hide');
        cargarUsuarios();
    })
    .catch(error => console.error('Error:', error));
};

const eliminarUsuario = (usuario, tipoUsuario) => {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        fetch('http://127.0.0.1:5000/eliminar_usuario', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, tipo_usuario: tipoUsuario })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            cargarUsuarios();
        })
        .catch(error => console.error('Error:', error));
    }
};

const verUsuario = (usuario, tipoUsuario) => {
    alert(`Detalles del usuario:\nUsuario: ${usuario}\nTipo de Usuario: ${tipoUsuario}`);
};
