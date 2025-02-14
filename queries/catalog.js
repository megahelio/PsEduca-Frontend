import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getCatalog() {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
    formData.append('action', 'list');

    const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: formData
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

    return resource.map(resource => ({
        id: resource.id,
        acronym: resource.acronym,
        name: resource.name,
        edadAnhoMin: resource.yearMinAge,
        edadMesMin: resource.monthMinAge,
        edadAnhoMax: resource.yearMaxAge,
        edadMesMax: resource.monthMaxAge,
        image: SERVER_URL + resource.imageURL,
        authors: resource.authors,
        time: resource.time,
        description: resource.description,
        observations: resource.note,
        files: resource.files.map(file => ({
            id: file.id,
            link: SERVER_URL + file.uri,
            name: file.name
        })),
        relatedDocuments: resource.links.map(link => ({
            id: link.id,
            link: link.url,
            name: link.name
        })),
        area: resource.areas,
        tags: resource.tags,
        resourceType: resource.resourceTypes,
        format: resource.formats,
        application: resource.applicationModes,
    }));
}

export async function getCatalogById(id) {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
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
            acronym: resource.acronym,
            name: resource.name,
            edadAnhoMin: resource.yearMinAge,
            edadMesMin: resource.monthMinAge,
            edadAnhoMax: resource.yearMaxAge,
            edadMesMax: resource.monthMaxAge,
            image: SERVER_URL + resource.imageURL,
            authors: resource.authors,
            time: resource.time,
            description: resource.description,
            observations: resource.note,
            files: resource.files.map(file => ({
                id: file.id,
                link: SERVER_URL + file.uri,
                name: file.name
            })),
            relatedDocuments: resource.links.map(link => ({
                id: link.id,
                link: link.url,
                name: link.name
            })),
            area: resource.areas,
            tags: resource.tags,
            resourceType: resource.resourceTypes,
            format: resource.formats,
            application: resource.applicationModes,
        }
    } catch (error) {
        return {
            error: ERROR_MESSAGES[pageLanguage]['SERVER_ERROR'] || 'Error'
        }
    }
}

export async function addCatalog({ acronym, name, edadAnhoMin, edadMesMin, edadAnhoMax, edadMesMax, image, authors, time, description, observations, area, tags, resourceType, format, application }) {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
    formData.append('action', 'add');
    formData.append('acronym', acronym);
    formData.append('name', name);
    formData.append('yearMinAge', edadAnhoMin);
    formData.append('monthMinAge', edadMesMin);
    formData.append('yearMaxAge', edadAnhoMax);
    formData.append('monthMaxAge', edadMesMax);
    formData.append('image', image);
    formData.append('authors', authors);
    formData.append('time', time);
    formData.append('description', description);
    formData.append('note', observations);
    formData.append('areas', area);
    formData.append('tags', tags);
    formData.append('resourceTypes', resourceType);
    formData.append('formats', format);
    formData.append('applicationModes', application);

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

export async function editCatalog({ id, acronym, name, edadAnhoMin, edadMesMin, edadAnhoMax, edadMesMax, image, authors, time, description, observations, area, tags, resourceType, format, application, links }) {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
    formData.append('action', 'edit');
    formData.append('id', id);
    formData.append('acronym', acronym);
    formData.append('name', name);
    formData.append('yearMinAge', edadAnhoMin);
    formData.append('monthMinAge', edadMesMin);
    formData.append('yearMaxAge', edadAnhoMax);
    formData.append('monthMaxAge', edadMesMax);
    formData.append('image', image);
    formData.append('authors', authors);
    formData.append('time', time);
    formData.append('description', description);
    formData.append('note', observations);
    formData.append('areas', area);
    formData.append('tags', tags);
    formData.append('resourceTypes', resourceType);
    formData.append('formats', format);
    formData.append('applicationModes', application);

    try {
        links.forEach(link => {
            const formDataLink = new FormData();
            formDataLink.append('controller', 'catalogue');
            formDataLink.append('action', 'addLink');
            formDataLink.append('catalogueItemId', id);
            formDataLink.append('name', link.name);
            formDataLink.append('link', link.link);

            fetch(SERVER_URL, {
                method: 'POST',
                body: formDataLink,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
        });

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

export async function uploadFile({ name, file, idResource }) {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
    formData.append('action', 'addFile');
    formData.append('file', file);
    formData.append('name', name);
    formData.append('catalogueItemId', idResource);

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

export async function deleteFile({ fileId, idResource }) {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
    formData.append('action', 'deleteFile');
    formData.append('fileId', fileId);
    formData.append('catalogueItemId', idResource);

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

export async function addLink({ name, link, idResource }) {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
    formData.append('action', 'addLink');
    formData.append('name', name);
    formData.append('link', link);
    formData.append('catalogueItemId', idResource);

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

export async function deleteLink({ linkId, idResource }) {
    const formData = new FormData();
    formData.append('controller', 'catalogue');
    formData.append('action', 'deleteLink');
    formData.append('linkId', linkId);
    formData.append('catalogueItemId', idResource);

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