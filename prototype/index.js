const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const $listSections = $('.list-sections');

$('#button-menu').addEventListener('click', () => {
    $listSections.classList.toggle('active');
});

document.addEventListener('matchMedia', () => {
    if (window.matchMedia('(min-width: 1050px)').matches) {
        $listSections.classList.add('active');
    }

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