import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";
import { validateFormationResponse } from "../validators/formation.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getMappedFormations() {
    const formations = await getFormations();

    const CURRENT_YEAR = new Date().getFullYear();

    const mappedFormations = Object.groupBy(formations, (formation) => (formation.endYear === null || parseInt(formation.endYear) >= CURRENT_YEAR) ? 'actual' : 'past');
    mappedFormations.actual = Object.groupBy(mappedFormations.actual || [], (formation) => formation.type);
    mappedFormations.past = Object.groupBy(mappedFormations.past || [], (formation) => formation.type);
    return mappedFormations;
}

export async function getFormations() {
    const formData = new FormData();
    formData.append('controller', 'education');
    formData.append('action', 'list');

    const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }

    const { ok, code, resource } = await response.json();

    if (!ok) {
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
    })).sort((a, b) => a.type.localeCompare(b.type));
}

export async function getFormationById(id) {
    const formData = new FormData();
    formData.append('controller', 'education');
    formData.append('action', 'get');
    formData.append('id', id);

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
            }
        }

        const { ok, code, resource } = await response.json();

        if (!ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
            }
        }

        return {
            id: resource.id,
            title: resource.title,
            description: resource.description,
            type: resource.type,
            link: resource.referenceURL,
            image: resource.imageURL,
            startYear: resource.initYear,
            endYear: resource.endYear
        }
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function createFormation({ title, description, type, link, image, startYear, endYear }) {
    const formData = new FormData();
    formData.append('controller', 'education');
    formData.append('action', 'add');
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('referenceURL', link);
    formData.append('image', image.file);
    formData.append('initYear', startYear);
    formData.append('endYear', endYear);

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateFormationResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_CREATING_FORMATION'] || 'Error'
        }
    }
}

export async function updateFormation({ id, title, description, type, link, image, startYear, endYear }) {
    const formData = new FormData();
    formData.append('controller', 'education');
    formData.append('action', 'edit');
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('referenceURL', link);
    formData.append('image', image.file);
    formData.append('initYear', startYear);
    formData.append('endYear', endYear);

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateFormationResponse({ok, code, resource});
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_UPDATING_FORMATION'] || 'Error'
        }
    }
}

export async function deleteFormation(id) {
    const formData = new FormData();
    formData.append('controller', 'education');
    formData.append('action', 'delete');
    formData.append('id', id);

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateFormationResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_DELETING_FORMATION'] || 'Error'
        }
    }
}