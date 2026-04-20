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

    guardarTareas();
    // Renderizar las tareas en pantalla
    renderizarTareas();
}

// ========================================
// EVENT LISTENERS
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Cargar tareas guardadas al iniciar
    cargarTareas();

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

    // Event listeners para filtros

    const btnFiltroTodas = document.getElementById('filtroTodas');
    const btnFiltroPendientes = document.getElementById('filtroPendientes');
    const btnFiltroCompletadas = document.getElementById('filtroCompletadas');

    btnFiltroTodas.addEventListener('click', function () {
        filtroActivo = 'todas';
        renderizarTareas();
        actualizarEstilosFiltros();
    });

    btnFiltroPendientes.addEventListener('click', function () {
        filtroActivo = 'pendientes';
        renderizarTareas();
        actualizarEstilosFiltros();
    });

    btnFiltroCompletadas.addEventListener('click', function () {
        filtroActivo = 'completadas';
        renderizarTareas();
        actualizarEstilosFiltros();
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

/**
 * Guarda el array completo de tareas en localStorage
 * Convierte el array JavaScript a un string JSON
 */

function guardarTareas() {
    // Convertir el array de objetos a un string JSON
    const tareasJSON = JSON.stringify(tareas);

    // Guardar en localStorage con la clave 'taskmaster_tareas'
    localStorage.setItem('taskmaster_tareas', tareasJSON);
    console.log('💾 Tareas guardadas en localStorage');
}

/**
 * Carga las tareas guardadas en localStorage al iniciar la app
 * Convierte el string JSON de vuelta a un array JavaScript
 */

function cargarTareas() {
    // Intentar leer las tareas guardadas
    const tareasGuardadas = localStorage.getItem('taskmaster_tareas');

    //Verificar si hay algo guardado
    if (tareasGuardadas) {
        // Convertir el string JSON de vuelta a un array JavaScript
        tareas = JSON.parse(tareasGuardadas);
        console.log('📥 Tareas cargadas desde localStorage:', tareas);
    } else {
        // Si no hay nada guardado (primera vez usando la app)
        tareas = [];
        console.log('ℹ️ No hay tareas guardadas. Iniciando con array vacío.');
    }
    // Renderizar las tareas cargadas
    renderizarTareas();
    actualizarEstilosFiltros();
}

/**
 * Cambia el estado de una tarea entre completada y pendiente
 * @param {number} id - El ID de la tarea a modificar
 */

function toggleCompletada(id) {
    // Buscar la tarea en el array por su ID
    const tarea = tareas.find(t => t.id === id);

    // Si no se encuentra (caso raro), salir
    if (!tarea) {
        console.error('❌ No se encontró tarea con ID:', id);
        return;
    }
    // Invertir el estado (true → false, false → true)
    tarea.completada = !tarea.completada;

    console.log(`✅ Tarea ${id} ahora está: ${tarea.completada ? 'COMPLETADA' : 'PENDIENTE'}`);

    // Guardar en localStorage y re-renderizar
    guardarTareas();
    renderizarTareas();
}

/**
 * Elimina una tarea del array y de localStorage
 * @param {number} id - El ID de la tarea a eliminar
 */

function eliminarTarea(id) {
    // Buscar la tarea para mostrar su texto en la confirmación
    const tarea = tareas.find(t => t.id === id);

    // Pedir confirmación al usuario
    const confirmar = confirm(`¿Estás seguro de eliminar: "${tarea.texto}"?`);

    // Si el usuario cancela, salir sin hacer nada
    if (!confirmar) {
        return;
    }

    // Filtrar el array para remover la tarea con ese ID
    tareas = tareas.filter(t => t.id !== id);

    console.log('🗑️ Tarea eliminada. Tareas restantes:', tareas.length);

    // Guardar en localStorage y re-renderizar
    guardarTareas();
    renderizarTareas();
};

/**
 * Actualiza los estilos visuales de los botones de filtro
 * El botón activo se ve destacado
 */

function actualizarEstilosFiltros() {
    //Obtener los tres botones

    const btnTodas = document.getElementById('filtroTodas');
    const btnPendientes = document.getElementById('filtroPendientes');
    const btnCompletadas = document.getElementById('filtroCompletadas');

    // Remover la clase 'active' de todos (reset)
    btnTodas.classList.remove('active');
    btnPendientes.classList.remove('active');
    btnCompletadas.classList.remove('active');

    // Agregar 'active' al botón correspondiente

    if (filtroActivo === 'todas') {
        btnTodas.classList.add('active');
    } else if (filtroActivo === 'pendientes') {
        btnPendientes.classList.add('active');
    } else if (filtroActivo === 'completadas') {
        btnCompletadas.classList.add('active');
    }
}