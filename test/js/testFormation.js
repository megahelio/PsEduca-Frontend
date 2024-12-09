import { validateFormation } from '../../validators/formation.js'; // Asegúrate de importar la función correctamente
import { createTestValidationFunction } from './testValidationFunction.js';

let testValidationFunction = createTestValidationFunction('table-test-formation');
let value_to_test = '';

// Título
value_to_test = '';
const emptyTitle = validateFormation({ title: value_to_test, type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Título vacío', value_to_test, true, Boolean(emptyTitle['title']));

value_to_test = 'a';
const shortTitle = validateFormation({ title: value_to_test, type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Título muy corto (< 4)', value_to_test, true, Boolean(shortTitle['title']));

value_to_test = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque Aenean massa. Cum sociis natoque';
const longTitle = validateFormation({ title: value_to_test, type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Título muy largo (> 254)', value_to_test, true, Boolean(longTitle['title']));

value_to_test = 'Título válido';
const validTitle = validateFormation({ title: value_to_test, type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Título válido', value_to_test, false, Boolean(validTitle['title']));

// Descripción
value_to_test = 'a';
const shortDescription = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: value_to_test, startYear: '2020' });
testValidationFunction('Descripción muy corta (< 4)', value_to_test, true, Boolean(shortDescription['description']));

value_to_test = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoqueLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque';
const longDescription = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: value_to_test, startYear: '2020' });
testValidationFunction('Descripción muy larga (> 1000)', value_to_test, true, Boolean(longDescription['description']));

value_to_test = 'Descripción válida';
const validDescription = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: value_to_test, startYear: '2020' });
testValidationFunction('Descripción válida', value_to_test, false, Boolean(validDescription['description']));

// Link
value_to_test = '';
const emptyLink = validateFormation({ title: 'Título válido', type: 'MASTER', link: value_to_test, description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Link vacío', value_to_test, true, Boolean(emptyLink['link']));

value_to_test = 'a';
const shortLink = validateFormation({ title: 'Título válido', type: 'MASTER', link: value_to_test, description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Link muy corto (< 4)', value_to_test, true, Boolean(shortLink['link']));

value_to_test = 'https://example.com';
const validLink = validateFormation({ title: 'Título válido', type: 'MASTER', link: value_to_test, description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Link válido', value_to_test, false, Boolean(validLink['link']));

// Start Year
value_to_test = '202';
const shortStartYear = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: value_to_test });
testValidationFunction('Año de inicio demasiado corto', value_to_test, true, Boolean(shortStartYear['date']));

value_to_test = '1899';
const startYearTooLow = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: value_to_test });
testValidationFunction('Año de inicio demasiado bajo', value_to_test, true, Boolean(startYearTooLow['date']));

value_to_test = '2023';
const validStartYear = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: value_to_test });
testValidationFunction('Año de inicio válido', value_to_test, false, Boolean(validStartYear['date']));

// End Year
value_to_test = '202';
const shortEndYear = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020', endYear: value_to_test });
testValidationFunction('Año de fin demasiado corto', value_to_test, true, Boolean(shortEndYear['date']));

value_to_test = '2025';
const validEndYear = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020', endYear: value_to_test });
testValidationFunction('Año de fin válido', value_to_test, false, Boolean(validEndYear['date']));

value_to_test = '2019';
const endYearBeforeStart = validateFormation({ title: 'Título válido', type: 'MASTER', link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020', endYear: value_to_test });
testValidationFunction('Año de fin antes del inicio', value_to_test, true, Boolean(endYearBeforeStart['date']));

// Type
value_to_test = 'LICENCIATURA';
const invalidType = validateFormation({ title: 'Título válido', type: value_to_test, link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Tipo no válido', value_to_test, true, Boolean(invalidType['type']));

value_to_test = 'MASTER';
const validType = validateFormation({ title: 'Título válido', type: value_to_test, link: 'https://example.com', description: 'Descripción de prueba', startYear: '2020' });
testValidationFunction('Tipo válido', value_to_test, false, Boolean(validType['type']));
