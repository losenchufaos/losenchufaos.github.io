document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitamos que la página se recargue

            // Obtenemos los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value; // Nuevo campo
            const product = document.getElementById('product').value;
            const message = document.getElementById('message').value;

            // Cambiamos el botón visualmente mientras carga
            const submitBtn = orderForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i> Enviando...';
            submitBtn.disabled = true;

            try {
                // Usamos Web3Forms como mediador gratuito (no abre la app de correo local).
                // PASO 1: Entra a https://web3forms.com/ y pon el correo de tu tienda.
                // PASO 2: Te llegará un correo con una "Access Key" (una clave larga).
                // PASO 3: Copia y pega esa clave justo en la variable de abajo:
                const ACCESS_KEY = "fc7a40aa-db2d-4740-a963-2ae726e2ecd3";

                // Si no has puesto tu clave aún, mandamos una alerta preventiva
                if (ACCESS_KEY === "PEGA_TU_ACCESS_KEY_AQUI") {
                    alert("Aviso para el programador: Debes configurar tu Access Key en index.js");
                }

                // Enviamos los datos usando Javascript
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        access_key: ACCESS_KEY,
                        subject: `Nuevo pedido web: ${product}`, // Asunto del correo
                        Nombre: name,
                        Correo_del_Cliente: email,
                        Producto_o_Servicio: product,
                        Mensaje_y_Detalles: message
                    })
                });

                const result = await response.json();

                if (response.status === 200) {
                    alert('¡Tu pedido ha sido enviado con éxito! Nos pondremos en contacto contigo pronto.');
                    orderForm.reset();
                } else {
                    alert('Hubo un problema al enviar tu pedido. Por favor intenta más tarde.');
                    console.error(result);
                }
            } catch (error) {
                alert('Error de conexión. Revisa tu internet e inténtalo de nuevo.');
                console.error(error);
            } finally {
                // Restauramos el botón a la normalidad
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Animación simple para el icono de carga
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
