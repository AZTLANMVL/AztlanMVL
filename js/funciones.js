/* =============================== */
/* LIMPIAR URL DE FACEBOOK */
/* =============================== */

// Este código elimina el parámetro fbclid que Facebook agrega a veces en la URL
if (window.location.search.indexOf("fbclid=") !== -1) {

    // Tomamos la URL actual de la página
    var url = new URL(window.location.href);

    // Eliminamos solamente el parámetro fbclid
    url.searchParams.delete("fbclid");

    // Actualizamos la URL sin recargar la página
    window.history.replaceState(
        {},
        document.title,
        url.pathname + url.search + url.hash
    );
}

/* =============================== */
/* TARJETAS DEL CATÁLOGO */
/* =============================== */

// Esperamos a que cargue toda la página
document.addEventListener("DOMContentLoaded", function () {

    // Guardamos todas las cajas del catálogo
    var cajas = document.querySelectorAll(".caja-andamio");

    // Recorremos cada caja
    cajas.forEach(function (caja) {

        // Cuando se haga click en una caja
        caja.addEventListener("click", function () {

            // Primero cerramos todas las cajas menos la actual
            cajas.forEach(function (otraCaja) {

                // Si no es la caja que acabamos de tocar
                if (otraCaja != caja) {

                    // Buscamos si tiene información extra abierta
                    var infoAbierta = otraCaja.querySelector(".info-extra");

                    // Si tiene información abierta, la quitamos
                    if (infoAbierta) {
                        infoAbierta.remove();
                    }

                    // Quitamos la clase activo
                    otraCaja.classList.remove("activo");
                }

            });

            // Revisamos si la caja actual ya está abierta
            var infoActual = caja.querySelector(".info-extra");

            // Si ya está abierta, la cerramos
            if (infoActual) {
                infoActual.remove();
                caja.classList.remove("activo");
            }

            // Si no está abierta, la abrimos
            else {

                // Creamos el cuadro negro de información
                var nuevaInfo = document.createElement("div");

                // Le damos la clase para el diseño
                nuevaInfo.className = "info-extra";

                // Tomamos el texto guardado en data-info
                var textoInfo = caja.getAttribute("data-info");

                // Agregamos la información al cuadro negro
                nuevaInfo.innerHTML =
                    "<strong>Información:</strong><br>" +
                    textoInfo;

                // Activamos la caja seleccionada
                caja.classList.add("activo");

                // Agregamos la información solamente a la caja seleccionada
                caja.appendChild(nuevaInfo);
            }

        });

    });

});