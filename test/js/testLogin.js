import { validateLogin } from '../../validators/user.js';
import { createTestValidationFunction } from './testValidationFunction.js';

// LOG IN VALIDATION
let testValidationFunction = createTestValidationFunction('table-test-login');
var value_to_test = '';
const emptyUsername = validateLogin({ username: value_to_test, password: 'password' });
testValidationFunction('Usuario vacío', value_to_test, true, Boolean(emptyUsername.all));

value_to_test = 'a';
const shortUsername = validateLogin({ username: value_to_test, password: 'password' });
testValidationFunction('Usuario muy corto (< 4)', value_to_test, true, Boolean(shortUsername.username));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque`;
const longUsername = validateLogin({ username: value_to_test, password: 'password' });
testValidationFunction('Usuario muy largo (> 254)', value_to_test, true, Boolean(longUsername.username));

value_to_test = 'Username';
const validUsername = validateLogin({ username: value_to_test, password: 'password' });
testValidationFunction('Usuario válido', value_to_test, false, Boolean(validUsername.username));

value_to_test = '';
const emptyPassword = validateLogin({ username: 'Username', password: value_to_test });
testValidationFunction('Contraseña vacía', value_to_test, true, Boolean(emptyPassword.all));

value_to_test = 'a';
const shortPassword = validateLogin({ username: 'Username', password: value_to_test });
testValidationFunction('Contraseña muy corta (< 8)', value_to_test, true, Boolean(shortPassword.password));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque`;
const longPassword = validateLogin({ username: 'Username', password: value_to_test });
testValidationFunction('Contraseña muy larga (> 254)', value_to_test, true, Boolean(longPassword.password));

value_to_test = 'password';
const validPassword = validateLogin({ username: 'Username', password: value_to_test });
testValidationFunction('Contraseña válida', value_to_test, false, Boolean(validPassword.password));