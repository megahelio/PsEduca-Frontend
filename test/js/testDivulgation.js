import { validateDivulgation } from '../../validators/divulgation.js'
import { createTestValidationFunction } from './testValidationFunction.js';

// Validación de divulgación
let testValidationFunction = createTestValidationFunction('table-test-divulgation');

let value_to_test = {};

// Test de campo 'title' vacío
value_to_test = { id: '1', title: '', description: 'Descripción válida.', type: 'LINK_EXTERNO', content: 'Contenido válido.', link: 'http://valid.link', image: 'valid_image.jpg', file: 'valid_file.pdf' };
let emptyTitle = validateDivulgation(value_to_test);
testValidationFunction('Campo "title" vacío', value_to_test.title, true, Boolean(emptyTitle.title));

// Test de campo 'description' vacío
value_to_test = { id: '1', title: 'Título válido', description: '', type: 'LINK_EXTERNO', content: 'Contenido válido.', link: 'http://valid.link', image: 'valid_image.jpg', file: 'valid_file.pdf' };
let emptyDescription = validateDivulgation(value_to_test);
testValidationFunction('Campo "description" vacío', value_to_test.description, true, Boolean(emptyDescription.description));

// Test de campo 'type' vacío
value_to_test = { id: '1', title: 'Título válido', description: 'Descripción válida.', type: '', content: 'Contenido válido.', link: 'http://valid.link', image: 'valid_image.jpg', file: 'valid_file.pdf' };
let emptyType = validateDivulgation(value_to_test);
testValidationFunction('Campo "type" vacío', value_to_test.type, true, Boolean(emptyType.type));

// Test de campo 'content' vacío para tipo PAGINA_INTERNA
value_to_test = { id: '1', title: 'Título válido', description: 'Descripción válida.', type: 'PAGINA_INTERNA', content: '', link: 'http://valid.link', image: 'valid_image.jpg', file: 'valid_file.pdf' };
let emptyContent = validateDivulgation(value_to_test);
testValidationFunction('Campo "content" vacío para tipo PAGINA_INTERNA', value_to_test.content, true, Boolean(emptyContent.content));

// Test de campo 'link' vacío para tipo LINK_EXTERNO
value_to_test = { id: '1', title: 'Título válido', description: 'Descripción válida.', type: 'LINK_EXTERNO', content: 'Contenido válido.', link: '', image: 'valid_image.jpg', file: 'valid_file.pdf' };
let emptyLink = validateDivulgation(value_to_test);
testValidationFunction('Campo "link" vacío para tipo LINK_EXTERNO', value_to_test.link, true, Boolean(emptyLink.link));

// Test de fichero obligatorio para tipo FICHERO_INTERNO
value_to_test.type = 'FICHERO_INTERNO';
value_to_test.file = { file: null };
let missingFile = validateDivulgation(value_to_test);
testValidationFunction('Fichero obligatorio para tipo FICHERO_INTERNO', value_to_test.file.file, true, Boolean(missingFile.file));

// Test de título muy corto
value_to_test.title = 'abc';
let shortTitle = validateDivulgation(value_to_test);
testValidationFunction('Título muy corto (< 4)', value_to_test.title, true, Boolean(shortTitle.title));

// Test de título muy largo
value_to_test.title = 'a'.repeat(255);
let longTitle = validateDivulgation(value_to_test);
testValidationFunction('Título muy largo (> 254)', value_to_test.title, true, Boolean(longTitle.title));

// Test de título con caracteres inválidos
value_to_test.title = 'Invalid@Title!';
let invalidCharsTitle = validateDivulgation(value_to_test);
testValidationFunction('Título con caracteres inválidos', value_to_test.title, true, Boolean(invalidCharsTitle.title));

// Test de título válido
value_to_test.title = 'Título Válido';
let validTitle = validateDivulgation(value_to_test);
testValidationFunction('Título válido', value_to_test.title, false, Boolean(validTitle.title));

// Test de descripción muy corta
value_to_test.description = 'abc';
let shortDescription = validateDivulgation(value_to_test);
testValidationFunction('Descripción muy corta (< 4)', value_to_test.description, true, Boolean(shortDescription.description));

// Test de descripción muy larga
value_to_test.description = 'a'.repeat(1001);
let longDescription = validateDivulgation(value_to_test);
testValidationFunction('Descripción muy larga (> 1000)', value_to_test.description, true, Boolean(longDescription.description));

// Test de descripción válida
value_to_test.description = 'Descripción válida.';
let validDescription = validateDivulgation(value_to_test);
testValidationFunction('Descripción válida', value_to_test.description, false, Boolean(validDescription.description));

// Test de link demasiado corto para tipo LINK_EXTERNO
value_to_test.type = 'LINK_EXTERNO';
value_to_test.link = 'abc';
let shortLink = validateDivulgation(value_to_test);
testValidationFunction('Link muy corto (< 4)', value_to_test.link, true, Boolean(shortLink.link));

// Test de link demasiado largo para tipo LINK_EXTERNO
value_to_test.link = 'a'.repeat(255);
let longLink = validateDivulgation(value_to_test);
testValidationFunction('Link muy largo (> 254)', value_to_test.link, true, Boolean(longLink.link));

// Test de tipo inválido
value_to_test.type = 'TIPO_INVALIDO';
let invalidType = validateDivulgation(value_to_test);
testValidationFunction('Tipo inválido', value_to_test.type, true, Boolean(invalidType.type));

// Test de contenido demasiado corto para tipo PAGINA_INTERNA
value_to_test.type = 'PAGINA_INTERNA';
value_to_test.content = 'abc';
let shortContent = validateDivulgation(value_to_test);
testValidationFunction('Contenido muy corto (< 4) para tipo PAGINA_INTERNA', value_to_test.content, true, Boolean(shortContent.content));

// Test de contenido demasiado largo para tipo PAGINA_INTERNA
value_to_test.content = 'a'.repeat(65535);
let longContent = validateDivulgation(value_to_test);
testValidationFunction('Contenido muy largo (> 65534) para tipo PAGINA_INTERNA', value_to_test.content, true, Boolean(longContent.content));

// Test de contenido válido para tipo PAGINA_INTERNA
value_to_test.content = 'Contenido válido.';
let validContent = validateDivulgation(value_to_test);
testValidationFunction('Contenido válido para tipo PAGINA_INTERNA', value_to_test.content, false, Boolean(validContent.content));
