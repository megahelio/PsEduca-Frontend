import { ERROR_MESSAGES } from "../lang/errorMessages.js";
import config from "../config.js";

const pageLanguage = sessionStorage.getItem('language') || 'es';
const SERVER_URL = config.SERVER_URL;

export async function getMembers() {
    // TODO: connect to the server

    // If the query is successful, return the users
    // Otherwise, return an error message

    const EXAMPLE_MEMBERS = [
        { id: 1, nombre: 'alice', email: 'alice@gmail.com', descripcion: 'Doctora en Psicopedagogía. Profesora en la Universidad de Vigo, Departamento de Psicología Evolutiva y Comunicación, área de Psicología de la Educación y miembro del Grupo de Investigación HI9-GiPEDUvi. Desde 2009 su investigación se centra en la evaluación e intervención de los trastornos del aprendizaje y del desarrollo en niños y niñas en edad escolar. Desde 2011, en colaboración con las Universidades de Minho y Évora (Portugal), estudia y analiza variables personales y contextuales relacionadas con el éxito y abandono académico en estudiantes universitarios de primer año.', linkAportaciones: 'http://127.0.0.1:5500/admin/members/index.html', imagen: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 2, nombre: 'bob', email: 'bob@gmail.com', descripcion: 'Bob Johnson', linkAportaciones: 'http://127.0.0.1:5500/admin/members/index.html', imagen: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 3, nombre: 'charlie', email: 'charlie@gmail.com', descripcion: 'Charlie Brown', linkAportaciones: 'http://127.0.0.1:5500/admin/members/index.html', imagen: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 4, nombre: 'david', email: 'david@gmail.com', descripcion: 'David Lee', linkAportaciones: 'http://127.0.0.1:5500/admin/members/index.html', imagen: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
        { id: 5, nombre: 'eva', email: 'eva@gmail.com', descripcion: 'Eva Green', linkAportaciones: 'http://127.0.0.1:5500/admin/members/index.html', imagen: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/chill-guy-memes-have-flooded-social-media-241142208-1x1.jpg' },
    ];

    const ERROR_FLAG = false;
    if (ERROR_FLAG) {
        const response = {
            error: 'ERROR_UNABLE_TO_FETCH_MEMBERS'
        }

        return {
            error: ERROR_MESSAGES[pageLanguage][response.error] || 'Error'
        };
    }
    return EXAMPLE_MEMBERS;
}