import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";
import { validateEmail, validateEmailResponse } from "../validators/contact.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function sendEmail({ name, email, subject, message }) {

    const ERRORS = validateEmail({ name, email, subject, message });

    if (Object.keys(ERRORS).length > 0) {
        return ERRORS;
    }

    const formData = new FormData();
    formData.append('controller', 'contact');
    formData.append('action', 'send');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!data.ok) {
            return validateEmailResponse(data);
        }

        return {}
    } catch (error) {
        return {
            'all': ERROR_MESSAGES[pageLanguage].ERROR_SENDING_EMAIL || 'Error'
        }
    }
}