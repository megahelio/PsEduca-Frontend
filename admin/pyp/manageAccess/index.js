import { getPageLanguage, setPageLanguage } from "../../../lang/i18n.js";
import { createFormation, deleteFormation, getFormationById, updateFormation } from "../../../queries/formations.js";
import { validateFormation } from "../../../validators/formation.js";
import config from "../../../config.js";
import { addPypAuth, createPyp, deletePyp, deletePypAuth, getPypAuth, getPypById, updatePyp } from "../../../queries/pyp.js";

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
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../members/index.html" data-i18n="header.navbar.membersManagement">Gestión miembros</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'GESTOR_CATALOGO' ? '<li><a href="../../catalog/index.html" data-i18n="header.navbar.catalogManagement">Gestión catálogo</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../formation/index.html" data-i18n="header.navbar.formationManagement">Gestión formación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../divulgation/index.html" data-i18n="header.navbar.divulgationManagement">Gestión divulgación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'USUARIO_PYP' ? '<li><a href="../index.html" data-i18n="header.navbar.pypManagement">Gestión PyP</a></li>' : ''}
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

function checkboxOnChange(e){
    const {userId, pypId} = e.target.dataset;
    const checked = e.target.checked;

    if(checked){
        addPypAuth({
            idUser: userId,
            idPyPItem: pypId
        });
    }else{
        deletePypAuth({
            idUser: userId,
            idPyPItem: pypId
        });
    }

    console.log(userId, pypId, checked);
}

function createTablePyp({ALL_PYP, ALL_USERS, currentPyPAuthorizations}){
    const $table = document.createElement('table');
    $table.classList.add('pyp-management-table');

    // Thead
    const $thead = document.createElement('thead');
    const $trHead = document.createElement('tr');
    const $thUsername = document.createElement('th');
    $thUsername.textContent = 'Nombre de usuario';
    $trHead.appendChild($thUsername);

    ALL_PYP.forEach(pyp => {
        const $thPyp = document.createElement('th');
        $thPyp.textContent = pyp.titlePyPItem;
        $trHead.appendChild($thPyp);
    });

    $thead.appendChild($trHead);

    // Tbody
    const $tbody = document.createElement('tbody');

    ALL_USERS.forEach(user => {
        const $tr = document.createElement('tr');
        $tr.dataset.userId = user.idUser;

        const $tdUsername = document.createElement('td');
        $tdUsername.textContent = user.userName;
        $tr.appendChild($tdUsername);

        ALL_PYP.forEach(pyp => {
            const $tdPyp = document.createElement('td');
            const $input = document.createElement('input');
            $input.type = 'checkbox';
            $input.classList.add('checkbox-input-auth');
            $input.dataset.userId = user.idUser;
            $input.dataset.pypId = pyp.idPyPItem;
            $input.addEventListener('change', checkboxOnChange);

            if(currentPyPAuthorizations.some(auth => auth.idPyPItem === pyp.idPyPItem && auth.idUser === user.idUser)){
                $input.checked = true;
            }

            $tdPyp.appendChild($input);
            $tr.appendChild($tdPyp);
        });

        $tbody.appendChild($tr);
    });

    $table.appendChild($thead);
    $table.appendChild($tbody);

    return $table;
}


async function loadAuth(){
    const response = await getPypAuth()

    const $errorMessage = $('#error-message-all')
    if (response.error) {
        $errorMessage.textContent = response.error;
        $errorMessage.classList.add('active');
        return;
    }

    const $table = createTablePyp(response);
    $('#pyp-table-access-container').appendChild($table);

    console.log(response);
}

loadAuth();

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

$$('.year-input').forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    });
});
