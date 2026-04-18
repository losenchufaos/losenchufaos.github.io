document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const product = document.getElementById('product').value;
            const message = document.getElementById('message').value;

            const submitBtn = orderForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i> Enviando...';
            submitBtn.disabled = true;

            try {
                const ACCESS_KEY = "fc7a40aa-db2d-4740-a963-2ae726e2ecd3";

                if (ACCESS_KEY === "PEGA_TU_ACCESS_KEY_AQUI") {
                    alert("Aviso para el programador: Debes configurar tu Access Key en index.js");
                }

                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        access_key: ACCESS_KEY,
                        subject: `Nuevo pedido web: ${product}`,
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
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

const style = document.createElement('style');
style.innerHTML = `
@keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
