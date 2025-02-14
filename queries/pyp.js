import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getPyp() {
    const formData = new FormData();
    formData.append('controller', 'pypItem');
    formData.append('action', 'list');

    const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }

    const { ok, code, resource } = await response.json();

    if (!ok) {
        return {
            error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
        }
    }

    return resource.map(pyp => ({
        id: pyp.id,
        name: pyp.title,
        description: pyp.description,
        link: pyp.externalURL,
        image: SERVER_URL + pyp.imageURL
    }));
}

export async function getPypById(id) {
    const formData = new FormData();
    formData.append('controller', 'pypItem');
    formData.append('action', 'get');
    formData.append('id', id);

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
            }
        }

        const { ok, code, resource } = await response.json();

        if (!ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
            }
        }

        return {
            id: resource.id,
            name: resource.title,
            description: resource.description,
            link: resource.externalURL,
            image: SERVER_URL + resource.imageURL
        }
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function getPypAuth() {
    const formData = new FormData();
    formData.append('controller', 'pypAuth');
    formData.append('action', 'list');

    const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }

    const { ok, code, resource } = await response.json();

    if (!ok) {
        return {
            error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
        }
    }

    const {currentPyPAuthorizations, otherPyPItems, otherUsers} = resource;
    const ALL_USERS = otherUsers.concat(currentPyPAuthorizations.map(auth => {
        return {
            idUser: auth.idUser,
            userName: auth.userName
        }
    }).filter((value, index, self) => {
        return self.findIndex(user => user.idUser === value.idUser) === index;
    }));

    const ALL_PYP = otherPyPItems.concat(currentPyPAuthorizations.map(auth => {
        return {
            idPyPItem: auth.idPyPItem,
            titlePyPItem: auth.titlePyPItem
        }
    }).filter((value, index, self) => {
        return self.findIndex(pyp => pyp.idPyPItem === value.idPyPItem) === index;
    }));

    return {
        currentPyPAuthorizations,
        ALL_USERS,
        ALL_PYP
    };
}

export async function addPypAuth({ idUser, idPyPItem }) {
    const formData = new FormData();
    formData.append('controller', 'pypAuth');
    formData.append('action', 'add');
    formData.append('idUser', idUser);
    formData.append('idPyPItem', idPyPItem);

    try {
        const response = await fetch(SERVER_URL, {
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

        const { ok, code } = await response.json();

        if (!ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
            }
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function deletePypAuth({ idUser, idPyPItem }) {
    const formData = new FormData();
    formData.append('controller', 'pypAuth');
    formData.append('action', 'delete');
    formData.append('idUser', idUser);
    formData.append('idPyPItem', idPyPItem);

    try {
        const response = await fetch(SERVER_URL, {
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

        const { ok, code } = await response.json();

        if (!ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
            }
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function createPyp({ name, description, link, image }) {
    const formData = new FormData();
    formData.append('controller', 'pypItem');
    formData.append('action', 'add');
    formData.append('title', name);
    formData.append('description', description);
    formData.append('externalURL', link);
    formData.append('image', image.file);

    try {
        const response = await fetch(SERVER_URL, {
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

        const { ok, code } = await response.json();

        if (!ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
            }
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['ERROR_CREATING_PYP'] || 'Error'
        }
    }
}

export async function updatePyp({ id, name, description, link, image }) {
    const formData = new FormData();
    formData.append('controller', 'pypItem');
    formData.append('action', 'edit');
    formData.append('id', id);
    formData.append('title', name);
    formData.append('description', description);
    formData.append('externalURL', link);
    formData.append('image', image.file);

    try {
        const response = await fetch(SERVER_URL, {
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

        const { ok, code } = await response.json();

        if (!ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
            }
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function deletePyp(id) {
    const formData = new FormData();
    formData.append('controller', 'pypItem');
    formData.append('action', 'delete');
    formData.append('id', id);

    try {
        const response = await fetch(SERVER_URL, {
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

        const { ok, code } = await response.json();

        if (!ok) {
            return {
                error: ERROR_MESSAGES[pageLanguage][code[0]] || 'Error'
            }
        }

        return {}
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}