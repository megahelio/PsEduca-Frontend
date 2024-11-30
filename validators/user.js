import { ERROR_MESSAGES } from "../lang/errorMessages.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';

export function validateLogin({username, password}){
    const ERRORS = {};

    if(!username || !password){
        const error = ERROR_MESSAGES[pageLanguage].COMPLETE_ALL_FIELDS;
        ERRORS[error.field] = error.message;
    }

    // USERNAME
    if(username.length < 4){
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_USUARIO_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(username.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].NOMBRE_USUARIO_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
    } else if(!username.match(/^[a-zA-Z0-9_-]+$/)){
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_USUARIO_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    // PASSWORD
    if(password.length < 4){
        const error = ERROR_MESSAGES[pageLanguage].CONTRASENHA_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(password.length > 254){
        const error = ERROR_MESSAGES[pageLanguage].CONTRASENHA_MAXIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(!password.match(/^[a-zA-Z0-9_\-\$@()+=.]+$/)){
        const error = ERROR_MESSAGES[pageLanguage].CONTRASENHA_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    return ERRORS;
}

export function validateLoginResponse(response){
    const ERRORS = {};

    response.code.forEach(code => {
        const error = ERROR_MESSAGES[pageLanguage][code] || ERROR_MESSAGES[pageLanguage]['ERROR_LOGIN'];
        ERRORS[error.field] = error.message;
    });

    return ERRORS;
}

export function validateUser({id, username, fullname, password, confirmPassword}, isUpdate = false){
    const ERRORS = {};
    console.log(id, username, fullname, password, confirmPassword);

    // USERNAME
    if(username.length < 4){
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_USUARIO_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(username.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].NOMBRE_USUARIO_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
    } else if(!username.match(/^[a-zA-Z0-9_-]+$/)){
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_USUARIO_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    // FULLNAME
    if(fullname.length < 4){
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_COMPLETO_MINIMO_F_KO;
        ERRORS[error.field] = error.message;
    } else if(fullname.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].NOMBRE_COMPLETO_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
    } else if(!fullname.match(/^[a-zA-Z\s]+$/)){
        const error = ERROR_MESSAGES[pageLanguage].NOMBRE_COMPLETO_CARACTERES_F_KO;
        ERRORS[error.field] = error.message;
    }

    // PASSWORD
    if(!isUpdate){
        console.log('isUpdate', isUpdate);
        if(password.length < 4){
            const error = ERROR_MESSAGES[pageLanguage].CONTRASENHA_MINIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(password.length > 254){
            const error = ERROR_MESSAGES[pageLanguage].CONTRASENHA_MAXIMO_F_KO;
            ERRORS[error.field] = error.message;
        } else if(!password.match(/^[a-zA-Z0-9_\-\$@()+=.]+$/)){
            const error = ERROR_MESSAGES[pageLanguage].CONTRASENHA_CARACTERES_F_KO;
            ERRORS[error.field] = error.message;
        }
    }

    // CONFIRM PASSWORD
    if(password !== confirmPassword){
        const error = ERROR_MESSAGES[pageLanguage].CONTRASENHA_NO_COINCIDE_F_KO;
        ERRORS['confirm-password'] = error.message;
    }

    return ERRORS;
}

export function validateUserResponse(response){
    const ERRORS = {};

    response.code.forEach(code => {
        const error = ERROR_MESSAGES[pageLanguage][code] || ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'];
        ERRORS[error.field] = error.message;
    });

    return ERRORS;
}