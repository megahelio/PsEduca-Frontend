import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";
import { validateMemberResponse } from "../validators/member.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getMembers() {
    // TODO: connect to the server

    // If the query is successful, return the users
    // Otherwise, return an error message

    /* const EXAMPLE_MEMBERS = [
        { id: 1, name: 'alice', email: 'alice@gmail.com', description: 'Doctora en Psicopedagogía. Profesora en la Universidad de Vigo, Departamento de Psicología Evolutiva y Comunicación, área de Psicología de la Educación y miembro del Grupo de Investigación HI9-GiPEDUvi. Desde 2009 su investigación se centra en la evaluación e intervención de los trastornos del aprendizaje y del desarrollo en niños y niñas en edad escolar. Desde 2011, en colaboración con las Universidades de Minho y Évora (Portugal), estudia y analiza variables personales y contextuales relacionadas con el éxito y abandono académico en estudiantes universitarios de primer año.',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 2, name: 'bob', email: 'bob@gmail.com', description: 'Bob Johnson', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 3, name: 'charlie', email: 'charlie@gmail.com', description: 'Charlie Brown', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 4, name: 'david', email: 'david@gmail.com', description: 'David Lee', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 5, name: 'eva', email: 'eva@gmail.com', description: 'Eva Green', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
    ];

    return EXAMPLE_MEMBERS; */

    const response = await fetch(`${SERVER_URL}?controller=member&action=list`, {
        method: 'POST'
    });

    if(!response.ok){
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }

    const { ok, code, resource } = await response.json();

    if(!ok){
        return {
            error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error' //TODO: map error codes to form fields
        }
    }

    return resource.map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        description: member.description,
        link: member.referenceURL,
        image: member.imageURL
    }));
}

export async function getMemberById(id) {
    const formData = new FormData();
    formData.append('id', id);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=get`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if(!response.ok){
            return {
                error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
            }
        }

        const { ok, code, resource } = await response.json();

        if(!ok){
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error' //TODO: map error codes to form fields
            }
        }

        return {
            id: resource.id,
            name: resource.name,
            email: resource.email,
            description: resource.description,
            link: resource.referenceURL,
            image: resource.imageURL
        }
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function createMember({ name, email, link, description, image }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('referenceURL', link);
    formData.append('image', image.file);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=add`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateMemberResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_CREATING_MEMBER'] || 'Error'
        }
    }
}

export async function updateMember({ id, name, email, link, description, image }) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('referenceURL', link);
    formData.append('image', image.file);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=edit`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateMemberResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_UPDATING_MEMBER'] || 'Error'
        }
    }
}

export async function deleteMember(id) {
    const formData = new FormData();
    formData.append('id', id);

    try{
        const response = await fetch(`${SERVER_URL}?controller=member&action=delete`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { ok, code, resource } = await response.json();

        if(!ok){
            return validateMemberResponse({ok, code, resource});
        }

        return {}
    }catch(error){
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_DELETING_MEMBER'] || 'Error'
        }
    }
}