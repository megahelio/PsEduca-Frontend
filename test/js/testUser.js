import { validateUser } from '../../validators/user.js';
import { createTestValidationFunction } from './testValidationFunction.js';

//TEST USER
let testValidationFunction = createTestValidationFunction('table-test-user')

let isUpdate = false;
var value_to_test = '';
const emptyUserName = validateUser({ username: value_to_test, fullname: 'Test Johnson', password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre vacío', value_to_test, true, Boolean(emptyUserName.all));

value_to_test = 'a';
const shortUserName = validateUser({ username: value_to_test, fullname: 'Test Johnson', password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre muy corto (< 4)', value_to_test, true, Boolean(shortUserName.username));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque`;
const longUserName = validateUser({ username: value_to_test, fullname: 'Test Johnson', password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre muy largo (> 254)', value_to_test, true, Boolean(longUserName.username));

value_to_test = 'Test';
const validUserName = validateUser({ username: value_to_test, fullname: 'Test Johnson', password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre válido', value_to_test, false, Boolean(validUserName.username));

value_to_test = '';
const emptyFullName = validateUser({ username: 'Test', fullname: value_to_test, password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre completo vacío', value_to_test, true, Boolean(emptyFullName.all));

value_to_test = 'a';
const shortFullName = validateUser({ username: 'Test', fullname: value_to_test, password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre completo muy corto (< 4)', value_to_test, true, Boolean(shortFullName.name));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque`;
const longFullName = validateUser({ username: 'Test', fullname: value_to_test, password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre completo muy largo (> 254)', value_to_test, true, Boolean(longFullName.name));

value_to_test = 'Test Johnson';
const validFullName = validateUser({ username: 'Test', fullname: value_to_test, password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Nombre completo válido', value_to_test, false, Boolean(validFullName.name));

value_to_test = 'a';
const shortPasswordUser = validateUser({ username: 'Test', fullname: 'Test Johnson', password: value_to_test, confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Contraseña muy corta (< 8)', value_to_test, true, Boolean(shortPasswordUser.password));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque`;
const longPasswordUser = validateUser({ username: 'Test', fullname: 'Test Johnson', password: value_to_test, confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('Contraseña muy larga (> 254)', value_to_test, true, Boolean(longPasswordUser.password));

value_to_test = 'testPassword';
const validPasswordUser = validateUser({ username: 'Test', fullname: 'Test Johnson', password: value_to_test, confirmPassword: value_to_test }, isUpdate);
testValidationFunction('Contraseña válida', value_to_test, false, Boolean(validPasswordUser.password));

value_to_test = 'testPassword2';
const differentPasswords = validateUser({ username: 'Test', fullname: 'Test Johnson', password: 'testPassword', confirmPassword: value_to_test }, isUpdate);
testValidationFunction('Contraseñas diferentes', value_to_test, true, Boolean(differentPasswords['confirm-password']));

isUpdate = true;

value_to_test = '';
const emptyId = validateUser({ id: value_to_test, username: 'Test', fullname: 'Test Johnson', password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('ID vacío', value_to_test, true, Boolean(emptyId.all));

value_to_test = '#';
const validNaNId = validateUser({ id: value_to_test, username: 'Test', fullname: 'Test Johnson', password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('ID no numérico', value_to_test, true, Boolean(validNaNId.all));

value_to_test = '1';
const validId = validateUser({ id: value_to_test, username: 'Test', fullname: 'Test Johnson', password: 'testPassword', confirmPassword: 'testPassword' }, isUpdate);
testValidationFunction('ID válido', value_to_test, false, Boolean(validId.all));