const apiUrl = 'https://ny3.blynk.cloud/external/api/get?token=Ew4eSuV79KiG1WG_gv8Swg3YxnG90h1c&v0&v1&v2&v3&v128&v129';
const datos = ['led','infrarrojo','luz','temperatura','potenciometro','distancia']
        // Obtener el elemento div donde mostraremos los datos
        const apiDataElement = document.getElementById('apiData');

        // Realizar la solicitud a la API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Iterar sobre los datos y construir el HTML
                let html = '';
                let num = 0;
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        let info = datos[num];
                        //html += `<label for="${info}">${info}:</label><input type="number" id="${info}" name="${info}" required><br><br>`;
                        html += `<p>${info} (${key}) = ${data[key]}</p>`;
                        num = num +1;
                        console.log('hola');
                    }
                }
                // Mostrar el HTML generado en el elemento div
                apiDataElement.innerHTML = html;
            })
            .catch(error => {
                console.error('Error al obtener datos de la API:', error);
            });

function cargarDatos() {
    fetch('https://ny3.blynk.cloud/external/api/get?token=Ew4eSuV79KiG1WG_gv8Swg3YxnG90h1c&v0&v1&v2&v3&v128&v129')
        .then(response => response.json())
        .then(data => {
            document.getElementById('led').value = data.v0;
            document.getElementById('luz').value = data.v1;
            document.getElementById('temperatura').value = data.v2;
            document.getElementById('potenciometro').value = data.v3;
            document.getElementById('infrarrojo').value = data.v128;
            document.getElementById('distancia').value = data.v129;
            document.getElementById('dataForm').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al obtener datos del API:', error);
        });
}