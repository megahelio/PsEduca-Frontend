import { ERROR_MESSAGES } from "../lang/errorMessages.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';

export function validateDivulgation({id, title, description, type, content, link, image, file}, isUpdate = false){
    const ERRORS = {};
    
    if(!title || !type || !description){
        const error = ERROR_MESSAGES[pageLanguage].COMPLETE_ALL_FIELDS;
        ERRORS[error.field] = error.message;
    }

    // TITLE
    if(title.length < 4){ // DONE
        const error = ERROR_MESSAGES[pageLanguage].TITULO_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(title.length > 254){
        const error = ERROR_MESSAGES[pageLanguage].TITULO_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    }else if(!title.match(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ\-_'ªº.,]+$/)){
        const error = ERROR_MESSAGES[pageLanguage].TITULO_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    // DESCRIPTION
    if(description.length < 4){ // DONE
        const error = ERROR_MESSAGES[pageLanguage].DESCRIPCION_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(description.length > 1000){
        const error = ERROR_MESSAGES[pageLanguage].DESCRIPCION_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    }

    // LINK
    if(type === 'LINK_EXTERNO'){ // DONE
        if(link.length < 4){
            const error = ERROR_MESSAGES[pageLanguage].LINK_MINIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(link.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].LINK_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
        }
    }

    // TYPE
    if(!['LINK_EXTERNO', 'PAGINA_INTERNA', 'FICHERO_INTERNO'].includes(type)){ // DONE
        const error = ERROR_MESSAGES[pageLanguage].TIPO_F_KO;
        ERRORS[error.field] = error.message;
    }

    if(type === 'FICHERO_INTERNO' && !file.file){ // DONE
        const error = ERROR_MESSAGES[pageLanguage].FICHERO_OBLIGATORIO_F_KO;
        ERRORS[error.field] = error.message;
    }

    // CONTENT
    if(type === 'PAGINA_INTERNA'){ // DONE
        if(content.length < 4){
            const error = ERROR_MESSAGES[pageLanguage].PAGINA_DETALLE_MINIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(content.length > 65534){
            const error = ERROR_MESSAGES[pageLanguage].PAGINA_DETALLE_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
        }
    }

    return ERRORS;
}

export function validateDivulgationResponse(response){
    const ERRORS = {};

    response.code.forEach(code => {
        const error = ERROR_MESSAGES[pageLanguage][code] || ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'];
        ERRORS[error.field] = error.message;
    });

    return ERRORS;
}