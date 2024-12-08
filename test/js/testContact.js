import { validateEmail } from '../../validators/contact.js';
import { createTestValidationFunction } from './testValidationFunction.js';

//TEST CONTACT
let testValidationFunction = createTestValidationFunction('table-test-contact')
var value_to_test = '';
const emptyName = validateEmail({ name: value_to_test, email: 'email@email.com', subject: 'Test subject', message: 'Message test' });
testValidationFunction('Nombre vacío', value_to_test, true, Boolean(emptyName.all));

value_to_test = 'a';
const shortName = validateEmail({ name: value_to_test, email: 'email@email.com', subject: 'Test subject', message: 'Message test' });
testValidationFunction('Nombre muy corto (< 4)', value_to_test, true, Boolean(shortName.name));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.`;
const longName = validateEmail({ name: value_to_test, email: 'email@email.com', subject: 'Test subject', message: 'Message test' });
testValidationFunction('Nombre muy largo (> 254)', value_to_test, true, Boolean(longName.name));

value_to_test = 'Name123@';
const badCharactersName = validateEmail({ name: value_to_test, email: 'email@email.com', subject: 'Test subject', message: 'Message test' });
testValidationFunction('Nombre con caracteres no permitidos (p.e: @)', value_to_test, true, Boolean(badCharactersName.name));

value_to_test = 'Name';
const validName = validateEmail({ name: value_to_test, email: 'email@email.com', subject: 'Test subject', message: 'Message test' });
testValidationFunction('Nombre válido', value_to_test, false, Boolean(validName.name));

value_to_test = '';
const emptyEmail = validateEmail({ name: 'Name', email: value_to_test, subject: 'Test subject', message: 'Message test' });
testValidationFunction('Email vacío', value_to_test, true, Boolean(emptyEmail.all));

value_to_test = 'email.com';
const invalidEmail = validateEmail({ name: 'Name', email: value_to_test, subject: 'Test subject', message: 'Message test' });
testValidationFunction('Email inválido (p.e: email.com)', value_to_test, true, Boolean(invalidEmail.email));

value_to_test = 'email@email.com';
const validEmail = validateEmail({ name: 'Name', email: value_to_test, subject: 'Test subject', message: 'Message test' });
testValidationFunction('Email válido', value_to_test, false, Boolean(validEmail.email));

value_to_test = '';
const emptySubject = validateEmail({ name: 'Name', email: 'email@email.com', subject: value_to_test, message: 'Message test' });
testValidationFunction('Asunto vacío', value_to_test, true, Boolean(emptySubject.all));

value_to_test = 'a';
const shortSubject = validateEmail({ name: 'Name', email: 'email@email.com', subject: value_to_test, message: 'Message test' });
testValidationFunction('Asunto muy corto (< 4)', value_to_test, true, Boolean(shortSubject.subject));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque`;
const longSubject = validateEmail({ name: 'Name', email: 'email@email.com', subject: value_to_test, message: 'Message test' });
testValidationFunction('Asunto muy largo (> 50)', value_to_test, true, Boolean(longSubject.subject));

value_to_test = 'Test subject';
const validSubject = validateEmail({ name: 'Name', email: 'email@email.com', subject: value_to_test, message: 'Message test' });
testValidationFunction('Asunto válido', value_to_test, false, Boolean(validSubject.subject));

value_to_test = '';
const emptyMessage = validateEmail({ name: 'Name', email: 'email@email.com', subject: 'Test subject', message: value_to_test });
testValidationFunction('Mensaje vacío', value_to_test, true, Boolean(emptyMessage.all));

value_to_test = 'a';
const shortMessage = validateEmail({ name: 'Name', email: 'email@email.com', subject: 'Test subject', message: value_to_test });
testValidationFunction('Mensaje muy corto (< 10)', value_to_test, true, Boolean(shortMessage.message));

value_to_test = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoquepenatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.`; // Truncated for brevity
const longMessage = validateEmail({ name: 'Name', email: 'email@email.com', subject: 'Test subject', message: value_to_test });
testValidationFunction('Mensaje muy largo (> 5000)', value_to_test, true, Boolean(longMessage.message));

value_to_test = 'Message test';
const validMessage = validateEmail({ name: 'Name', email: 'email@email.com', subject: 'Test subject', message: value_to_test });
testValidationFunction('Mensaje válido', value_to_test, false, Boolean(validMessage.message));