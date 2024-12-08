import { ERROR_MESSAGES } from "../lang/errorMessages.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';

export function validateFormation({id, title, type, link, description, image, startYear, endYear}, isUpdate = false){
    const ERRORS = {};
    
    if(!title || !type || !link || !description || !startYear){
        const error = ERROR_MESSAGES[pageLanguage].COMPLETE_ALL_FIELDS;
        ERRORS[error.field] = error.message;
    }

    // TITLE
    if(title.length < 4){
        const error = ERROR_MESSAGES[pageLanguage].TITULO_FORMACION_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(title.length > 254){
        const error = ERROR_MESSAGES[pageLanguage].TITULO_FORMACION_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    }else if(!title.match(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ\-_'ªº.,]+$/)){
        const error = ERROR_MESSAGES[pageLanguage].TITULO_FORMACION_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    // DESCRIPTION
    if(description.legth < 4){
        const error = ERROR_MESSAGES[pageLanguage].DESCRIPCION_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(description.length > 1000){
        const error = ERROR_MESSAGES[pageLanguage].DESCRIPCION_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    }


    // LINK
    if(link.length < 4){
        const error = ERROR_MESSAGES[pageLanguage].LINK_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(link.length > 254){
        const error = ERROR_MESSAGES[pageLanguage].LINK_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    }

    // START YEAR
    if(!startYear.match(/^[0-9]{4}$/)){
        const error = ERROR_MESSAGES[pageLanguage].ANHO_INICIO_INVALIDO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(parseInt(startYear) < 1900){
        const error = ERROR_MESSAGES[pageLanguage].ANHO_INICIO_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(parseInt(startYear) > 3000){
        const error = ERROR_MESSAGES[pageLanguage].ANHO_INICIO_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    }

    // END YEAR
    if(endYear){
        if(!endYear.match(/^[0-9]{4}$/)){
            const error = ERROR_MESSAGES[pageLanguage].ANHO_FIN_INVALIDO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(parseInt(endYear) < 1900){
            const error = ERROR_MESSAGES[pageLanguage].ANHO_FIN_MINIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(parseInt(endYear) > 3000){
            const error = ERROR_MESSAGES[pageLanguage].ANHO_FIN_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
        }

        if(parseInt(endYear) < parseInt(startYear)){
            const error = ERROR_MESSAGES[pageLanguage].ANHO_FIN_MENOR_INICIO_F_KO;
            ERRORS[error.field] = error.message;
        }
    }

    // TYPE
    if(!['MASTER', 'DOCTORADO', 'CURSO'].includes(type)){
        const error = ERROR_MESSAGES[pageLanguage].TIPO_F_KO;
        ERRORS[error.field] = error.message;
    }

    return ERRORS;
}

export function validateFormationResponse(response){
    const ERRORS = {};

    response.code.forEach(code => {
        const error = ERROR_MESSAGES[pageLanguage][code] || ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'];
        ERRORS[error.field] = error.message;
    });

    return ERRORS;
}