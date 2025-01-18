import { getPageLanguage, setPageLanguage } from "../../../lang/i18n.js";
import { createFormation, deleteFormation, getFormationById, updateFormation } from "../../../queries/formations.js";
import { validateFormation } from "../../../validators/formation.js";
import config from "../../../config.js";
import { addCatalog, deleteFile, deleteLink, editCatalog, getCatalogById, uploadFile } from "../../../queries/catalog.js";

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
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'GESTOR_CATALOGO' ? '<li><a href="../index.html" data-i18n="header.navbar.catalogManagement">Gestión catálogo</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../formation/index.html" data-i18n="header.navbar.formationManagement">Gestión formación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../divulgation/index.html" data-i18n="header.navbar.divulgationManagement">Gestión divulgación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'USUARIO_PYP' ? '<li><a href="../../pyp/index.html" data-i18n="header.navbar.pypManagement">Gestión PyP</a></li>' : ''}
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

function setMultipleSelectValues(select, values){
    Array.from(select.options).forEach(option => {
        if (values.includes(option.value)) {
            option.selected = true;
        }
    });
}

function createRelatedDocumentInput({id, name, link}, disabled = false){
    const container = document.createElement('div');
    container.classList.add('input-list');
    container.dataset.id = id;

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;
    nameInput.classList.add('year-input');
    nameInput.placeholder = 'Nombre';
    nameInput.dataset.field = 'name';
    nameInput.value = name;
    nameInput.disabled = disabled;

    const linkInput = document.createElement('input');
    linkInput.type = 'text';
    linkInput.required = true;
    linkInput.classList.add('year-input');
    linkInput.placeholder = 'Enlace';
    linkInput.dataset.field = 'link';
    linkInput.value = link;
    linkInput.disabled = disabled;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = removeClosestElement('.input-list');

    if(id !== '-1'){
        deleteButton.addEventListener('click', async () => {
            const response = await deleteLink({linkId: id, idResource: $('#id').value});
            if(response.error){
                console.log(response.error);
                return;
            }
        });
    }

    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../../../images/delete-icon.svg';
    deleteIcon.width = 15;

    deleteButton.appendChild(deleteIcon);
    container.appendChild(nameInput);
    container.appendChild(linkInput);
    container.appendChild(deleteButton);

    return container;
}

function createFileElement({id, name, url}){
    const fileElement = document.createElement('li');
    fileElement.classList.add('file-item');
    fileElement.dataset.id = id;

    const fileLink = document.createElement('a');
    fileLink.classList.add('file-link');
    fileLink.textContent = name;
    fileLink.href = url;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = removeClosestElement('.file-item');

    if(id !== '-1'){
        deleteButton.addEventListener('click', async () => {
            const response = await deleteFile({fileId: id, idResource: $('#id').value});
            if(response.error){
                console.log(response.error);
                return;
            }
        });
    }

    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../../../images/delete-icon.svg';
    deleteIcon.width = 15;

    deleteButton.appendChild(deleteIcon);
    fileElement.appendChild(fileLink);
    fileElement.appendChild(deleteButton);

    return fileElement;
}

async function loadResource(){
    const id = path.split('=')[1];

    if(id !== '0'){
        const resource = await getCatalogById(id)
    
        const $errorMessage = $('#error-message-all')
        if (resource.error) {
            $errorMessage.textContent = resource.error;
            $errorMessage.classList.add('active');
            return;
        }

        $('#id').value = resource.id;
        $('#name').value = resource.name;
        $('#acronym').value = resource.acronym;
        $('#authors').value = resource.authors;
        $('#edadAnhoMin').value = resource.edadAnhoMin;
        $('#edadMesMin').value = resource.edadMesMin;
        $('#edadAnhoMax').value = resource.edadAnhoMax;
        $('#edadMesMax').value = resource.edadMesMax;
        $('#duration').value = resource.time;
        setMultipleSelectValues($('#area'), resource.area);
        setMultipleSelectValues($('#application'), resource.application);
        setMultipleSelectValues($('#resourceType'), resource.resourceType);
        setMultipleSelectValues($('#format'), resource.format);

        $('#tags').value = resource.tags.join(", ")
        $('#description').value = resource.description
        $('#observations').value = resource.observations

        resource.relatedDocuments.forEach(({id, name, link}) => {
            const newRelatedDocument = createRelatedDocumentInput({id, name, link}, true);
            $('#related-documents-container').appendChild(newRelatedDocument);
        });

        resource.files.forEach(({id, name, link}) => {
            const newFileElement = createFileElement({id, name, url: link});
            $('#list-files').appendChild(newFileElement);
        });
        
        $('#image-preview').src = resource.image;
    }else{
        $('#related-documents').style.display = 'none';
        $('#files-resource').style.display = 'none';
        $('#image-preview').style.display = 'none';
        $('#delete-catalog-button').style.display = 'none';
    }
}

loadResource();

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

function readRelatedDocumentsInputs(){
    const relatedDocuments = [];
    $$('.input-list').forEach((inputList) => {
        const id = inputList.dataset.id;
        const name = inputList.querySelector('input[data-field="name"]').value;
        const link = inputList.querySelector('input[data-field="link"]').value;

        if(name && link){
            relatedDocuments.push({id, name, link});
        }
    });

    return relatedDocuments;
}

const $form = $('#catalog-detail-form');

$form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const INPUT_NAME_TAGS = ['all', 'name', 'acronym', 'authors', 'edadAnhoMin', 'edadMesMin', 'edadAnhoMax', 'edadMesMax', 'duration', 'area', 'application', 'resourceType', 'format', 'tags', 'description', 'observations', 'image'];

    INPUT_NAME_TAGS.forEach((tag) => {
        console.log(tag);
        $(`#error-message-${tag}`).classList.remove('active');
    });

    const id = $('#id').value;
    const name = $('#name').value;
    const acronym = $('#acronym').value;
    const authors = $('#authors').value;
    const edadAnhoMin = $('#edadAnhoMin').value;
    const edadMesMin = $('#edadMesMin').value;
    const edadAnhoMax = $('#edadAnhoMax').value;
    const edadMesMax = $('#edadMesMax').value;
    const duration = $('#duration').value;
    const area = Array.from($('#area').selectedOptions).map(option => option.value);
    const application = Array.from($('#application').selectedOptions).map(option => option.value);
    const resourceType = Array.from($('#resourceType').selectedOptions).map(option => option.value);
    const format = Array.from($('#format').selectedOptions).map(option => option.value);
    const tags = $('#tags').value.split(',').map(tag => tag.trim());
    const description = $('#description').value;
    const observations = $('#observations').value;
    const relatedDocuments = readRelatedDocumentsInputs();
    const image = {
        name: $('#image').value,
        file: $('#image').files[0] || null
    };

    let response;
    if(id === ''){
        response = await addCatalog({acronym, name, edadAnhoMin, edadMesMin, edadAnhoMax, edadMesMax, image: image.file, authors, time: duration, description, observations, area, tags, resourceType, format, application});
    }else{
        response = await editCatalog({id, acronym, name, edadAnhoMin, edadMesMin, edadAnhoMax, edadMesMax, image: image.file, authors, time: duration, description, observations, area, tags, resourceType, format, application, links: relatedDocuments.filter(({id, name, link}) => id === '-1' && name && link)});
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

const $deleteCatalogButton = $('#delete-catalog-button');
$deleteCatalogButton.onclick = async (e) => {
    const id = $('#id').value;

    const response = await deleteFormation(id);
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

const removeClosestElement = (tagName) => (event) => {
    event.preventDefault();
    event.target.closest(tagName).remove();
}

$('#add-related-document-button').addEventListener('click', (e) => {
    e.preventDefault();

    const newRelatedDocument = createRelatedDocumentInput({id: '-1', name: '', link: ''});
    $('#related-documents-container').appendChild(newRelatedDocument);
});

$('#newDocument').addEventListener('change', (e) => {
    $('#newDocument-input-span').textContent = e.target.files[0]?.name || '';
});

$('#add-new-document-button').addEventListener('click', (e) => {
    e.preventDefault();
    const file = $('#newDocument').files[0] || null;
    const fileName = $('#newDocumentName').value;

    if(!file || !fileName){
        console.log('Error');
        return;
    }

    const newDocument = createFileElement({id: '-1', name: fileName, url: 'javascript:void(0)'});
    $('#list-files').appendChild(newDocument);

    $('#newDocument').value = '';
    $('#newDocumentName').value = '';
    $('#newDocument-input-span').textContent = '';

    const fileData = {
        name: fileName,
        file: file,
        idResource: $('#id').value
    }
    uploadFile(fileData);
});
