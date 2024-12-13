import config from "../config.js";
import { getPageLanguage, setPageLanguage } from "../lang/i18n.js";
import { getMappedFormations } from "../queries/formations.js";
import config from "../config.js";

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
                ${ROL === 'ADMIN_GLOBAL' || ROL === 'GESTOR_CATALOGO' ? '<li><a href="#" data-i18n="header.navbar.catalogManagement">Gestión catálogo</a></li>' : ''}
                ${ROL === 'ADMIN_GLOBAL' ? '<li><a href="../admin/formation/index.html" data-i18n="header.navbar.formationManagement">Gestión formación</a></li>' : ''}
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

let formations = {};
let formationPageCounter = {
    'MASTER_actual': {
        shown: 0,
        total: 0
    },
    'DOCTORADO_actual': {
        shown: 0,
        total: 0
    },
    'CURSO_actual': {
        shown: 0,
        total: 0
    },
    'MASTER_past': {
        shown: 0,
        total: 0
    },
    'DOCTORADO_past': {
        shown: 0,
        total: 0
    },
    'CURSO_past': {
        shown: 0,
        total: 0
    }
};

function addFormationsToDOM(date, type, formationList){
    const $list = $(`#${date}-${type.toLowerCase()}-list`);
    const counterKey = `${type.toUpperCase()}_${date}`;

    formationList.forEach(formation => {
        formationPageCounter[counterKey].total++;
        if(formationPageCounter[counterKey].shown >= 2){
            return;
        }

        $list.innerHTML += `
        <li>
            <a href="${formation.link}" target="_blank">
                <div class="image-formation-item-container">
                    <img src="${SERVER_URL}${formation.image}" alt="${formation.title}">
                </div>
                <div class="info-formation-item-container">
                    <h4>${formation.title}</h4>
                    <p>${formation.description}</p>
                </div>
            </a>
        </li>
        `;

        formationPageCounter[counterKey].shown++;
    });
}

async function loadFormations(){
    const $errorMessage = $('#error-message')
    const response = await getMappedFormations();

    if (response.error) {
        $errorMessage.textContent = response.error;
        $errorMessage.style.display = 'block';
        return;
    }

    formations = response;

    for(const [date, formation] of Object.entries(response)){
        for(const [type, formationList] of Object.entries(formation)){
            addFormationsToDOM(date, type, formationList);
        }
    }
}

loadFormations().then(() => {
    const $$buttonSlider = $$('.button-slider');

    $$buttonSlider.forEach((button, index) => {
        const { date, type, direction } = button.dataset;
        const counterKey = `${type.toUpperCase()}_${date}`;
        const $list = $(`#${date}-${type.toLowerCase()}-list`);


        if (direction === 'left') {
            button.disabled = true;
        }

        if(direction === 'right' && (formationPageCounter[counterKey].shown < 2 || formationPageCounter[counterKey].total <= 2)){
            button.disabled = true;
        }

        button.addEventListener('click', () => {
            const shown = formationPageCounter[counterKey].shown;

            if(direction === 'left'){
                $list.innerHTML = '';
                Object.values(formations[date][type.toUpperCase()]).slice(shown-4, shown-2).forEach(formation => {
                    $list.innerHTML += `
                    <li>
                        <a href="${formation.link}" target="_blank">
                            <div class="image-formation-item-container">
                                <img src="${SERVER_URL}${formation.image}" alt="${formation.title}">
                            </div>
                            <div class="info-formation-item-container">
                                <h4>${formation.title}</h4>
                                <p>${formation.description}</p>
                            </div>
                        </a>
                    </li>
                    `;
                });

                formationPageCounter[counterKey].shown -= 2;
                if(formationPageCounter[counterKey].shown <= 2){
                    button.disabled = true;
                }

                const $buttonRight = $$buttonSlider[index+1];
                $buttonRight.disabled = false;
            }else{
                $list.innerHTML = '';
                Object.values(formations[date][type.toUpperCase()]).slice(shown, shown+2).forEach(formation => {
                    $list.innerHTML += `
                    <li>
                        <a href="${formation.link}" target="_blank">
                            <div class="image-formation-item-container">
                                <img src="${SERVER_URL}${formation.image}" alt="${formation.title}">
                            </div>
                            <div class="info-formation-item-container">
                                <h4>${formation.title}</h4>
                                <p>${formation.description}</p>
                            </div>
                        </a>
                    </li>
                    `;
                });

                formationPageCounter[counterKey].shown += 2;
                if(formationPageCounter[counterKey].shown >= formationPageCounter[counterKey].total){
                    button.disabled = true;
                }

                const $buttonLeft = $$buttonSlider[index-1];
                $buttonLeft.disabled = false;
            }
        });
    });

});