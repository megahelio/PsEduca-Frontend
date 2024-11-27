import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getUsers() {
    // TODO: connect to the server

    // If the query is successful, return the users
    // Otherwise, return an error message

    const EXAMPLE_USERS = [
        { id: 1, nombre_usuario: 'alice', nombre_completo: 'Alice Smith', rol: 'ADMIN_GLOBAL' },
        { id: 2, nombre_usuario: 'bob', nombre_completo: 'Bob Johnson', rol: 'GESTOR_CATALOGO' },
        { id: 3, nombre_usuario: 'charlie', nombre_completo: 'Charlie Brown', rol: 'USUARIO_PYP' },
        { id: 4, nombre_usuario: 'david', nombre_completo: 'David Lee', rol: 'USUARIO_PYP' },
        { id: 5, nombre_usuario: 'eva', nombre_completo: 'Eva Green', rol: 'ADMIN_GLOBAL' },
    ];

    const ERROR_FLAG = false;
    if (ERROR_FLAG) {
        const response = {
            error: 'ERROR_UNABLE_TO_FETCH_USERS'
        }

        return {
            error: ERROR_MESSAGES[pageLanguage][response.error] || 'Error'
        };
    }
    return EXAMPLE_USERS;
}

export async function getUserById(id) {
    //TODO: connect to the server

    // If the query is successful, return the user
    // Otherwise, return an error message

    const EXAMPLE_USER = {
        id: 1,
        nombre_usuario: 'alice',
        nombre_completo: 'Alice Smith',
        rol: 'ADMIN_GLOBAL'
    };

    const ERROR_FLAG = false;
    if (ERROR_FLAG) {
        const lang = sessionStorage.getItem('language') || 'es';
        const response = {
            error: 'ERROR_UNABLE_TO_FETCH_USER'
        }

        return {
            error: ERROR_MESSAGES[pageLanguage][response.error] || 'Error'
        };
    }

    return EXAMPLE_USER;
}

export async function updateUser(id, user) {
    //TODO: connect to the server

    // If the query is successful, return the updated user
    // Otherwise, return an error message

    const EXAMPLE_USER = {
        id,
        nombre_usuario: 'alice',
        nombre_completo: 'Alice Smith',
        rol: 'ADMIN_GLOBAL'
    };

    const ERROR_FLAG = false;
    if (ERROR_FLAG) {
        const response = {
            error: 'ERROR_UNABLE_TO_UPDATE_USER'
        }

        return {
            error: ERROR_MESSAGES[pageLanguage][response.error] || 'Error'
        };
    }

    return EXAMPLE_USER;
}

export async function logIn({username, password}){
    const formData = new FormData();
    formData.append('userName', username);
    formData.append('password', password);

    try{
        const response = await fetch(`${SERVER_URL}?controller=auth&action=login`, {
            method: 'POST',
            body: formData
        });
    
        if(!response.ok){
            return {
                error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
            }
        }

        const { ok, code, resource } = await response.json();

        if(!ok){
            return {
                error: ERROR_MESSAGES[pageLanguage][code] || 'Error'
            }
        }

        return {
            token: resource.jwtToken,
            expiration: resource.tokenExpirationDate,
            ROL: resource.user.role,
        }
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}