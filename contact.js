document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            email: form.email.value,
            celular: form.celular.value,
            mensaje: form.message.value
        };

        try {
            const response = await fetch("https://formspree.io/f/xaqaygej", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {  
                form.reset();

                window.location.href = "thanks.html";
            } else {
                alert("Error al enviar ❌");
            }

        } catch (error) {
            alert("Error de conexión ❌");
        }
    });

});