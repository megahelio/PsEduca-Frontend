import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";
import { validateLogin, validateLoginResponse, validateUserResponse } from "../validators/user.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getUsers() {
    const formData = new FormData();
    formData.append('controller', 'user');
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

    return resource.map(user => ({
        id: user.id,
        nombre_usuario: user.name,
        nombre_completo: user.fullName,
        rol: user.role
    }));
}

export async function getUserById(id) {
    const formData = new FormData();
    formData.append('controller', 'user');
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
            name: resource.name,
            fullName: resource.fullName,
            role: resource.role
        }
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function createUser({ username, fullname, role, password }) {
    const formData = new FormData();
    formData.append('controller', 'user');
    formData.append('action', 'add');
    formData.append('userName', username);
    formData.append('fullName', fullname);
    formData.append('role', role);
    formData.append('password', password);

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
            return validateUserResponse({ok, code, resource});
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_CREATING_USER'] || 'Error'
        }
    }
}

export async function updateUser({ id, username, fullname, role, password }) {
    const formData = new FormData();
    formData.append('controller', 'user');
    formData.append('action', 'edit');
    formData.append('id', id);
    formData.append('userName', username);
    formData.append('fullName', fullname);
    formData.append('role', role);
    formData.append('password', password || null);

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
            return validateUserResponse({ok, code, resource});
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_UPDATING_USER'] || 'Error'
        }
    }
}

export async function deleteUser(id) {
    const formData = new FormData();
    formData.append('controller', 'user');
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
            return validateUserResponse({ok, code, resource});
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_DELETING_USER'] || 'Error'
        }
    }
}

export async function logIn({ username, password }) {
    const ERRORS = validateLogin({ username, password });

    if (Object.keys(ERRORS).length > 0) {
        return ERRORS;
    }
    
    const formData = new FormData();
    formData.append('controller', 'auth');
    formData.append('action', 'login');
    formData.append('userName', username);
    formData.append('password', password);

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            body: formData
        });
    
        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateLoginResponse({ok, code, resource});
        }

        return {
            token: resource.jwtToken,
            expiration: resource.tokenExpirationDate,
            ROL: resource.user.role,
        }
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_LOGIN'] || 'Error'
        }
    }
}