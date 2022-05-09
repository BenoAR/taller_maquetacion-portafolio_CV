/* ********** Menu ********** */

((d) => {
    const $btnMenu = d.querySelector(".menu-btn"), //se guarda en la variable al elemento seleccionado con la clase .menu-btn
        $menu = d.querySelector(".menu"); //se guarda en la variable al elemento seleccionado con la clase .menu

    $btnMenu.addEventListener("click", (e) => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    }) //con el evento click se intercambiara en la lista de clases la clase .none

    //tecnica de delegacion de eventos
    d.addEventListener("click", (e) => {
        if (!e.target.matches(".menu a")) return false;
        //si el elemento que genero el evento no es un enlce dentro del menu entonces retorna falso

        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
        // de lo contrario al primer hijo quita la clase none, al ultimo agregale la clase y al meni quit ala clase is-active

    })

})(document); //funcion anonima autoejecutable

/* ********** ContactForm ********** */
((d) => {
    const $form = d.querySelector(".contact-form"),
        $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/ce18f806c5a91ce17ba393afe594cef4", {
                method: "POST",
                body: new FormData(e.target)
            })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                console.log(json);
                location.hash = "#gracias" //agregar hashtag a url de web
                $form.reset();
            })
            .catch(err => {
                console.log(err);
                let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
                $response.querySelector(
                    "h3"
                ).innerHTML = `Error ${err.status}: ${message}`;
            }).finally(() => {
                $loader.classList.add("none");
                setTimeout(() => {
                    location.hash = "#close";
                }, 3000);
            });
    });
})(document);