import { ERROR_MESSAGES } from "../lang/i18n.js"

const pageLanguage = sessionStorage.getItem('language') || 'es';
export function logIn({username, password}){
    // TODO: connect to the server

    // If the user is logged in, return ROLE, token and more info
    // Otherwise, return an error for every field

    const ERROR_FLAG = username !== 'admin' && password !== 'admin';
    if (ERROR_FLAG) {
        const response = {
            username: 'ERR-1',
            password: 'ERR-1'
        }

        return Object.keys(response).reduce((acc, key) => {
            acc[key] = ERROR_MESSAGES[pageLanguage][response[key]] || 'Error';
            return acc;
        }, {});
    }
    return {
        ROL: 'ADMIN_GLOBAL',
        token: '1234567890',
        username: 'admin'
    }
}