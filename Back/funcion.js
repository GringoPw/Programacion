function diagnosticar() {
    const fiebre = document.getElementById('fiebre').checked ? 0.8 : 0; // Probabilidad 0.8 si está seleccionado, 0 si no
    const dolorOjos = document.getElementById('dolorOjos').checked ? 0.8 : 0;
    const malestarGen = document.getElementById('malestarGen').checked ? 0.8 : 0;
    const dolorCabeza = document.getElementById('dolorCabeza').checked ? 0.8 : 0;
    const dolorMuscular = document.getElementById('dolorMuscular').checked ? 0.8 : 0;
    const dolorArticular = document.getElementById('dolorArticular').checked ? 0.8 : 0;
    const dolorHuesos = document.getElementById('dolorHuesos').checked ? 0.8 : 0;
    const nauseas = document.getElementById('nauseas').checked ? 0.8 : 0;
    const vomitos = document.getElementById('vomitos').checked ? 0.8 : 0;
    const cansancio = document.getElementById('cansancio').checked ? 0.8 : 0;
    const sarpullidos = document.getElementById('sarpullidos').checked ? 0.8 : 0;

    
    const pesoTotal = (fiebre + dolorCabeza + dolorMuscular + nauseas + cansancio + sarpullidos + malestarGen + vomitos + dolorOjos + dolorArticular + dolorHuesos) / 8; // Normalizamos dividiendo por la cantidad de síntomas
    const LimiteParaSerDengue = 0.6; // Un límite de 0.6 podría interpretarse como una probabilidad del 60%

    let diagnostico = `Probabilidad de tener dengue es de ${pesoTotal*100}%`;

    if (pesoTotal >= LimiteParaSerDengue) {
        diagnostico = `Alta probabilidad de tener dengue: ${pesoTotal*100}%`;
    }

    alert(diagnostico);
}
