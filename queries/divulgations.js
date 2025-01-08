import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";
import { validateDivulgationResponse } from "../validators/divulgation.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getDivulgations() {
    const response = await fetch(`${SERVER_URL}?controller=outreach&action=list`, {
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

    return resource.map(divulgation => ({
        id: divulgation.id,
        title: divulgation.title,
        description: divulgation.description,
        type: divulgation.type,
        link: divulgation.externalURL || (divulgation.fileURL? SERVER_URL + divulgation.fileURL.substring(1): null) || null,
        image: SERVER_URL + divulgation.imageURL,
        lastModified: divulgation.lastModified,
        content: divulgation.pageContent
    }));
}

export async function getDivulgationById(id) {
    const formData = new FormData();
    formData.append('id', id);

    try{
        const response = await fetch(`${SERVER_URL}?controller=outreach&action=get`, {
            method: 'POST',
            body: formData,
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

        return {
            id: resource.id,
            title: resource.title,
            description: resource.description,
            type: resource.type,
            link: resource.externalURL || (resource.file? SERVER_URL + divulgation.fileURL.substring(1): null) || null,
            image: SERVER_URL + resource.imageURL,
            lastModified: resource.lastModified,
            content: resource.pageContent
        }
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function createDivulgation({ title, description, type, content, link, image, file }) {
    console.log('createDivulgation', { title, description, type, content, link, image, file });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('pageContent', content);
    formData.append('externalURL', link);
    formData.append('image', image.file);
    formData.append('file', file.file);

    if(type === 'LINK_EXTERNO'){
        formData.delete('file');
        formData.delete('pageContent');
    } else if(type === 'PAGINA_INTERNA'){
        formData.delete('file');
        formData.delete('externalURL');
    } else if(type === 'FICHERO_INTERNO'){
        formData.delete('pageContent');
        formData.delete('externalURL');
    }

    try{
        const response = await fetch(`${SERVER_URL}?controller=outreach&action=add`, {
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

export async function updateDivulgation({ id, title, description, type, content, link, image, file }) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('pageContent', content);
    formData.append('externalURL', link);
    formData.append('image', image.file);
    formData.append('file', file.file);

    if(type === 'LINK_EXTERNO'){
        formData.delete('file');
        formData.delete('pageContent');
    } else if(type === 'PAGINA_INTERNA'){
        formData.delete('file');
        formData.delete('externalURL');
    } else if(type === 'FICHERO_INTERNO'){
        formData.delete('pageContent');
        formData.delete('externalURL');
    }

    try{
        const response = await fetch(`${SERVER_URL}?controller=outreach&action=edit`, {
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
            error: ERROR_MESSAGES[pageLanguage]['ERROR_UPDATING_DIVULGATION'] || 'Error'
        }
    }
}

export async function deleteDivulgation(id) {
    const formData = new FormData();
    formData.append('id', id);

    try{
        const response = await fetch(`${SERVER_URL}?controller=outreach&action=delete`, {
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