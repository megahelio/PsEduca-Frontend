import { ERROR_MESSAGES } from "../lang/errorMessages.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';

export function validateEmail({ name, email, subject, message }){
    const ERRORS = {}
    if (!name || !email || !subject || !message) {
        const error = ERROR_MESSAGES[pageLanguage].COMPLETE_ALL_FIELDS;
        ERRORS[error.field] = error.message;
    }

    // NAME
    if (name.length < 4) {
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_EMISOR_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    }else if (name.length > 254) {
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_EMISOR_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    }else if (!name.match(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\-_ªº]+$/)) {
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_EMISOR_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    //EMAIL
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        const error = ERROR_MESSAGES[pageLanguage].EMAIL_EMISOR_INVALIDO_F_KO;
        ERRORS[error.field] = error.message;
    }

    // SUBJECT
    if (subject.length < 4) {
        const error = ERROR_MESSAGES[pageLanguage].ASUNTO_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if (subject.length > 50) {
        const error = ERROR_MESSAGES[pageLanguage].ASUNTO_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if (!subject.match(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\-_ªº¿?']+$/)) {
        const error = ERROR_MESSAGES[pageLanguage].ASUNTO_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    // MESSAGE
    if (message.length < 10) {
        const error = ERROR_MESSAGES[pageLanguage].MENSAJE_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if (message.length > 5000) {
        const error = ERROR_MESSAGES[pageLanguage].MENSAJE_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if (!message.match(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s\-_ªº¿?¡!.,;:]+$/)) {
        const error = ERROR_MESSAGES[pageLanguage].MENSAJE_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    return ERRORS;
}

export function validateEmailResponse(response){
    const ERRORS = {};

    response.code.forEach(code => {
        const error = ERROR_MESSAGES[pageLanguage][code] || ERROR_MESSAGES[pageLanguage].ERROR_SENDING_EMAIL;

        // Set only the first error for each field
        if(!ERRORS[error.field]) ERRORS[error.field] = error.message;
    });

    return ERRORS;
}