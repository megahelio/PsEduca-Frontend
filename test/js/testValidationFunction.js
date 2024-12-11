export function createTestValidationFunction(tableId) {
    return function (test, value_to_test, expected, result) {

        let table = document.getElementById(tableId);

        if (!table) {
            console.error(`Tabla con ID "${tableId}" no encontrada.`);
            return;
        }

        const row = table.insertRow(-1);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        // Llena las celdas con los valores proporcionados
        cell1.innerHTML = test;
        cell2.innerHTML = value_to_test;
        cell3.innerHTML = expected;
        cell4.innerHTML = result;

        cell3.classList.add('center-text')
        cell4.classList.add('center-text')

        if (expected === result) {
            cell4.style.backgroundColor = '#00AF0055'; // Verde claro
        } else {
            cell4.style.backgroundColor = 'red';
        }
    };
}
