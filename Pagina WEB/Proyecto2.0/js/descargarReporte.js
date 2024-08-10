document.addEventListener('DOMContentLoaded', function() {
    const descargarReporteBtn = document.getElementById('descargarReporteBtn');
    const descargarPDFBtn = document.getElementById('descargarPDFBtn');
    const descargarExcelBtn = document.getElementById('descargarExcelBtn');
    const descargarReporteModal = new bootstrap.Modal(document.getElementById('descargarReporteModal'));

    descargarReporteBtn.addEventListener('click', function() {
        descargarReporteModal.show();
    });

    function descargarReporte(formato) {
        const filtroNombre = document.getElementById('filtroNombre').value;
        const filtroUsuario = document.getElementById('filtroUsuario').value;
        const filtroFecha = document.getElementById('filtroFecha').value;

        fetch('http://127.0.0.1:5000/descargar_reporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: filtroNombre,
                usuario: filtroUsuario,
                fecha: filtroFecha,
                formato: formato
            })
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reporte.${formato === 'PDF' ? 'pdf' : 'xlsx'}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
    }

    descargarPDFBtn.addEventListener('click', function() {
        descargarReporte('PDF');
    });

    descargarExcelBtn.addEventListener('click', function() {
        descargarReporte('Excel');
    });
});
