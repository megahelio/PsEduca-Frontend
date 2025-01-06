import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getDivulgations() {
    const DIVULGATIONS = [
        {
            id: 1,
            title: 'Divulgación 1',
            description: 'Descripción de la divulgación 1 un poco más larga para ver cómo se ve en la página web',
            content: 'Contenido de la divulgación 1',
            link: null,
            image: '/images/facultad_comprimido.jpg',
            creationDate: '2021-01-01'
        },
        {
            id: 2,
            title: 'Divulgación 2',
            description: 'Descripción de la divulgación 2 un poco más larga para ver cómo se ve en la página web',
            content: 'Contenido de la divulgación 2',
            link: 'https://www.google.com',
            image: '/images/grupo_investigacion.jpg',
            creationDate: '2021-01-01'
        },
        {
            id: 3,
            title: 'Divulgación 3',
            description: 'Descripción de la divulgación 3 un poco más larga para ver cómo se ve en la página web',
            content: 'Contenido de la divulgación 3',
            link: 'https://www.google.com',
            image: '/images/proyecto_investigacion.jpg',
            creationDate: '2021-01-01'
        },
        {
            id: 4,
            title: '¿Qué es la Psicología?',
            description: 'Descubre los fundamentos de la psicología, sus principales ramas y su importancia para el bienestar individual y colectivo.',
            content: '<section><p>La psicología es la ciencia que estudia la mente y el comportamiento humano. A través de la observación, la investigación y el análisis, busca entender cómo pensamos, sentimos y actuamos en diferentes contextos.</p></section><section><h2>Ramas de la Psicología</h2><p>Existen diversas ramas de la psicología, entre las más conocidas se encuentran:</p><ul>    <li><strong>Psicología clínica:</strong> Enfocada en el diagnóstico y tratamiento de trastornos mentales.</li>    <li><strong>Psicología educativa:</strong> Centrada en los procesos de aprendizaje y enseñanza.</li>    <li><strong>Psicología organizacional:</strong> Se ocupa del comportamiento en entornos laborales.</li></ul></section><section><h2>Importancia de la Psicología</h2><p>La psicología nos ayuda a mejorar nuestra calidad de vida al proporcionar herramientas para manejar el estrés, mejorar nuestras relaciones y tomar decisiones informadas. Además, contribuye al desarrollo de comunidades más saludables y resilientes.</p></section><section><h2>Conclusión</h2><p>Comprender los principios básicos de la psicología nos permite tener una visión más profunda de nosotros mismos y de los demás. Es una disciplina esencial para promover el bienestar individual y colectivo.</p></section>',
            link: null,
            image: '/images/facultad_comprimido.jpg',
            creationDate: '2021-01-01'
        }
    ];

    const FRONTEND_URL = 'http://localhost:5500'; //TODO: change this for the Server URL
    return DIVULGATIONS.map(divulgation => ({
        id: divulgation.id,
        title: divulgation.title,
        description: divulgation.description,
        content: divulgation.content,
        link: divulgation.link,
        image: divulgation.image ? FRONTEND_URL + divulgation.image: null,
        creationDate: divulgation.creationDate
    }));

    /* const response = await fetch(`${SERVER_URL}?controller=formation&action=list`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    if(!response.ok){
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }

    const { ok, code, resource } = await response.json();

    if(!ok){
        return {
            error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
        }
    }

    return resource.map(formation => ({
        id: formation.id,
        title: formation.title,
        description: formation.description,
        type: formation.type,
        link: formation.referenceURL,
        image: formation.imageURL,
        startYear: formation.initYear,
        endYear: formation.endYear
    })); */
}

export async function getDivulgationById(id) {
    
    const FRONTEND_URL = 'http://localhost:5500'; //TODO: change this for the Server URL
    const DIVULGATION = {
        id: 1,
        title: '¿Qué es la Psicología?',
        description: 'Descubre los fundamentos de la psicología, sus principales ramas y su importancia para el bienestar individual y colectivo.',
        content: '<section><p>La psicología es la ciencia que estudia la mente y el comportamiento humano. A través de la observación, la investigación y el análisis, busca entender cómo pensamos, sentimos y actuamos en diferentes contextos.</p></section><section><h2>Ramas de la Psicología</h2><p>Existen diversas ramas de la psicología, entre las más conocidas se encuentran:</p><ul>    <li><strong>Psicología clínica:</strong> Enfocada en el diagnóstico y tratamiento de trastornos mentales.</li>    <li><strong>Psicología educativa:</strong> Centrada en los procesos de aprendizaje y enseñanza.</li>    <li><strong>Psicología organizacional:</strong> Se ocupa del comportamiento en entornos laborales.</li></ul></section><section><h2>Importancia de la Psicología</h2><p>La psicología nos ayuda a mejorar nuestra calidad de vida al proporcionar herramientas para manejar el estrés, mejorar nuestras relaciones y tomar decisiones informadas. Además, contribuye al desarrollo de comunidades más saludables y resilientes.</p></section><section><h2>Conclusión</h2><p>Comprender los principios básicos de la psicología nos permite tener una visión más profunda de nosotros mismos y de los demás. Es una disciplina esencial para promover el bienestar individual y colectivo.</p></section>',
        link: null,
        image: FRONTEND_URL + '/images/facultad_comprimido.jpg',
        creationDate: '2021-01-01'
    };

    return DIVULGATION;
}

export async function createDivulgation({ title, description, content, link, image }) {
    return {}

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('link', link);
    formData.append('image', image);

    try{
        const response = await fetch(`${SERVER_URL}?controller=divulgation&action=add`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateDivulgationResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_CREATING_DIVULGATION'] || 'Error'
        }
    }
}

export async function updateDivulgation({ id, title, description, content, link, image }) {
    return {}

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('link', link);
    formData.append('image', image);

    try{
        const response = await fetch(`${SERVER_URL}?controller=divulgation&action=edit`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateUserResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_UPDATING_DIVULGATION'] || 'Error'
        }
    }
}

export async function deleteDivulgation(id) {
    return {}

    const formData = new FormData();
    formData.append('id', id);

    try{
        const response = await fetch(`${SERVER_URL}?controller=divulgation&action=delete`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateDivulgationResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_DELETING_DIVULGATION'] || 'Error'
        }
    }
}