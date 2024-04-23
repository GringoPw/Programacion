const fs = require('fs');
const path = require('path');

let memoria = {};
const memoriaFilePath = path.join(__dirname, 'memoria.json');

const memoriaKey = 'memoria';

function cargarMemoria() {
    try {
        if (fs.existsSync(memoriaFilePath)) {
            memoria = JSON.parse(fs.readFileSync(memoriaFilePath, 'utf8'));
        } else {
            memoria = {};
            guardarMemoria();
        }
    } catch (error) {
        console.error('Error al cargar la memoria:', error);
    }
}

function guardarMemoria() {
    try {
        fs.writeFileSync(memoriaFilePath, JSON.stringify(memoria, null, 2));
    } catch (error) {
        console.error('Error al guardar la memoria:', error);
    }
}


function registrarCaso(sintomas, diagnostico) {
    const clave = sintomas.join('-');
    memoria[clave] = diagnostico;
    guardarMemoria();
}

function obtenerDiagnostico(sintomas) {
    const clave = sintomas.join('-');
    const probabilidad = memoria[clave];
    if (probabilidad !== undefined) {
        if (probabilidad > 0.5) {
            return 'Probabilidad alta de tener dengue, te recomendamos consultar a un médico';
        } else {
            return 'Probabilidad baja de tener dengue, te recomendamos consultar a un médico';
        }
    } else {
        return 'No se puede determinar con certeza, te recomendamos consultar a un médico';
    }
}



// Ejemplo de uso
function diagnosticar() {
    const fiebre = document.getElementById('fiebre').checked ? 0.8 : 0;
    const dolorCabeza = document.getElementById('dolorCabeza').checked ? 0.8 : 0;
    const dolorMuscular = document.getElementById('dolorMuscular').checked ? 0.8 : 0;
    const nauseas = document.getElementById('nauseas').checked ? 0.8 : 0;
    const cansancio = document.getElementById('cansancio').checked ? 0.8 : 0;
    const sarpullidos = document.getElementById('sarpullidos').checked ? 0.8 : 0;
    const vomitos = document.getElementById('vomitos').checked ? 0.8 : 0;
    const malestarGen = document.getElementById('malestarGen').checked ? 0.8 : 0;
    
    const sintomas = [fiebre, dolorCabeza, dolorMuscular, nauseas, cansancio, sarpullidos, malestarGen, vomitos];
    
    ajustarProbabilidades(); // Ajustamos las probabilidades antes de cada diagnóstico
    
    const diagnostico = obtenerDiagnostico(sintomas);
    alert(diagnostico);
}

// Cargar la memoria al inicio
cargarMemoria();




// Función para ajustar las probabilidades en función de los casos anteriores
function ajustarProbabilidades() {
    const casos = Object.values(memoria);
    const totalCasos = casos.length;
    const probabilidades = {};
    
    // Calcular la frecuencia de aparición de cada síntoma
    casos.forEach(caso => {
        caso.split('-').forEach(sintoma => {
            probabilidades[sintoma] = (probabilidades[sintoma] || 0) + 1;
        });
    });

    // Normalizar las probabilidades
    Object.keys(probabilidades).forEach(sintoma => {
        probabilidades[sintoma] /= totalCasos;
    });

    // Actualizar los pesos de los síntomas
    Object.keys(probabilidades).forEach(sintoma => {
        if (probabilidades[sintoma] > 0.5) {
            // Aumentar el peso si el síntoma es frecuente en los casos de dengue
            switch (sintoma) {
                case 'fiebre':
                    // Aumentar el peso de fiebre en un 20%
                    probabilidades[sintoma] += 0.2;
                    break;
                case 'dolorCabeza':
                    // Aumentar el peso de dolor de cabeza en un 10%
                    probabilidades[sintoma] += 0.1;
                    break;
                case 'dolorMuscular':
                    // Aumentar el peso de dolor muscular en un 5%
                    probabilidades[sintoma] += 0.05;
                    break;
                case 'nauseas':
                    // Aumentar el peso de náuseas en un 5%
                    probabilidades[sintoma] += 0.05;
                    break;
                case 'cansancio':
                    // Aumentar el peso de cansancio en un 5%
                    probabilidades[sintoma] += 0.05;
                    break;
                case 'sarpullidos':
                    // Aumentar el peso de sarpullidos en un 5%
                    probabilidades[sintoma] += 0.05;
                    break;
                case 'vomitos':
                    // Aumentar el peso de vómitos en un 5%
                    probabilidades[sintoma] += 0.05;
                    break;
                case 'malestarGen':
                    // Aumentar el peso de malestar general en un 5%
                    probabilidades[sintoma] += 0.05;
                    break;
                default:
                    break;
            }
            
        }
    });

    // Guardar los pesos actualizados en algún lugar
    // Por ejemplo, puedes almacenarlos en un objeto o en localStorage
    localStorage.setItem('pesos', JSON.stringify(probabilidades));
}
