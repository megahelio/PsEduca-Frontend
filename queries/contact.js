import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function sendEmail({ name, email, subject, message }) {
    const ERROR_FLAG = true;

    if (ERROR_FLAG) {
        return {
            error: 'Error al enviar el correo'
        }
    }

    return {};
}