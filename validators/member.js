import { ERROR_MESSAGES } from "../lang/errorMessages.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';

export function validateMember({id, name, email, link, description, image}, isUpdate = false){
    const ERRORS = {};

    if(!name){
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_MIEMBRO_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    }

    // NAME
    if(name.length > 0){
        if(name.length < 4){
            const error = ERROR_MESSAGES[pageLanguage].NOMBRE_MIEMBRO_MINIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(name.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].NOMBRE_MIEMBRO_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(!name.match(/^[a-zA-Z0-9_-\sáéíóúÁÉÍÓÚñÑªº]+$/)){
            const error = ERROR_MESSAGES[pageLanguage].NOMBRE_MIEMBRO_CARACTERES_F_KO;
            ERRORS[error.field] = error.message;
        }
    }
    console.log(email)
    // EMAIL
    if(email.length > 0){
        if(email.length < 4){
            const error = ERROR_MESSAGES[pageLanguage].EMAIL_MIEMBRO_INVALIDO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(email.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].EMAIL_MIEMBRO_INVALIDO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)){
            const error = ERROR_MESSAGES[pageLanguage].EMAIL_MIEMBRO_INVALIDO_F_KO;
            ERRORS[error.field] = error.message;
        }
    }

    // LINK
    if(link.length > 0){
        if(link.length > 1 && link.length < 4){
            const error = ERROR_MESSAGES[pageLanguage].LINK_MINIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(link.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].LINK_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(!link.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)){
            const error = ERROR_MESSAGES[pageLanguage].LINK_INVALIDO_F_KO;
            ERRORS[error.field] = error.message;
        }
    }

    // DESCRIPTION
    if(description.length > 0){
        if(description.length < 4){
            const error = ERROR_MESSAGES[pageLanguage].DESCRIPCION_MINIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(description.length > 1000){
            const error = ERROR_MESSAGES[pageLanguage].DESCRIPCION_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
        }
    }

    // IMAGE
    // It's verified in backend

    console.log(ERRORS)
    return ERRORS;
}

export async function validateMemberResponse(response){
    const ERRORS = {};

    response.code.forEach(code => {
        const error = ERROR_MESSAGES[pageLanguage][code] || ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'];
        ERRORS[error.field] = error.message;
    });

    return ERRORS;
}