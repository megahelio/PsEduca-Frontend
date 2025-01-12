import config from "../config.js";
import { getPageLanguage, setPageLanguage } from "../lang/i18n.js";
import { getCatalog } from "../queries/catalog.js";
import { getMappedFormations } from "../queries/formations.js";

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
                <img src="../images/arrow_right_icon.svg" width="15px" class="rotate-90-deg inverted"/>
            </a>
            <ul class="sublist" id="sublist">
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../admin/users/index.html" data-i18n="header.navbar.userManagement">Gestión usuarios</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../admin/members/index.html" data-i18n="header.navbar.membersManagement">Gestión miembros</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'GESTOR_CATALOGO' ? '<li><a href="../admin/catalog/index.html" data-i18n="header.navbar.catalogManagement">Gestión catálogo</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../admin/formation/index.html" data-i18n="header.navbar.formationManagement">Gestión formación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../admin/divulgation/index.html" data-i18n="header.navbar.divulgationManagement">Gestión divulgación</a></li>' : ''}
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

let CATALOG_ITEMS = [];

function drawCatalogTable($tableContent, catalog){
    catalog.forEach((item) => {
        $tableContent.innerHTML += `
        <tr>
            <td>${item.acronym}</td>
            <td>${item.name}</td>
            <td>
                <a href="./resource/index.html?item=${item.id}">
                    <img src="../images/file_icon.svg" width="15px" class="icon-file"/>
                    <span data-i18n="catalog.see">Ver</span>
                </a>
            </td>
        </tr>`;
    });  
}


async function loadCatalog(){
    const $errorMessage = $('#error-message')
    const response = await getCatalog();

    if (response.error) {
        $errorMessage.textContent = response.error;
        $errorMessage.style.display = 'block';
        return;
    }

    CATALOG_ITEMS = response;

    let tags = new Set();

    const $tableContent = $('#table-catalog-content tbody');
    drawCatalogTable($tableContent, CATALOG_ITEMS);

    CATALOG_ITEMS.forEach((item) => {
        item.tags.forEach(tag => tags.add(tag));
    });

    const $selectTags = $('#selectTags')
    tags.forEach((tag) => {
        const $option = document.createElement('option');
        $option.value = tag;
        $option.textContent = tag;
        $selectTags.appendChild($option);
    });
}

loadCatalog();

$$('.input-number').forEach((input) => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 3);
    });
});

function applyFilters(){
    const edadAnhoMin = $('#edadAnhoMin').value || null;
    const edadAnhoMax = $('#edadAnhoMax').value || null;
    const selectArea = $('#selectArea').value || null;
    const selectFormat = $('#selectFormat').value || null;
    const selectTags = $('#selectTags').value || null;
    const selectTypeResource = $('#selectTypeResource').value || null;
    const selectApplication = $('#selectApplication').value || null;

    const ALL_APPLICATIONS = ['Individual', 'Colectiva']
    const ALL_TYPE_RESOURCES = ['Intervención', 'Evaluación']

    const checkAll = (arr, target) => target.every(v => arr?.includes(v));

    const filteredCatalog = CATALOG_ITEMS.filter((item) => {
        console.log(item.application, selectApplication, checkAll(item.application, ALL_APPLICATIONS))
        if(edadAnhoMin && item.edadAnhoMin > parseInt(edadAnhoMin)) return false;
        if(edadAnhoMax && item.edadAnhoMax < parseInt(edadAnhoMax)) return false;
        if(selectArea && !item.area.includes(selectArea)) return false;
        if(selectFormat && !item.format.includes(selectFormat)) return false;
        if(selectTags && !item.tags.includes(selectTags)) return false;
        if(selectTypeResource){
            if(selectTypeResource === 'AMBOS' && !checkAll(item.resourceType, ALL_TYPE_RESOURCES)){
                return false
            }

            if(selectTypeResource !== 'AMBOS' && !item.resourceType.includes(selectTypeResource)){
                return false
            }
        }

        if(selectApplication){
            if(selectApplication === 'AMBOS' && !checkAll(item.application, ALL_APPLICATIONS)){
                return false
            }
            if(selectApplication !== 'AMBOS' && !item.application.includes(selectApplication)){
                return false
            }
        }

        return true;
    });

    const $tableContent = $('#table-catalog-content tbody');
    $tableContent.innerHTML = '';
    drawCatalogTable($tableContent, filteredCatalog);
}


$$('.input-filter').forEach((input) => {
    input.addEventListener('input', () => {
        applyFilters();
    });
});