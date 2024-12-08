import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";
import { validateMemberResponse } from "../validators/member.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getMembers() {
    const response = await fetch(`${SERVER_URL}?controller=member&action=list`, {
        method: 'POST'
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

    return resource.map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        description: member.description,
        link: member.referenceURL,
        image: member.imageURL
    }));
}

export async function getMemberById(id) {
    const formData = new FormData();
    formData.append('id', id);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=get`, {
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
            name: resource.name,
            email: resource.email,
            description: resource.description,
            link: resource.referenceURL,
            image: resource.imageURL
        }
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function createMember({ name, email, link, description, image }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('referenceURL', link);
    formData.append('image', image.file);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=add`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateMemberResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_CREATING_MEMBER'] || 'Error'
        }
    }
}

export async function updateMember({ id, name, email, link, description, image }) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('referenceURL', link);
    formData.append('image', image.file);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=edit`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateMemberResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_UPDATING_MEMBER'] || 'Error'
        }
    }
}

export async function deleteMember(id) {
    const formData = new FormData();
    formData.append('id', id);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=delete`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateMemberResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_DELETING_MEMBER'] || 'Error'
        }
    }
}