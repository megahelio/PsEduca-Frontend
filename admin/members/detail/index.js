import { getPageLanguage, setPageLanguage } from "../../../lang/i18n.js";
import { createMember, deleteMember, getMemberById, updateMember } from "../../../queries/members.js";
import { validateMember } from "../../../validators/member.js";
import config from "../../../config.js";

if(!sessionStorage.getItem('token') || sessionStorage.getItem('ROL') !== 'ADMIN_GLOBAL'){
    location.href = '../../../login/index.html';
}

const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const $listSections = $('.list-sections');
const $logInLink = $('#log-in-link');

const ROLS = ['ADMIN_GLOBAL','GESTOR_CATALOGO','USUARIO_PYP'];
const SERVER_URL = config.SERVER_URL;
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
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../users/index.html" data-i18n="header.navbar.userManagement">Gestión usuarios</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../index.html" data-i18n="header.navbar.membersManagement">Gestión miembros</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'GESTOR_CATALOGO' ? '<li><a href="../../catalog/index.html" data-i18n="header.navbar.catalogManagement">Gestión catálogo</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../formation/index.html" data-i18n="header.navbar.formationManagement">Gestión formación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../divulgation/index.html" data-i18n="header.navbar.divulgationManagement">Gestión divulgación</a></li>' : ''}
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

async function loadMember(){
    const id = path.split('=')[1];

    if(id !== '0'){
        const member = await getMemberById(id)
    
        const $errorMessage = $('#error-message-all')
        if (member.error) {
            $errorMessage.textContent = member.error;
            $errorMessage.classList.add('active');
            return;
        }

        $('#id').value = member.id;
        $('#name').value = member.name;
        $('#email').value = member.email;
        $('#link').value = member.link;
        $('#image-preview').src = SERVER_URL+member.image;
        $('#description').value = member.description;
    }else{
        $('#image-preview').style.display = 'none';
        $('#delete-member-button').style.display = 'none';
    }
}

loadMember();

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

const $form = $('#member-detail-form');

$form.addEventListener('submit', async (e) => {
    e.preventDefault();

    $('#error-message-all').classList.remove('active');
    $('#error-message-name').classList.remove('active');
    $('#error-message-email').classList.remove('active');
    $('#error-message-link').classList.remove('active');
    $('#error-message-description').classList.remove('active');
    $('#error-message-image').classList.remove('active');

    const id = $('#id').value;
    const name = $('#name').value;
    const email = $('#email').value;
    const link = $('#link').value;
    const description = $('#description').value;
    const image = {
        name: $('#image').value,
        file: $('#image').files[0] || null
    };
    
    const ERRORS = validateMember({id, name, email, link, description, image}, id !== '');
    if (Object.keys(ERRORS).length > 0) {
        Object.keys(ERRORS).forEach((key) => {
            const $errorMessage = $(`#error-message-${key}`);
            $errorMessage.textContent = ERRORS[key];
            $errorMessage.classList.add('active');
        });
        return;
    }
    
    let response;
    if(id === ''){
        response = await createMember({name, email, link, description, image});
    }else{
        response = await updateMember({id, name, email, link, description, image});
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

const $deleteUserButton = $('#delete-member-button');
$deleteUserButton.onclick = async (e) => {
    const id = $('#id').value;

    const response = await deleteMember(id);
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

$('#image').addEventListener('change', (e) => {
    const file = e.target.files[0] || null;

    if(!file){
        return;
    }

    $('#image-input-span').textContent = file.name;
    const reader = new FileReader();

    reader.onload = function (e) {
        $('#image-preview').src = e.target.result;
        $('#image-preview').style.display = 'block';
    }

    reader.readAsDataURL(file);
});