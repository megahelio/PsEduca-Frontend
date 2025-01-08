import { getPageLanguage, setPageLanguage } from "../../../lang/i18n.js";
import config from "../../../config.js";
import { createDivulgation, deleteDivulgation, getDivulgationById, updateDivulgation } from "../../../queries/divulgations.js";
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Font,
    Heading, BlockQuote, Link, List, TodoList, Indent, IndentBlock, Base64UploadAdapter,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle, ImageResize,
    ImageUpload
} from 'ckeditor5';
import { validateDivulgation } from "../../../validators/divulgation.js";

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
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'GESTOR_CATALOGO' ? '<li><a href="#" data-i18n="header.navbar.catalogManagement">Gestión catálogo</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../../formation/index.html" data-i18n="header.navbar.formationManagement">Gestión formación</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../index.html" data-i18n="header.navbar.divulgationManagement">Gestión divulgación</a></li>' : ''}
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

function createEditor(lang, content){
    ClassicEditor
    .create( document.querySelector( '#content' ), {
        language: lang,
        licenseKey: 'GPL',
        plugins: [ Essentials, Paragraph, Bold, Italic, Underline, Font, Heading, BlockQuote,
                    Link, List, TodoList, Indent, IndentBlock, Image,
                    ImageToolbar,
                    ImageCaption,
                    ImageStyle, ImageResize,
                    ImageUpload,
                    Base64UploadAdapter ],
        toolbar: [
            'undo', 'redo',
            '|',
            'heading',
            '|',
            'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
            '|',
            'bold', 'italic', 'underline',
            '|',
            'link', 'blockQuote', 'imageUpload',
            '|',
            'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
        ],
        image: {
            toolbar: [
                'imageTextAlternative', '|',
                'imageStyle:alignBlockLeft', 'imageStyle:alignCenter', 'imageStyle:alignBlockRight', '|',
                'imageStyle:alignLeft', 'imageStyle:alignRight',
            ],
        },
        simpleUpload: {
            uploadUrl: 'data:image/png;base64,'
        },
        shouldNotGroupWhenFull: true,
        licenseKey: 'GPL',
        initialData: content
    } )
    .then( editor => {
        window.editor = editor;
    } )
    .catch( error => {
        console.error( error );
    } );
}

async function loadDivulgation(){
    
    const id = path.split('=')[1];
    const lang = getPageLanguage();

    if(id !== '0'){
        const divulgation = await getDivulgationById(id)
    
        const $errorMessage = $('#error-message-all')
        if (divulgation.error) {
            $errorMessage.textContent = divulgation.error;
            $errorMessage.classList.add('active');
            return;
        }

        $('#id').value = divulgation.id;
        $('#title').value = divulgation.title;
        $('#link').value = divulgation.link;
        $('#description').value = divulgation.description;
        $('#image-preview').src = divulgation.image;
        $('#type').value = divulgation.type;

        createEditor(lang, divulgation.content);    
    }else{
        createEditor(lang, '');
        $('#image-preview').style.display = 'none';
        $('#delete-divulgation-button').style.display = 'none';
    }
}

loadDivulgation();

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

const $form = $('#divulgation-detail-form');

$form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    $('#error-message-all').classList.remove('active');
    $('#error-message-title').classList.remove('active');
    $('#error-message-link').classList.remove('active');
    $('#error-message-image').classList.remove('active');
    $('#error-message-content').classList.remove('active');
    $('#error-message-description').classList.remove('active');
    $('#error-message-file').classList.remove('active');
    $('#error-message-type').classList.remove('active');
    
    const id = $('#id').value;
    const title = $('#title').value;
    const link = $('#link').value;
    const description = $('#description').value;
    const image = {
        name: $('#image').value,
        file: $('#image').files[0] || null
    };
    const type = $('#type').value;
    const file = {
        name: $('#file').value,
        file: $('#file').files[0] || null
    };
    const content = window.editor.getData()

    const ERRORS = validateDivulgation({id, title, description, type, content, link, image, file}, id !== '');
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
        response = await createDivulgation({ title, description, type, content, link, image, file });
    }else{
        response = await updateDivulgation({id, title, description, type, content, link, image, file});
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

const $deleteUserButton = $('#delete-divulgation-button');
$deleteUserButton.onclick = async (e) => {
    const id = $('#id').value;

    const response = await deleteDivulgation(id);
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