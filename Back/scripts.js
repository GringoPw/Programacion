// llamo cundo se carga
window.onload = function () {
  cargarSintomas();
  cargarEnfermedades();
};

function cargarSintomas() {
  // Realizar la solicitud GET al servidor para obtener los síntomas de todas las enfermedades
  fetch("/sintomas")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los síntomas");
      }
      return response.json();
    })
    .then((data) => {
      // Llamar a la función para mostrar los síntomas en el frontend
      mostrarSintomas(data);
    })
    .catch((error) => {
      console.error("Error al cargar los síntomas:", error);
    });
}

// Lista para almacenar los IDs de los síntomas seleccionados
let sintomasSeleccionados = [];

function mostrarSintomas(sintomas) {
    // Limpiar el div donde se mostrarán los síntomas antes de agregar los nuevos síntomas
    const divSintomas = document.getElementById("todosLosSintomas");
    divSintomas.innerHTML = "";
    console.log(sintomas)
    // Recorrer la lista de síntomas y agregarlos al div de todos los síntomas
    sintomas.forEach((sintoma) => {
        const label = document.createElement("label");
        label.classList.add("flex", "items-center", "mb-2");

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "mr-2");
        input.setAttribute("value", sintoma.id); // Asignar el ID del síntoma al valor del checkbox

        // Agregar un event listener para capturar cuando se marque o desmarque el checkbox
        input.addEventListener("change", () => {
            if (input.checked) {
                // Si se marca el checkbox, agregar el ID del síntoma a la lista de seleccionados
                sintomasSeleccionados.push(sintoma.id);
            } else {
                // Si se desmarca el checkbox, eliminar el ID del síntoma de la lista de seleccionados
                sintomasSeleccionados = sintomasSeleccionados.filter(id => id !== sintoma.id);
            }
            console.log("Síntomas seleccionados:", sintomasSeleccionados);
        });

        label.appendChild(input);

        const text = document.createTextNode(sintoma.sintoma);
        label.appendChild(text);

        divSintomas.appendChild(label);
    });
}


////////////////////////NUEVOS SINTOMAS//////////////////////
function agregarSintoma() {
  console.log("esto se llama");
  const nuevoSintoma = document.getElementById("nuevoSintoma").value;
  

  // Objeto con los datos a enviar
  const data = {
    nuevoSintoma: nuevoSintoma,
  };

  // Realizar la solicitud POST al servidor
  fetch("/agregar-sintoma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al agregar el síntoma");
      }
      console.log(
        "Síntoma agregado"
      );
    })
    .catch((error) => {
      console.error("Error:");
    });
}
/////////////////////////////////////////SINTOMAS REL A UN ENFERMEDAD//////////////////
function agregarSintomasAEnfermedad(sintomas, enfermedadId) {
    sintomasSeleccionados = [];

    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        sintomasSeleccionados.push({
            id: checkbox.value,
        });
    });
    
    
    // Objeto con los datos a enviar
    const data = {
      sintomas: sintomasSeleccionados,
      enfermedadId: document.getElementById("enfermedad").value
    };
    
    
    // Realizar la solicitud POST al servidor
    fetch("/agregar-sintomas-a-enfermedad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al asociar los síntomas a la enfermedad");
        }
        console.log("Síntomas asociados correctamente a la enfermedad con ID:", enfermedadId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  

///////////////////////////////////////////CARGAR LAS enfermedades EN EL SELECT//////////////////////////////
function cargarEnfermedades() {
  fetch("/enfermedades")
    .then((response) => response.json())
    .then((enfermedades) => {
      const selectEnfermedad = document.getElementById("enfermedad");
      selectEnfermedad.innerHTML = "";

      enfermedades.forEach((enfermedad) => {
        const option = document.createElement("option");
        option.value = enfermedad.id; //ID COMO VALOR
        option.textContent = enfermedad.nombre; //NOMBRE L Q SE VE
        selectEnfermedad.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al cargar las enfermedades:", error);
    });
}

function agregarEnfermedad() {
  const nuevaEnfermedad = document.getElementById("nuevaEnfermedad").value;

  // Realizar la solicitud GET al servidor para agregar la nueva enfermedad
  fetch(`/agregar-enfermedad?nombre=${nuevaEnfermedad}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al agregar la enfermedad");
      }
      return response.text();
    })
    .then((message) => {
      console.log("Enfermedad agregada exitosamente:", message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function capturarSintomas() {
    // Capturar los síntomas seleccionados
    sintomasSeleccionados = [];

    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        sintomasSeleccionados.push({
            id: checkbox.value,
        });
    });

    // Hacer algo con los síntomas seleccionados, como enviarlos al servidor o mostrarlos en otra parte de la interfaz de usuario
    console.log("Síntomas seleccionados:", sintomasSeleccionados);

    // Aquí podrías llamar a una función para enviar los síntomas seleccionados al servidor
}


