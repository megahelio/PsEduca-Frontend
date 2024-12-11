function loadNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.innerHTML = `
            <a href="./contact.html">Contacto Tests</a>
            <a href="./usuario.html">Usuario Tests</a>
            <a href="./login.html">Login Tests</a>
            <a href="./member.html">Miembro Tests</a>
            <a href="./formation.html">Formación Tests</a>
        `;
    } else {
        console.error('id="navbardiv" no encontrado.');
    }
}
function loadIntro() {
    const navbar = document.getElementById('common');
    if (navbar) {
        navbar.innerHTML = `
            <h1 class="center-text">Test de validación de formularios</h1>
            <p>True :: El test detecta errores para el valor introducido.</p>
            <p>False :: El test NO detecta errores para el valor introducido (Por lo tanto el valor introducido es válido)</p>
        `;
    } else {
        console.error('id="navbardiv" no encontrado.');
    }
}

function loadCommonTest() {
    loadNavbar();
    loadIntro();
}
window.onload = loadCommonTest;