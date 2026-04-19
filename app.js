// ========================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ========================================

// Array que almacena todas las tareas en memoria
// Cada tarea es un objeto con: id, texto, completada, fecha
let tareas = [];

// Variable para controlar qué filtro está activo ('todas', 'pendientes', 'completadas')
let filtroActivo = 'todas';

// ========================================
// FUNCIONES PARA MANIPULAR TAREAS
// ========================================

/**
 * Agrega una nueva tarea al array 'tareas'
 * @param {string} textoTarea - El texto descriptivo de la tarea
 */
function agregarTarea(textoTarea) {
    // Validación: si el texto está vacío o es solo espacios, no hacer nada
    if (textoTarea.trim() === '') {
        alert('⚠️ Por favor escribe una tarea antes de agregar');
        return; // Salir de la función sin agregar nada
    }

    // Crear el objeto de la nueva tarea
    const nuevaTarea = {
        id: Date.now(),                    // ID único basado en timestamp (milisegundos desde 1970)
        texto: textoTarea.trim(),          // .trim() elimina espacios al inicio/final
        completada: false,                 // Nueva tarea siempre empieza como pendiente
        fecha: new Date().toISOString()    // Fecha en formato ISO: "2025-04-13T14:30:00.000Z"
    };

    // Agregar la nueva tarea al array
    tareas.push(nuevaTarea);

    // Renderizar las tareas en pantalla
    renderizarTareas();
}

// ========================================
// EVENT LISTENERS
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Obtener referencias a los elementos HTML
    const inputNuevaTarea = document.getElementById('inputNuevaTarea');
    const btnAgregar = document.getElementById('btnAgregar');

    // Evento: al hacer clic en el botón "Agregar"
    btnAgregar.addEventListener('click', function () {
        const texto = inputNuevaTarea.value;  // Obtener el texto del input
        agregarTarea(texto);                  // Llamar a la función
        inputNuevaTarea.value = '';           // Limpiar el input
        inputNuevaTarea.focus();              // Devolver el foco al input para seguir escribiendo
    });

    // Evento: al presionar Enter en el input
    inputNuevaTarea.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            btnAgregar.click();  // Simular clic en el botón
        }
    });

});

/**
 * Renderiza todas las tareas en el DOM
 * Lee el array 'tareas' y genera HTML para cada una
 */
function renderizarTareas() {
    const contenedor = document.getElementById('contenedorTareas');

    // Filtrar tareas según el filtro activo
    let tareasFiltradas = tareas;

    if (filtroActivo === 'pendientes') {
        tareasFiltradas = tareas.filter(t => t.completada === false);
    } else if (filtroActivo === 'completadas') {
        tareasFiltradas = tareas.filter(t => t.completada === true);
    }
    // Si filtroActivo === 'todas', no filtramos (mostramos todas)

    // Limpiar el contenedor antes de renderizar
    contenedor.innerHTML = '';

    // Si no hay tareas para mostrar, mostrar mensaje
    if (tareasFiltradas.length === 0) {
        contenedor.innerHTML = `
            <p class="text-center text-muted mt-5">
                No hay tareas para mostrar 🤷‍♂️
            </p>
        `;
        return;
    }

    // Generar HTML para cada tarea
    tareasFiltradas.forEach(function (tarea) {

        // Determinar clases CSS según el estado
        const claseCompletada = tarea.completada ? 'text-decoration-line-through text-muted' : '';
        const checkedAttr = tarea.completada ? 'checked' : '';

        // Crear el HTML de la tarea
        const tareaHTML = `
            <div class="card mb-2 shadow-sm">
                <div class="card-body d-flex align-items-center">
                    <!-- Checkbox para marcar como completada -->
                    <input 
                        type="checkbox" 
                        class="form-check-input me-3" 
                        ${checkedAttr}
                        onchange="toggleCompletada(${tarea.id})"
                    >
                    
                    <!-- Texto de la tarea -->
                    <span class="flex-grow-1 ${claseCompletada}">
                        ${tarea.texto}
                    </span>
                    
                    <!-- Botón de eliminar -->
                    <button 
                        class="btn btn-danger btn-sm ms-2" 
                        onclick="eliminarTarea(${tarea.id})"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        `;

        // Agregar el HTML al contenedor
        contenedor.innerHTML += tareaHTML;
    });

    // Actualizar contador
    actualizarContador();
};

/**
 * Actualiza los números del contador de tareas
 */

function actualizarContador() {
    const totalTareas = tareas.length;
    const tareasPendientes = tareas.filter(t => t.completada === false).length;

    document.getElementById('contadorTotales').textContent = totalTareas;
    document.getElementById('contadorPendientes').textContent = tareasPendientes;
}