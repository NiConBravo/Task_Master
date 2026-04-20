// ========================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ========================================

// Array que almacena todas las tareas en memoria
let tareas = [];

// Objeto para controlar filtros activos
let filtroActivo = {
    estado: 'todas',      // 'todas', 'pendientes', 'completadas'
    categoria: 'todas'    // 'todas', 'personal', 'trabajo', 'estudio'
};

// ========================================
// FUNCIONES PARA MANIPULAR TAREAS
// ========================================

/**
 * Agrega una nueva tarea al array 'tareas'
 * @param {string} textoTarea - El texto descriptivo de la tarea
 * @param {string} categoria - La categoría de la tarea (trabajo/personal/estudio)
 */
function agregarTarea(textoTarea, categoria = 'personal') {
    if (textoTarea.trim() === '') {
        alert('⚠️ Por favor escribe una tarea antes de agregar');
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        texto: textoTarea.trim(),
        completada: false,
        fecha: new Date().toISOString(),
        categoria: categoria
    };

    tareas.push(nuevaTarea);
    console.log('✅ Tarea agregada:', nuevaTarea);

    guardarTareas();
    renderizarTareas();
}

/**
 * Guarda el array completo de tareas en localStorage
 */
function guardarTareas() {
    const tareasJSON = JSON.stringify(tareas);
    localStorage.setItem('taskmaster_tareas', tareasJSON);
    console.log('💾 Tareas guardadas en localStorage');
}

/**
 * Carga las tareas guardadas en localStorage al iniciar la app
 */
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('taskmaster_tareas');

    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        console.log('📥 Tareas cargadas desde localStorage:', tareas);
    } else {
        tareas = [];
        console.log('ℹ️ No hay tareas guardadas. Iniciando con array vacío.');
    }

    renderizarTareas();
    actualizarEstilosFiltros();
}

/**
 * Renderiza todas las tareas en el DOM
 */
function renderizarTareas() {
    const contenedor = document.getElementById('contenedorTareas');

    // Aplicar AMBOS filtros (estado Y categoría)
    let tareasFiltradas = tareas;

    // Filtro por estado (completada/pendiente)
    if (filtroActivo.estado === 'pendientes') {
        tareasFiltradas = tareasFiltradas.filter(t => t.completada === false);
    } else if (filtroActivo.estado === 'completadas') {
        tareasFiltradas = tareasFiltradas.filter(t => t.completada === true);
    }

    // Filtro por categoría
    if (filtroActivo.categoria !== 'todas') {
        tareasFiltradas = tareasFiltradas.filter(t => t.categoria === filtroActivo.categoria);
    }

    // Limpiar el contenedor
    contenedor.innerHTML = '';

    // Si no hay tareas, mostrar mensaje
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
        const claseCompletada = tarea.completada ? 'text-decoration-line-through text-muted' : '';
        const checkedAttr = tarea.completada ? 'checked' : '';
        const claseCategoria = `categoria-${tarea.categoria || 'personal'}`;

        const emojis = {
            'personal': '🏠',
            'trabajo': '💼',
            'estudio': '📚'
        };
        const emojiCategoria = emojis[tarea.categoria] || '🏠';

        const tareaHTML = `
            <div class="card mb-2 shadow-sm tarea-card ${claseCategoria} ${tarea.completada ? 'tarea-completada' : ''}">
                <div class="card-body d-flex align-items-center">
                    <input 
                        type="checkbox" 
                        class="form-check-input me-2" 
                        ${checkedAttr}
                        onchange="toggleCompletada(${tarea.id})"
                    >
                    <span class="me-2">${emojiCategoria}</span>
                    <span class="flex-grow-1 ${claseCompletada}">
                        ${tarea.texto}
                    </span>
                    <button 
                        class="btn btn-danger btn-sm ms-2" 
                        onclick="eliminarTarea(${tarea.id})"
                        title="Eliminar tarea"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        `;

        contenedor.innerHTML += tareaHTML;
    });

    actualizarContador();
}

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
 * Cambia el estado de una tarea entre completada y pendiente
 * @param {number} id - El ID de la tarea a modificar
 */
function toggleCompletada(id) {
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        console.error('❌ No se encontró tarea con ID:', id);
        return;
    }

    tarea.completada = !tarea.completada;
    console.log(`✅ Tarea ${id} ahora está: ${tarea.completada ? 'COMPLETADA' : 'PENDIENTE'}`);

    guardarTareas();
    renderizarTareas();
}

/**
 * Elimina una tarea del array y de localStorage
 * @param {number} id - El ID de la tarea a eliminar
 */
function eliminarTarea(id) {
    const tarea = tareas.find(t => t.id === id);

    const confirmar = confirm(`¿Estás seguro de eliminar: "${tarea.texto}"?`);

    if (!confirmar) {
        return;
    }

    tareas = tareas.filter(t => t.id !== id);
    console.log('🗑️ Tarea eliminada. Tareas restantes:', tareas.length);

    guardarTareas();
    renderizarTareas();
}

/**
 * Actualiza los estilos visuales de los botones de filtro
 */
function actualizarEstilosFiltros() {
    // Botones de estado
    const btnTodas = document.getElementById('filtroTodas');
    const btnPendientes = document.getElementById('filtroPendientes');
    const btnCompletadas = document.getElementById('filtroCompletadas');

    // Remover clase active de filtros de estado
    btnTodas.classList.remove('active');
    btnPendientes.classList.remove('active');
    btnCompletadas.classList.remove('active');

    // Agregar active al botón de estado correspondiente
    if (filtroActivo.estado === 'todas') {
        btnTodas.classList.add('active');
    } else if (filtroActivo.estado === 'pendientes') {
        btnPendientes.classList.add('active');
    } else if (filtroActivo.estado === 'completadas') {
        btnCompletadas.classList.add('active');
    }

    // Botones de categoría (solo si existen en el HTML)
    const btnPersonal = document.getElementById('filtroPersonal');
    const btnTrabajo = document.getElementById('filtroTrabajo');
    const btnEstudio = document.getElementById('filtroEstudio');

    if (btnPersonal && btnTrabajo && btnEstudio) {
        btnPersonal.classList.remove('active');
        btnTrabajo.classList.remove('active');
        btnEstudio.classList.remove('active');

        if (filtroActivo.categoria === 'personal') {
            btnPersonal.classList.add('active');
        } else if (filtroActivo.categoria === 'trabajo') {
            btnTrabajo.classList.add('active');
        } else if (filtroActivo.categoria === 'estudio') {
            btnEstudio.classList.add('active');
        }
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    cargarTareas();

    // Referencias a elementos
    const inputNuevaTarea = document.getElementById('inputNuevaTarea');
    const selectCategoria = document.getElementById('selectCategoria');
    const btnAgregar = document.getElementById('btnAgregar');

    // Agregar tarea
    btnAgregar.addEventListener('click', function () {
        const texto = inputNuevaTarea.value;
        const categoria = selectCategoria.value;

        agregarTarea(texto, categoria);

        inputNuevaTarea.value = '';
        selectCategoria.value = 'personal';
        inputNuevaTarea.focus();
    });

    // Enter en el input
    inputNuevaTarea.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            btnAgregar.click();
        }
    });

    // Filtros de estado
    const btnFiltroTodas = document.getElementById('filtroTodas');
    const btnFiltroPendientes = document.getElementById('filtroPendientes');
    const btnFiltroCompletadas = document.getElementById('filtroCompletadas');

    btnFiltroTodas.addEventListener('click', function () {
        filtroActivo.estado = 'todas';
        filtroActivo.categoria = 'todas'; // Resetear categoría
        renderizarTareas();
        actualizarEstilosFiltros();
    });

    btnFiltroPendientes.addEventListener('click', function () {
        filtroActivo.estado = 'pendientes';
        renderizarTareas();
        actualizarEstilosFiltros();
    });

    btnFiltroCompletadas.addEventListener('click', function () {
        filtroActivo.estado = 'completadas';
        renderizarTareas();
        actualizarEstilosFiltros();
    });

    // Filtros de categoría (solo si existen los botones)
    const btnFiltroPersonal = document.getElementById('filtroPersonal');
    const btnFiltroTrabajo = document.getElementById('filtroTrabajo');
    const btnFiltroEstudio = document.getElementById('filtroEstudio');

    if (btnFiltroPersonal && btnFiltroTrabajo && btnFiltroEstudio) {
        btnFiltroPersonal.addEventListener('click', function () {
            filtroActivo.categoria = 'personal';
            renderizarTareas();
            actualizarEstilosFiltros();
        });

        btnFiltroTrabajo.addEventListener('click', function () {
            filtroActivo.categoria = 'trabajo';
            renderizarTareas();
            actualizarEstilosFiltros();
        });

        btnFiltroEstudio.addEventListener('click', function () {
            filtroActivo.categoria = 'estudio';
            renderizarTareas();
            actualizarEstilosFiltros();
        });
    }

});