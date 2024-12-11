import { validateMember } from '../../validators/member.js';
import { createTestValidationFunction } from './testValidationFunction.js';

// Validación de miembro
let testValidationFunction = createTestValidationFunction('table-test-member');

let value_to_test = '';
const emptyName = validateMember({ id: '', name: value_to_test, email: 'test@example.com', link: '', description: '', image: '' });
testValidationFunction('Nombre vacío', value_to_test, true, Boolean(emptyName.name));

value_to_test = 'abc';
const shortName = validateMember({ id: '', name: value_to_test, email: 'test@example.com', link: '', description: '', image: '' });
testValidationFunction('Nombre muy corto (< 4)', value_to_test, true, Boolean(shortName.name));

value_to_test = 'a'.repeat(255);
const longName = validateMember({ id: '', name: value_to_test, email: 'test@example.com', link: '', description: '', image: '' });
testValidationFunction('Nombre muy largo (> 254)', value_to_test, true, Boolean(longName.name));

value_to_test = 'Invalid@Name!';
const invalidCharsName = validateMember({ id: '', name: value_to_test, email: 'test@example.com', link: '', description: '', image: '' });
testValidationFunction('Nombre con caracteres inválidos', value_to_test, true, Boolean(invalidCharsName.name));

value_to_test = 'John Doe';
const validName = validateMember({ id: '', name: value_to_test, email: 'test@example.com', link: '', description: '', image: '' });
testValidationFunction('Nombre válido', value_to_test, false, Boolean(validName.name));

value_to_test = 'invalid_email';
const invalidEmail = validateMember({ id: '', name: 'John Doe', email: value_to_test, link: '', description: '', image: '' });
testValidationFunction('Email inválido', value_to_test, true, Boolean(invalidEmail.email));

value_to_test = 'a'.repeat(255) + '@example.com';
const longEmail = validateMember({ id: '', name: 'John Doe', email: value_to_test, link: '', description: '', image: '' });
testValidationFunction('Email muy largo (> 254)', value_to_test, true, Boolean(longEmail.email));

value_to_test = 'test@example.com';
const validEmail = validateMember({ id: '', name: 'John Doe', email: value_to_test, link: '', description: '', image: '' });
testValidationFunction('Email válido', value_to_test, false, Boolean(validEmail.email));

value_to_test = 'invalid_link';
const invalidLink = validateMember({ id: '', name: 'John Doe', email: 'test@example.com', link: value_to_test, description: '', image: '' });
testValidationFunction('Link inválido', value_to_test, true, Boolean(invalidLink.link));

value_to_test = 'https://example.com';
const validLink = validateMember({ id: '', name: 'John Doe', email: 'test@example.com', link: value_to_test, description: '', image: '' });
testValidationFunction('Link válido', value_to_test, false, Boolean(validLink.link));

value_to_test = 'abc';
const shortDescription = validateMember({ id: '', name: 'John Doe', email: 'test@example.com', link: '', description: value_to_test, image: '' });
testValidationFunction('Descripción muy corta (< 4)', value_to_test, true, Boolean(shortDescription.description));

value_to_test = 'a'.repeat(1001);
const longDescription = validateMember({ id: '', name: 'John Doe', email: 'test@example.com', link: '', description: value_to_test, image: '' });
testValidationFunction('Descripción muy larga (> 1000)', value_to_test, true, Boolean(longDescription.description));

value_to_test = 'This is a valid description.';
const validDescription = validateMember({ id: '', name: 'John Doe', email: 'test@example.com', link: '', description: value_to_test, image: '' });
testValidationFunction('Descripción válida', value_to_test, false, Boolean(validDescription.description));
