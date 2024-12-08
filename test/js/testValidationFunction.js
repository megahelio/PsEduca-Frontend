export function testValidationFunction(test, value_to_test, expected, result, tableId) {
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
    cell1.innerHTML = test;
    cell2.innerHTML = value_to_test;
    cell3.innerHTML = expected;
    cell4.innerHTML = result;

    if (expected === result) {
        cell4.style.backgroundColor = '#00AF0055';
    } else {
        cell4.style.backgroundColor = 'red';
    }
}
export function createTestValidationFunction(tableId) {
    return function (test, value_to_test, expected, result) {
        // Obtén la tabla por el ID proporcionado
        let table = document.getElementById(tableId);

        // Verifica si la tabla existe
        if (!table) {
            console.error(`Tabla con ID "${tableId}" no encontrada.`);
            return;
        }

        // Crea una nueva fila en la tabla
        const row = table.insertRow(-1);

        // Inserta celdas en la fila
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        // Llena las celdas con los valores proporcionados
        cell1.innerHTML = test;
        cell2.innerHTML = value_to_test;
        cell3.innerHTML = expected;
        cell4.innerHTML = result;

        // Cambia el color de fondo basado en el resultado
        if (expected === result) {
            cell4.style.backgroundColor = '#00AF0055'; // Verde claro
        } else {
            cell4.style.backgroundColor = 'red'; // Rojo
        }
    };
}
