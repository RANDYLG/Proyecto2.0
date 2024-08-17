document.addEventListener('DOMContentLoaded', () => {
    const descargarReporteBtn = document.getElementById('descargarReporteBtn');
    const descargarPDFBtn = document.getElementById('descargarPDFBtn');
    const descargarExcelBtn = document.getElementById('descargarExcelBtn');
    const descargarReporteModal = new bootstrap.Modal(document.getElementById('descargarReporteModal'));
    const filtroNombre = document.getElementById('filtroNombre');
    const filtroUsuario = document.getElementById('filtroUsuario');
    const filtroTipoUsuario = document.getElementById('filtroTipoUsuario');
    const resultadosEncontrados = document.getElementById('resultadosEncontrados');

    descargarReporteBtn.addEventListener('click', () => {
        descargarReporteModal.show();
    });

    function descargarReporte(formato) {
        const nombre = filtroNombre.value;
        const usuario = filtroUsuario.value;
        const tipoUsuario = filtroTipoUsuario.value;

        fetch('http://127.0.0.1:5000/generar_reporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                usuario: usuario,
                tipo_usuario: tipoUsuario,
                formato: formato
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.resultados === 0) {
                console.log("No se encontraron resultados.");
                resultadosEncontrados.textContent = "0";
                return;
            }

            resultadosEncontrados.textContent = data.resultados;

            if (data.archivo_base64) {
                const link = document.createElement('a');
                link.href = `data:application/${formato.toLowerCase()};base64,${data.archivo_base64}`;
                link.download = `reporte.${formato.toLowerCase()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                console.log("Archivo descargado exitosamente.");
            } else {
                console.log("No se encontraron resultados o hubo un error al generar el archivo.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultadosEncontrados.textContent = "Error al buscar resultados";
        });
    }

    descargarPDFBtn.addEventListener('click', () => {
        descargarReporte('PDF');
    });

    descargarExcelBtn.addEventListener('click', () => {
        descargarReporte('Excel');
    });
});
