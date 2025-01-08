export const ERROR_MESSAGES = {
    es: {
        'SERVER_ERROR': 'Error de servidor',
        'ERROR_UNABLE_TO_FETCH_USERS': 'No se han podido obtener los usuarios',
        'ERROR_UNABLE_TO_FETCH_USER': 'No se ha podido obtener el usuario',
        'ERROR_UNABLE_TO_FETCH_ROLES': 'No se han podido obtener los roles',
        'ERROR_UNABLE_TO_FETCH_MEMBERS': 'No se han podido obtener los miembros',

        // GLOBAL
        'COMPLETE_ALL_FIELDS': {
            message: 'Por favor, rellene todos los campos',
            field: 'all'
        },
        'INTERNAL_SERVER_ERROR_KO': {
            message: 'Error de servidor',
            field: 'all'
        },
        
        // PERMISSIONS
        'FORBIDDEN_ACCESS_KO': {
            message: 'Acceso prohibido',
            field: 'all'
        },
        'AUTHENTICATION_REQUIRED_KO': {
            message: 'Autenticación requerida',
            field: 'all'
        },
        'AUTHENTICATION_INVALID_KO': {
            message: 'Autenticación inválida',
            field: 'all'
        },
        'AUTHENTICATION_TYPE_NOT_SUPPORTED_KO': {
            message: 'Tipo de autenticación no soportado',
            field: 'all'
        },

        // AUTH
        'ERROR_LOGIN': {
            message: 'Error al iniciar sesión',
            field: 'all'
        },
        'USER_CREDENTIALS_INVALID_KO': {
            message: 'Usuario o contraseña incorrectos',
            field: 'all'
        },
        'NOMBRE_USUARIO_MINIMO_F_KO': {
            message: 'El nombre de usuario debe tener al menos 4 caracteres',
            field: 'username'
        },
        'NOMBRE_USUARIO_MAXIMO_F_KO': {
            message: 'El nombre de usuario debe tener como máximo 254 caracteres',
            field: 'username'
        },
        'NOMBRE_USUARIO_CARACTERES_F_KO': {
            message: 'El nombre de usuario tiene caracteres inválidos',
            field: 'username'
        },
        'CONTRASENHA_MINIMO_F_KO': {
            message: 'La contraseña debe tener al menos 4 caracteres',
            field: 'password'
        },
        'CONTRASENHA_MAXIMO_F_KO': {
            message: 'La contraseña debe tener como máximo 254 caracteres',
            field: 'password'
        },
        'CONTRASENHA_CARACTERES_F_KO': {
            message: 'La contraseña tiene caracteres inválidos',
            field: 'password'
        },

        // USER
        'ERROR_CREATING_USER': {
            message: 'Error al crear el usuario',
            field: 'all'
        },
        'ERROR_UPDATING_USER': {
            message: 'Error al actualizar el usuario',
            field: 'all'
        },
        'ERROR_DELETING_USER': {
            message: 'Error al eliminar el usuario',
            field: 'all'
        },
        'ID_MINIMO_F_KO': {
            message: 'El id debe mayor que 0',
            field: 'all'
        },
        'ID_INVALIDO_F_KO': {
            message: 'El id es inválido',
            field: 'all'
        },
        'NOMBRE_COMPLETO_MINIMO_F_KO': {
            message: 'El nombre debe tener al menos 4 caracteres',
            field: 'name'
        },
        'NOMBRE_COMPLETO_MAXIMO_F_KO': {
            message: 'El nombre debe tener como máximo 254 caracteres',
            field: 'name'
        },
        'NOMBRE_COMPLETO_CARACTERES_F_KO': {
            message: 'El nombre tiene caracteres inválidos',
            field: 'name'
        },
        'ROL_F_KO': {
            message: 'Rol inválido',
            field: 'role'
        },
        'CONTRASENHA_NO_COINCIDE_F_KO': {
            message: 'Las contraseñas no coinciden',
            field: 'confirm-password'
        },
        'NOMBRE_USUARIO_YA_EXISTE_A_KO': {
            message: 'El nombre de usuario ya existe',
            field: 'username'
        },
        'USUARIO_NO_ENCONTRADO_A_KO': {
            message: 'Usuario no encontrado',
            field: 'all'
        },

        //CONTACT FORM
        'ERROR_SENDING_EMAIL': {
            message: 'Error al enviar el correo',
            field: 'all'
        },
        'NOMBRE_EMISOR_MINIMO_F_KO': {
            message: 'El nombre del emisor debe tener al menos 4 caracteres',
            field: 'name'
        },
        'NOMBRE_EMISOR_MAXIMO_F_KO': {
            message: 'El nombre del emisor debe tener como máximo 254 caracteres',
            field: 'name'
        },
        'NOMBRE_EMISOR_CARACTERES_F_KO': {
            message: 'El nombre del emisor tiene caracteres inválidos',
            field: 'name'
        },
        'EMAIL_EMISOR_INVALIDO_F_KO': {
            message: 'Introduzca un correo válido',
            field: 'email'
        },
        'ASUNTO_MINIMO_F_KO': {
            message: 'El asunto debe tener al menos 4 caracteres',
            field: 'subject'
        },
        'ASUNTO_MAXIMO_F_KO': {
            message: 'El asunto debe tener como máximo 50 caracteres',
            field: 'subject'
        },
        'ASUNTO_CARACTERES_F_KO': {
            message: 'El asunto tiene caracteres inválidos',
            field: 'subject'
        },
        'MENSAJE_MINIMO_F_KO': {
            message: 'El mensaje debe tener al menos 10 caracteres',
            field: 'message'
        },
        'MENSAJE_MAXIMO_F_KO': {
            message: 'El mensaje debe tener como máximo 5000 caracteres',
            field: 'message'
        },
        'MENSAJE_CARACTERES_F_KO': {
            message: 'El mensaje tiene caracteres inválidos',
            field: 'message'
        },

        // MEMBER
        'ERROR_CREATING_MEMBER': {
            message: 'Error al crear el miembro',
            field: 'all'
        },
        'ERROR_UPDATING_MEMBER': {
            message: 'Error al actualizar el miembro',
            field: 'all'
        },
        'ERROR_DELETING_MEMBER': {
            message: 'Error al eliminar el miembro',
            field: 'all'
        },
        'NOMBRE_MIEMBRO_MINIMO_F_KO': {
            message: 'El nombre del miembro debe tener al menos 4 caracteres',
            field: 'name'
        },
        'NOMBRE_MIEMBRO_MAXIMO_F_KO': {
            message: 'El nombre del miembro debe tener como máximo 254 caracteres',
            field: 'name'
        },
        'NOMBRE_MIEMBRO_CARACTERES_F_KO': {
            message: 'El nombre del miembro tiene caracteres inválidos',
            field: 'name'
        },
        'DESCRIPCION_MINIMO_F_KO': {
            message: 'La descripción debe tener al menos 4 caracteres',
            field: 'description'
        },
        'DESCRIPCION_MAXIMO_F_KO': {
            message: 'La descripción debe tener como máximo 1000 caracteres',
            field: 'description'
        },
        'DESCRIPCION_CARACTERES_F_KO': {
            message: 'La descripción tiene caracteres inválidos',
            field: 'description'
        },
        'EMAIL_MIEMBRO_INVALIDO_F_KO': {
            message: 'Introduzca un correo válido',
            field: 'email'
        },
        'LINK_MINIMO_F_KO': {
            message: 'El enlace debe tener al menos 4 caracteres',
            field: 'link'
        },
        'LINK_MAXIMO_F_KO': {
            message: 'El enlace debe tener como máximo 254 caracteres',
            field: 'link'
        },
        'LINK_INVALIDO_F_KO': {
            message: 'El enlace tiene un formato inválido',
            field: 'link'
        },
        'IMAGEN_FORMATO_F_KO': {
            message: 'Solo se admiten imágenes en formato: jpeg, jpg, png, gif, svg, webp, avif, ico',
            field: 'image'
        },
        'IMAGEN_TAMAÑO_F_KO': {
            message: 'La imagen no debe superar los 10MB',
            field: 'image'
        },
        'MIEMBRO_NO_ENCONTRADO_A_KO': {
            message: 'Miembro no encontrado',
            field: 'all'
        },

        // FORMATION
        'ERROR_CREATING_FORMATION': {
            message: 'Error al crear la formación',
            field: 'all'
        },
        'ERROR_UPDATING_FORMATION': {
            message: 'Error al actualizar la formación',
            field: 'all'
        },
        'ERROR_DELETING_FORMATION': {
            message: 'Error al eliminar la formación',
            field: 'all'
        },
        'TITULO_FORMACION_MINIMO_F_KO': {
            message: 'El título de la formación debe tener al menos 4 caracteres',
            field: 'title'
        },
        'TITULO_FORMACION_MAXIMO_F_KO': {
            message: 'El título de la formación debe tener como máximo 254 caracteres',
            field: 'title'
        },
        'TITULO_FORMACION_CARACTERES_F_KO': {
            message: 'El título de la formación tiene caracteres inválidos',
            field: 'title'
        },
        'ANHO_INICIO_INVALIDO_F_KO': {
            message: 'El año debe ser un número positivo',
            field: 'date'
        },
        'ANHO_INICIO_MINIMO_F_KO': {
            message: 'El año debe ser igual o mayor que 1900',
            field: 'date'
        },
        'ANHO_INICIO_MAXIMO_F_KO': {
            message: 'El año debe ser igual o menor que 3000',
            field: 'date'
        },
        'ANHO_FIN_INVALIDO_F_KO': {
            message: 'El año debe ser un número positivo',
            field: 'date'
        },
        'ANHO_FIN_MINIMO_F_KO': {
            message: 'El año debe ser igual o mayor que 1900',
            field: 'date'
        },
        'ANHO_FIN_MAXIMO_F_KO': {
            message: 'El año debe ser igual o menor que 3000',
            field: 'date'
        },
        'ANHO_FIN_MENOR_INICIO_F_KO': {
            message: 'El año de fin no puede ser menor que el de inicio',
            field: 'date'
        },
        'TIPO_F_KO': {
            message: 'Tipo inválido',
            field: 'type'
        },
        'ITEM_FORMACION_NO_ENCONTRADO_A_KO': {
            message: 'Elemento de formación no encontrado',
            field: 'all'
        },

        // DIVULGATION
        'TITULO_MINIMO_F_KO': {
            message: 'El título debe tener al menos 4 caracteres',
            field: 'title'
        },
        'TITULO_MAXIMO_F_KO': {
            message: 'El título debe tener como máximo 254 caracteres',
            field: 'title'
        },
        'TITULO_CARACTERES_F_KO': {
            message: 'El título tiene caracteres inválidos',
            field: 'title'
        },
        'CAMPO_PAGINA_DETALLE_INCOMPATIBLE_CON_TIPO_LINK_EXTERNO_F_KO': {
            message: 'El campo de página detalle es incompatible con el tipo de divulgación de enlace externo',
            field: 'type'
        },
        'CAMPO_FICHERO_INCOMPATIBLE_CON_TIPO_LINK_EXTERNO_F_KO': {
            message: 'El campo de fichero es incompatible con el tipo de divulgación de enlace externo',
            field: 'type'
        },
        'FICHERO_TAMAÑO_F_KO': {
            message: 'El fichero no debe superar los 1GB',
            field: 'file'
        },
        'CAMPO_LINK_EXTERNO_INCOMPATIBLE_CON_TIPO_FICHERO_INTERNO_F_KO': {
            message: 'El campo de enlace externo es incompatible con el tipo de divulgación de fichero interno',
            field: 'type'
        },
        'CAMPO_PAGINA_DETALLE_INCOMPATIBLE_CON_TIPO_FICHERO_INTERNO_F_KO': {
            message: 'El campo de página detalle es incompatible con el tipo de divulgación de fichero interno',
            field: 'type'
        },
        'FICHERO_OBLIGATORIO_F_KO': {
            message: 'El fichero es obligatorio',
            field: 'file'
        },
        'PAGINA_DETALLE_MINIMO_F_KO': {
            message: 'La página detalle debe tener al menos 4 caracteres',
            field: 'content'
        },
        'PAGINA_DETALLE_MAXIMO_F_KO': {
            message: 'La página detalle debe tener como máximo 65534 caracteres',
            field: 'content'
        },
        'ERROR_CREATING_DIVULGATION': {
            message: 'Error al crear la divulgación',
            field: 'all'
        },
        'ERROR_UPDATING_DIVULGATION': {
            message: 'Error al actualizar la divulgación',
            field: 'all'
        },
        'ERROR_DELETING_DIVULGATION': {
            message: 'Error al eliminar la divulgación',
            field: 'all'
        },
    },
    en: {
        'SERVER_ERROR': 'Server error',
        'ERROR_UNABLE_TO_FETCH_USERS': 'Unable to fetch users',
        'ERROR_UNABLE_TO_FETCH_USER': 'Unable to fetch user',
        'ERROR_UNABLE_TO_FETCH_ROLES': 'Unable to fetch roles',
        'ERROR_UNABLE_TO_FETCH_MEMBERS': 'Unable to fetch members',

        // GLOBAL
        'COMPLETE_ALL_FIELDS': {
            message: 'Please complete all fields',
            field: 'all'
        },
        'INTERNAL_SERVER_ERROR_KO': {
            message: 'Server error',
            field: 'all'
        },

        // PERMISSIONS
        'FORBIDDEN_ACCESS_KO': {
            message: 'Forbidden access',
            field: 'all'
        },
        'AUTHENTICATION_REQUIRED_KO': {
            message: 'Authentication required',
            field: 'all'
        },
        'AUTHENTICATION_INVALID_KO': {
            message: 'Invalid authentication',
            field: 'all'
        },
        'AUTHENTICATION_TYPE_NOT_SUPPORTED_KO': {
            message: 'Authentication type not supported',
            field: 'all'
        },

        // AUTH
        'ERROR_LOGIN': {
            message: 'Error logging in',
            field: 'all'
        },
        'USER_CREDENTIALS_INVALID_KO': {
            message: 'Invalid username or password',
            field: 'all'
        },
        'NOMBRE_USUARIO_MINIMO_F_KO': {
            message: 'Username must have at least 4 characters',
            field: 'username'
        },
        'NOMBRE_USUARIO_MAXIMO_F_KO': {
            message: 'Username must have at most 254 characters',
            field: 'username'
        },
        'NOMBRE_USUARIO_CARACTERES_F_KO': {
            message: 'Username has invalid characters',
            field: 'username'
        },
        'CONTRASENHA_MINIMO_F_KO': {
            message: 'Password must have at least 4 characters',
            field: 'password'
        },
        'CONTRASENHA_MAXIMO_F_KO': {
            message: 'Password must have at most 254 characters',
            field: 'password'
        },
        'CONTRASENHA_CARACTERES_F_KO': {
            message: 'Password has invalid characters',
            field: 'password'
        },

        // USER
        'ERROR_CREATING_USER': {
            message: 'Error creating user',
            field: 'all'
        },
        'ERROR_UPDATING_USER': {
            message: 'Error updating user',
            field: 'all'
        },
        'ERROR_DELETING_USER': {
            message: 'Error deleting user',
            field: 'all'
        },
        'ID_MINIMO_F_KO': {
            message: 'Id must be greater than 0',
            field: 'all'
        },
        'ID_INVALIDO_F_KO': {
            message: 'Id is invalid',
            field: 'all'
        },
        'NOMBRE_COMPLETO_MINIMO_F_KO': {
            message: 'Name must have at least 4 characters',
            field: 'name'
        },
        'NOMBRE_COMPLETO_MAXIMO_F_KO': {
            message: 'Name must have at most 254 characters',
            field: 'name'
        },
        'NOMBRE_COMPLETO_CARACTERES_F_KO': {
            message: 'Name has invalid characters',
            field: 'name'
        },
        'ROL_F_KO': {
            message: 'Invalid role',
            field: 'role'
        },
        'CONTRASENHA_NO_COINCIDE_F_KO': {
            message: 'Passwords do not match',
            field: 'confirm-password'
        },
        'NOMBRE_USUARIO_YA_EXISTE_A_KO': {
            message: 'Username already exists',
            field: 'username'
        },
        'USUARIO_NO_ENCONTRADO_A_KO': {
            message: 'User not found',
            field: 'all'
        },

        //CONTACT FORM
        'ERROR_SENDING_EMAIL': {
            message: 'Error sending email',
            field: 'all'
        },
        'NOMBRE_EMISOR_MINIMO_F_KO': {
            message: 'Sender name must have at least 4 characters',
            field: 'name'
        },
        'NOMBRE_EMISOR_MAXIMO_F_KO': {
            message: 'Sender name must have at most 254 characters',
            field: 'name'
        },
        'NOMBRE_EMISOR_CARACTERES_F_KO': {
            message: 'Sender name has invalid characters',
            field: 'name'
        },
        'EMAIL_EMISOR_INVALIDO_F_KO': {
            message: 'Enter a valid email',
            field: 'email'
        },
        'ASUNTO_MINIMO_F_KO': {
            message: 'Subject must have at least 4 characters',
            field: 'subject'
        },
        'ASUNTO_MAXIMO_F_KO': {
            message: 'Subject must have at most 50 characters',
            field: 'subject'
        },
        'ASUNTO_CARACTERES_F_KO': {
            message: 'Subject has invalid characters',
            field: 'subject'
        },
        'MENSAJE_MINIMO_F_KO': {
            message: 'Message must have at least 10 characters',
            field: 'message'
        },
        'MENSAJE_MAXIMO_F_KO': {
            message: 'Message must have at most 5000 characters',
            field: 'message'
        },
        'MENSAJE_CARACTERES_F_KO': {
            message: 'Message has invalid characters',
            field: 'message'
        },

        // MEMBER
        'ERROR_CREATING_MEMBER': {
            message: 'Error creating member',
            field: 'all'
        },
        'ERROR_UPDATING_MEMBER': {
            message: 'Error updating member',
            field: 'all'
        },
        'ERROR_DELETING_MEMBER': {
            message: 'Error deleting member',
            field: 'all'
        },
        'NOMBRE_MIEMBRO_MINIMO_F_KO': {
            message: 'Member name must have at least 4 characters',
            field: 'name'
        },
        'NOMBRE_MIEMBRO_MAXIMO_F_KO': {
            message: 'Member name must have at most 254 characters',
            field: 'name'
        },
        'NOMBRE_MIEMBRO_CARACTERES_F_KO': {
            message: 'Member name has invalid characters',
            field: 'name'
        },
        'DESCRIPCION_MINIMO_F_KO': {
            message: 'Description must have at least 10 characters',
            field: 'description'
        },
        'DESCRIPCION_MAXIMO_F_KO': {
            message: 'Description must have at most 1000 characters',
            field: 'description'
        },
        'DESCRIPCION_CARACTERES_F_KO': {
            message: 'Description has invalid characters',
            field: 'description'
        },
        'EMAIL_MIEMBRO_INVALIDO_F_KO': {
            message: 'Enter a valid email',
            field: 'email'
        },
        'LINK_MINIMO_F_KO': {
            message: 'Link must have at least 4 characters',
            field: 'link'
        },
        'LINK_MAXIMO_F_KO': {
            message: 'Link must have at most 254 characters',
            field: 'link'
        },
        'LINK_INVALIDO_F_KO': {
            message: 'Link has an invalid format',
            field: 'link'
        },
        'IMAGEN_FORMATO_F_KO': {
            message: 'Only images in format: jpeg, jpg, png, gif, svg, webp, avif, ico are allowed',
            field: 'image'
        },
        'IMAGEN_TAMAÑO_F_KO': {
            message: 'Image must not exceed 10MB',
            field: 'image'
        },
        'MIEMBRO_NO_ENCONTRADO_A_KO': {
            message: 'Member not found',
            field: 'all'
        },

        // FORMATION
        'ERROR_CREATING_FORMATION': {
            message: 'Error creating formation',
            field: 'all'
        },
        'ERROR_UPDATING_FORMATION': {
            message: 'Error updating formation',
            field: 'all'
        },
        'ERROR_DELETING_FORMATION': {
            message: 'Error deleting formation',
            field: 'all'
        },
        'TITULO_FORMACION_MINIMO_F_KO': {
            message: 'Formation title must have at least 4 characters',
            field: 'title'
        },
        'TITULO_FORMACION_MAXIMO_F_KO': {
            message: 'Formation title must have at most 254 characters',
            field: 'title'
        },
        'TITULO_FORMACION_CARACTERES_F_KO': {
            message: 'Formation title has invalid characters',
            field: 'title'
        },
        'ANHO_INICIO_INVALIDO_F_KO': {
            message: 'Year must be a positive number',
            field: 'date'
        },
        'ANHO_INICIO_MINIMO_F_KO': {
            message: 'Year must be equal or greater than 1900',
            field: 'date'
        },
        'ANHO_INICIO_MAXIMO_F_KO': {
            message: 'Year must be equal or less than 3000',
            field: 'date'
        },
        'ANHO_FIN_INVALIDO_F_KO': {
            message: 'Year must be a positive number',
            field: 'date'
        },
        'ANHO_FIN_MINIMO_F_KO': {
            message: 'Year must be equal or greater than 1900',
            field: 'date'
        },
        'ANHO_FIN_MAXIMO_F_KO': {
            message: 'Year must be equal or less than 3000',
            field: 'date'
        },
        'ANHO_FIN_MENOR_INICIO_F_KO': {
            message: 'End year cannot be less than start year',
            field: 'date'
        },
        'TIPO_F_KO': {
            message: 'Invalid type',
            field: 'type'
        },
        'ITEM_FORMACION_NO_ENCONTRADO_A_KO': {
            message: 'Formation item not found',
            field: 'all'
        },

        // DIVULGATION
        'TITULO_MINIMO_F_KO': {
            message: 'Title must have at least 4 characters',
            field: 'title'
        },
        'TITULO_MAXIMO_F_KO': {
            message: 'Title must have at most 254 characters',
            field: 'title'
        },
        'TITULO_CARACTERES_F_KO': {
            message: 'Title has invalid characters',
            field: 'title'
        },
        'CAMPO_PAGINA_DETALLE_INCOMPATIBLE_CON_TIPO_LINK_EXTERNO_F_KO': {
            message: 'Content field is incompatible with external link type',
            field: 'type'
        },
        'CAMPO_FICHERO_INCOMPATIBLE_CON_TIPO_LINK_EXTERNO_F_KO': {
            message: 'File field is incompatible with external link type',
            field: 'type'
        },
        'FICHERO_TAMAÑO_F_KO': {
            message: 'File must not exceed 1GB',
            field: 'file'
        },
        'CAMPO_LINK_EXTERNO_INCOMPATIBLE_CON_TIPO_FICHERO_INTERNO_F_KO': {
            message: 'External link field is incompatible with internal file type',
            field: 'type'
        },
        'CAMPO_PAGINA_DETALLE_INCOMPATIBLE_CON_TIPO_FICHERO_INTERNO_F_KO': {
            message: 'Content field is incompatible with internal file type',
            field: 'type'
        },
        'FICHERO_OBLIGATORIO_F_KO': {
            message: 'File is required',
            field: 'file'
        },
        'PAGINA_DETALLE_MINIMO_F_KO': {
            message: 'Content must have at least 4 characters',
            field: 'content'
        },
        'PAGINA_DETALLE_MAXIMO_F_KO': {
            message: 'Content must have at most 65534 characters',
            field: 'content'
        },
        'ERROR_CREATING_DIVULGATION': {
            message: 'Error creating divulgation',
            field: 'all'
        },
        'ERROR_UPDATING_DIVULGATION': {
            message: 'Error updating divulgation',
            field: 'all'
        },
        'ERROR_DELETING_DIVULGATION': {
            message: 'Error deleting divulgation',
            field: 'all'
        },
    },
    gl: {
        'SERVER_ERROR': 'Erro do servidor',
        'ERROR_UNABLE_TO_FETCH_USERS': 'Non se puideron obter os usuarios',
        'ERROR_UNABLE_TO_FETCH_USER': 'Non se puido obter o usuario',
        'ERROR_UNABLE_TO_FETCH_ROLES': 'Non se puideron obter os roles',
        'ERROR_UNABLE_TO_FETCH_MEMBERS': 'Non se puideron obter os membros',

        // GLOBAL
        'COMPLETE_ALL_FIELDS': {
            message: 'Por favor, encha todos os campos',
            field: 'all'
        },
        'INTERNAL_SERVER_ERROR_KO': {
            message: 'Erro do servidor',
            field: 'all'
        },

        // PERMISSIONS
        'FORBIDDEN_ACCESS_KO': {
            message: 'Acceso prohibido',
            field: 'all'
        },
        'AUTHENTICATION_REQUIRED_KO': {
            message: 'Autenticación requerida',
            field: 'all'
        },
        'AUTHENTICATION_INVALID_KO': {
            message: 'Autenticación inválida',
            field: 'all'
        },
        'AUTHENTICATION_TYPE_NOT_SUPPORTED_KO': {
            message: 'Tipo de autenticación non soportado',
            field: 'all'
        },

        // AUTH
        'ERROR_LOGIN': {
            message: 'Erro ao iniciar sesión',
            field: 'all'
        },
        'USER_CREDENTIALS_INVALID_KO': {
            message: 'Usuario ou contrasinal incorrectos',
            field: 'all'
        },
        'NOMBRE_USUARIO_MINIMO_F_KO': {
            message: 'O nome de usuario debe ter polo menos 4 caracteres',
            field: 'username'
        },
        'NOMBRE_USUARIO_MAXIMO_F_KO': {
            message: 'O nome de usuario debe ter como máximo 254 caracteres',
            field: 'username'
        },
        'NOMBRE_USUARIO_CARACTERES_F_KO': {
            message: 'O nome de usuario ten caracteres inválidos',
            field: 'username'
        },
        'CONTRASENHA_MINIMO_F_KO': {
            message: 'A contrasinal debe ter polo menos 4 caracteres',
            field: 'password'
        },
        'CONTRASENHA_MAXIMO_F_KO': {
            message: 'A contrasinal debe ter como máximo 254 caracteres',
            field: 'password'
        },
        'CONTRASENHA_CARACTERES_F_KO': {
            message: 'A contrasinal ten caracteres inválidos',
            field: 'password'
        },

        // USER
        'ERROR_CREATING_USER': {
            message: 'Erro ao crear o usuario',
            field: 'all'
        },
        'ERROR_UPDATING_USER': {
            message: 'Erro ao actualizar o usuario',
            field: 'all'
        },
        'ERROR_DELETING_USER': {
            message: 'Erro ao eliminar o usuario',
            field: 'all'
        },
        'ID_MINIMO_F_KO': {
            message: 'O id debe maior que 0',
            field: 'all'
        },
        'ID_INVALIDO_F_KO': {
            message: 'O id é inválido',
            field: 'all'
        },
        'NOMBRE_COMPLETO_MINIMO_F_KO': {
            message: 'O nome debe ter polo menos 4 caracteres',
            field: 'name'
        },
        'NOMBRE_COMPLETO_MAXIMO_F_KO': {
            message: 'O nome debe ter como máximo 254 caracteres',
            field: 'name'
        },
        'NOMBRE_COMPLETO_CARACTERES_F_KO': {
            message: 'O nome ten caracteres inválidos',
            field: 'name'
        },
        'ROL_F_KO': {
            message: 'Rol inválido',
            field: 'role'
        },
        'CONTRASENHA_NO_COINCIDE_F_KO': {
            message: 'As contrasinais non coinciden',
            field: 'confirm-password'
        },
        'NOMBRE_USUARIO_YA_EXISTE_A_KO': {
            message: 'O nome de usuario xa existe',
            field: 'username'
        },
        'USUARIO_NO_ENCONTRADO_A_KO': {
            message: 'Usuario non atopado',
            field: 'all'
        },

        //CONTACT FORM
        'ERROR_SENDING_EMAIL': {
            message: 'Erro ao enviar o correo',
            field: 'all'
        },
        'NOMBRE_EMISOR_MINIMO_F_KO': {
            message: 'O nome do emisor debe ter polo menos 4 caracteres',
            field: 'name'
        },
        'NOMBRE_EMISOR_MAXIMO_F_KO': {
            message: 'O nome do emisor debe ter como máximo 254 caracteres',
            field: 'name'
        },
        'NOMBRE_EMISOR_CARACTERES_F_KO': {
            message: 'O nome do emisor ten caracteres inválidos',
            field: 'name'
        },
        'EMAIL_EMISOR_INVALIDO_F_KO': {
            message: 'Introduza un correo válido',
            field: 'email'
        },
        'ASUNTO_MINIMO_F_KO': {
            message: 'O asunto debe ter polo menos 4 caracteres',
            field: 'subject'
        },
        'ASUNTO_MAXIMO_F_KO': {
            message: 'O asunto debe ter como máximo 50 caracteres',
            field: 'subject'
        },
        'ASUNTO_CARACTERES_F_KO': {
            message: 'O asunto ten caracteres inválidos',
            field: 'subject'
        },
        'MENSAJE_MINIMO_F_KO': {
            message: 'A mensaxe debe ter polo menos 10 caracteres',
            field: 'message'
        },
        'MENSAJE_MAXIMO_F_KO': {
            message: 'A mensaxe debe ter como máximo 5000 caracteres',
            field: 'message'
        },
        'MENSAJE_CARACTERES_F_KO': {
            message: 'A mensaxe ten caracteres inválidos',
            field: 'message'
        },

        // MEMBER
        'ERROR_CREATING_MEMBER': {
            message: 'Erro ao crear o membro',
            field: 'all'
        },
        'ERROR_UPDATING_MEMBER': {
            message: 'Erro ao actualizar o membro',
            field: 'all'
        },
        'ERROR_DELETING_MEMBER': {
            message: 'Erro ao eliminar o membro',
            field: 'all'
        },
        'NOMBRE_MIEMBRO_MINIMO_F_KO': {
            message: 'O nome do membro debe ter polo menos 4 caracteres',
            field: 'name'
        },
        'NOMBRE_MIEMBRO_MAXIMO_F_KO': {
            message: 'O nome do membro debe ter como máximo 254 caracteres',
            field: 'name'
        },
        'NOMBRE_MIEMBRO_CARACTERES_F_KO': {
            message: 'O nome do membro ten caracteres inválidos',
            field: 'name'
        },
        'DESCRIPCION_MINIMO_F_KO': {
            message: 'A descrición debe ter polo menos 10 caracteres',
            field: 'description'
        },
        'DESCRIPCION_MAXIMO_F_KO': {
            message: 'A descrición debe ter como máximo 1000 caracteres',
            field: 'description'
        },
        'DESCRIPCION_CARACTERES_F_KO': {
            message: 'A descrición ten caracteres inválidos',
            field: 'description'
        },
        'EMAIL_MIEMBRO_INVALIDO_F_KO': {
            message: 'Introduza un correo válido',
            field: 'email'
        },
        'LINK_MINIMO_F_KO': {
            message: 'O enlace debe ter polo menos 4 caracteres',
            field: 'link'
        },
        'LINK_MAXIMO_F_KO': {
            message: 'O enlace debe ter como máximo 254 caracteres',
            field: 'link'
        },
        'LINK_INVALIDO_F_KO': {
            message: 'O enlace ten un formato inválido',
            field: 'link'
        },
        'IMAGEN_FORMATO_F_KO': {
            message: 'Só se admiten imaxes en formato: jpeg, jpg, png, gif, svg, webp, avif, ico',
            field: 'image'
        },
        'IMAGEN_TAMAÑO_F_KO': {
            message: 'A imaxe non debe superar os 10MB',
            field: 'image'
        },
        'MIEMBRO_NO_ENCONTRADO_A_KO': {
            message: 'Membro non atopado',
            field: 'all'
        },

        // FORMATION
        'ERROR_CREATING_FORMATION': {
            message: 'Erro ao crear a formación',
            field: 'all'
        },
        'ERROR_UPDATING_FORMATION': {
            message: 'Erro ao actualizar a formación',
            field: 'all'
        },
        'ERROR_DELETING_FORMATION': {
            message: 'Erro ao eliminar a formación',
            field: 'all'
        },
        'TITULO_FORMACION_MINIMO_F_KO': {
            message: 'O título da formación debe ter polo menos 4 caracteres',
            field: 'title'
        },
        'TITULO_FORMACION_MAXIMO_F_KO': {
            message: 'O título da formación debe ter como máximo 254 caracteres',
            field: 'title'
        },
        'TITULO_FORMACION_CARACTERES_F_KO': {
            message: 'O título da formación ten caracteres inválidos',
            field: 'title'
        },
        'ANHO_INICIO_INVALIDO_F_KO': {
            message: 'O ano debe ser un número positivo',
            field: 'date'
        },
        'ANHO_INICIO_MINIMO_F_KO': {
            message: 'O ano debe ser igual ou maior que 1900',
            field: 'date'
        },
        'ANHO_INICIO_MAXIMO_F_KO': {
            message: 'O ano debe ser igual ou menor que 3000',
            field: 'date'
        },
        'ANHO_FIN_INVALIDO_F_KO': {
            message: 'O ano debe ser un número positivo',
            field: 'date'
        },
        'ANHO_FIN_MINIMO_F_KO': {
            message: 'O ano debe ser igual ou maior que 1900',
            field: 'date'
        },
        'ANHO_FIN_MAXIMO_F_KO': {
            message: 'O ano debe ser igual ou menor que 3000',
            field: 'date'
        },
        'ANHO_FIN_MENOR_INICIO_F_KO': {
            message: 'O ano de fin non pode ser menor que o de inicio',
            field: 'date'
        },
        'TIPO_F_KO': {
            message: 'Tipo inválido',
            field: 'type'
        },
        'ITEM_FORMACION_NO_ENCONTRADO_A_KO': {
            message: 'Elemento de formación non atopado',
            field: 'all'
        },

        // DIVULGATION
        'TITULO_MINIMO_F_KO': {
            message: 'O título debe ter polo menos 4 caracteres',
            field: 'title'
        },
        'TITULO_MAXIMO_F_KO': {
            message: 'O título debe ter como máximo 254 caracteres',
            field: 'title'
        },
        'TITULO_CARACTERES_F_KO': {
            message: 'O título ten caracteres inválidos',
            field: 'title'
        },
        'CAMPO_PAGINA_DETALLE_INCOMPATIBLE_CON_TIPO_LINK_EXTERNO_F_KO': {
            message: 'O campo de páxina detalle é incompatible co tipo de divulgación de enlace externo',
            field: 'type'
        },
        'CAMPO_FICHERO_INCOMPATIBLE_CON_TIPO_LINK_EXTERNO_F_KO': {
            message: 'O campo de ficheiro é incompatible co tipo de divulgación de enlace externo',
            field: 'type'
        },
        'FICHERO_TAMAÑO_F_KO': {
            message: 'O ficheiro non debe superar os 1GB',
            field: 'file'
        },
        'CAMPO_LINK_EXTERNO_INCOMPATIBLE_CON_TIPO_FICHERO_INTERNO_F_KO': {
            message: 'O campo de enlace externo é incompatible co tipo de divulgación de ficheiro interno',
            field: 'type'
        },
        'CAMPO_PAGINA_DETALLE_INCOMPATIBLE_CON_TIPO_FICHERO_INTERNO_F_KO': {
            message: 'O campo de páxina detalle é incompatible co tipo de divulgación de ficheiro interno',
            field: 'type'
        },
        'FICHERO_OBLIGATORIO_F_KO': {
            message: 'O ficheiro é obrigatorio',
            field: 'file'
        },
        'PAGINA_DETALLE_MINIMO_F_KO': {
            message: 'A páxina detalle debe ter polo menos 4 caracteres',
            field: 'content'
        },
        'PAGINA_DETALLE_MAXIMO_F_KO': {
            message: 'A páxina detalle debe ter como máximo 65534 caracteres',
            field: 'content'
        },
        'ERROR_CREATING_DIVULGATION': {
            message: 'Erro ao crear a divulgación',
            field: 'all'
        },
        'ERROR_UPDATING_DIVULGATION': {
            message: 'Erro ao actualizar a divulgación',
            field: 'all'
        },
        'ERROR_DELETING_DIVULGATION': {
            message: 'Erro ao eliminar a divulgación',
            field: 'all'
        },
    },
};