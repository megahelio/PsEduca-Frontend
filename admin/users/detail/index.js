import { getPageLanguage, setPageLanguage } from "../../../lang/i18n.js";
import { createUser, deleteUser, getUserById, updateUser } from "../../../queries/users.js";
import { validateUser } from "../../../validators/user.js";

if(!sessionStorage.getItem('token') || sessionStorage.getItem('ROL') !== 'ADMIN_GLOBAL'){
    location.href = '../../../login/index.html';
}

const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const $listSections = $('.list-sections');
const $logInLink = $('#log-in-link');

const ROLS = ['ADMIN_GLOBAL','GESTOR_CATALOGO','USUARIO_PYP'];
if(sessionStorage.getItem('token') && sessionStorage.getItem('ROL')){
    const ROL = sessionStorage.getItem('ROL');
    if(!ROLS.includes(ROL)){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('ROL');
        location.reload();
    }

    const intranet_section = `
        <li class="list-item-with-children" id="list-item-with-children">
            <a href="javascript:void(0)" class="list-item-with-image">
                <span data-i18n="header.navbar.intranet">Intranet</span>
                <img src="../../../images/arrow_right_icon.svg" width="15px" class="rotate-90-deg inverted"/>
            </a>
            <ul class="sublist" id="sublist">
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../index.html" data-i18n="header.navbar.userManagement">Gestión usuarios</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="#" data-i18n="header.navbar.membersManagement">Gestión miembros</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'GESTOR_CATALOGO' ? '<li><a href="#" data-i18n="header.navbar.catalogManagement">Gestión catálogo</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="#" data-i18n="header.navbar.formationManagement">Gestión formación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="#" data-i18n="header.navbar.divulgationManagement">Gestión divulgación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'USUARIO_PYP' ? '<li><a href="#" data-i18n="header.navbar.pypManagement">Gestión PyP</a></li>' : ''}
            </ul>
        </li>`;
    $listSections.innerHTML += intranet_section;

    $logInLink.querySelector('span').textContent = 'Cerrar sesión';
    $logInLink.querySelector('span').dataset.i18n = 'header.logOut';

    $logInLink.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('ROL');
        location.reload();
    });
}

setPageLanguage();

const path = window.location.search;

const REGEX_PATH = /\?id=[0-9]+$/;

if (!REGEX_PATH.test(path)) {
    window.location.href = '../../../index.html'
}

async function loadUser(){
    const id = path.split('=')[1];

    if(id !== '0'){
        const user = await getUserById(id)
    
        const $errorMessage = $('#error-message-all')
        if (user.error) {
            $errorMessage.textContent = user.error;
            $errorMessage.classList.add('active');
            return;
        }

        $('#id').value = user.id;
        $('#name').value = user.fullName;
        $('#username').value = user.name;
        $('#role').value = user.role;
    }else{
        $('#password').required = true;
        $('#confirm-password').required = true;
        $('#delete-user-button').style.display = 'none';
    }
}

loadUser();

$('#button-menu').addEventListener('click', (e) => {
    $listSections.classList.toggle('active');
    e.stopPropagation();
});

document.addEventListener('matchMedia', () => {
    if (window.matchMedia('(max-width: 1050px)').matches) {
        $listSections.classList.remove('active');
    }
});

const $buttonPreview = $('#button-preview-uvigo-footer');
const $iconButtonPreview = $('#footer-icon-expanded-info')
const $textButtonPreview = $('#footer-text-button-preview');
const $expandedInfoUvigo = $('#footer-expanded-uvigo-info');

$buttonPreview.addEventListener('click', () => {
    $expandedInfoUvigo.classList.toggle('active');

    if ($expandedInfoUvigo.classList.contains('active')) {
        $textButtonPreview.textContent = 'Ver menos';
        $iconButtonPreview.style.transform = 'rotate(90deg)';
    }else{
        $textButtonPreview.textContent = 'Ver más';
        $iconButtonPreview.style.transform = 'rotate(0deg)';
    }
});

const $$listItemWithSubmenu = $$('.list-item-with-children');
const $$imgArrow = $$('.list-item-with-children img');


$$listItemWithSubmenu.forEach(el => {
    el.addEventListener('click', () => {
        if(window.matchMedia('(max-width: 1050px)').matches){
            el.querySelector('.sublist').classList.toggle('active');
            const $imgEl = el.querySelector('img')
            $imgEl.style.transform = $imgEl.style.transform === 'rotate(-90deg)' ? '' : 'rotate(-90deg)';
        }
    });
})

window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1050px)').matches) {
        $$('.sublist').forEach((el) => el.classList.remove('active'))
        $$('.list-item-with-children img').forEach(img => img.style.transform = '')
        $listSections.classList.remove('active');
    }
});

document.addEventListener('click', (e) => {
    if (window.matchMedia('(max-width: 1050px)').matches) {
        if (e.target !== $listSections && !$listSections.contains(e.target) && $listSections.classList.contains('active')) {
            $listSections.classList.toggle('active');
        }  
    }
});

const $$languageButtons = $$('.language-selector-button');

$$languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        $$languageButtons.forEach((button) => button.classList.remove('language-selected'));
        button.classList.add('language-selected');
    });
});

const $$buttonsLanguage = $$('.language-selector-button');

$$buttonsLanguage.forEach((button) => {
    button.addEventListener('click', () => {
        setPageLanguage(button.getAttribute('data-language'));
    });

    if (button.getAttribute('data-language') === getPageLanguage()) {
        button.classList.add('language-selected');
    }
});

const $form = $('#user-detail-form');

$form.addEventListener('submit', async (e) => {
    e.preventDefault();

    $('#error-message-all').classList.remove('active');
    $('#error-message-name').classList.remove('active');
    $('#error-message-username').classList.remove('active');
    $('#error-message-role').classList.remove('active');
    $('#error-message-password').classList.remove('active');
    $('#error-message-confirm-password').classList.remove('active');

    const id = $('#id').value;
    const fullname = $('#name').value;
    const username = $('#username').value;
    const role = $('#role').value;
    const password = $('#password').value;
    const confirmPassword = $('#confirm-password').value;

    const ERRORS = validateUser({id, fullname, username, role, password, confirmPassword}, id !== '');
    if (Object.keys(ERRORS).length > 0) {
        Object.keys(ERRORS).forEach((key) => {
            const $errorMessage = $(`#error-message-${key}`);
            $errorMessage.textContent = ERRORS[key];
            $errorMessage.classList.add('active');
        });
        return;
    }
    
    let response;
    if(id === '0'){
        response = await createUser({fullname, username, role, password});
    }else{
        response = await updateUser({id, fullname, username, role, password});
    }

    if(Object.keys(response).length === 0){
        location.href = '../index.html';
        return;
    }

    Object.keys(response).forEach((key) => {
        const $errorMessage = $(`#error-message-${key}`);
        $errorMessage.textContent = response[key];
        $errorMessage.classList.add('active');
    });
});

const $deleteUserButton = $('#delete-user-button');
$deleteUserButton.onclick = async (e) => {
    const id = $('#id').value;

    const response = await deleteUser(id);
    if(Object.keys(response).length === 0){
        location.href = '../index.html';
        return;
    }

    Object.keys(response).forEach((key) => {
        const $errorMessage = $(`#error-message-${key}`);
        $errorMessage.textContent = response[key];
        $errorMessage.classList.add('active');
    });
};
