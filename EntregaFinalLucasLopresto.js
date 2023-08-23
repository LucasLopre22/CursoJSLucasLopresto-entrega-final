let operaciones = [];

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const btnClear = document.getElementById('btn-clear');
    const btnCalculate = document.getElementById('btn-calculate');
    const btnHistorico = document.getElementById('btn-historico');

    const btnNumbers = document.querySelectorAll('button:not(#btn-calculate):not(#btn-clear):not(#btn-historico)');
    btnNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            appendToDisplay(btn.textContent);
        });
    });

    btnCalculate.addEventListener('click', function() {
        calculate();
    });

    btnClear.addEventListener('click', function() {
        clearDisplay();
    });

    btnHistorico.addEventListener('click', function() {
        mostrarHistorico();
    });

    // Cargar el historial de operaciones desde el localStorage al iniciar el programa
    const storedOperaciones = localStorage.getItem('historialOperaciones');
    if (storedOperaciones) {
        operaciones = JSON.parse(storedOperaciones);
    }
});

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const expression = document.getElementById('display').value;
        const result = eval(expression);
        document.getElementById('display').value = result;

        // Almacenar la operación realizada en el array 'operaciones' y en localStorage
        operaciones.push({ expresion: expression, resultado: result });
        guardarHistorialEnLocalStorage();
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function mostrarHistorico() {
    const historicoTable = document.getElementById('historico');

    historicoTable.innerHTML = '<tr><th>Operación</th><th>Resultado</th></tr>';

    operaciones.forEach(op => {
        const newRow = historicoTable.insertRow();
        const exprCell = newRow.insertCell(0);
        const resultCell = newRow.insertCell(1);
        exprCell.textContent = op.expresion;
        resultCell.textContent = op.resultado;
    });
}

// Función para guardar el historial en localStorage
function guardarHistorialEnLocalStorage() {
    localStorage.setItem('historialOperaciones', JSON.stringify(operaciones));
}