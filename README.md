# 📝 TaskMaster - Gestor de Tareas Personal

![Estado del Proyecto](https://img.shields.io/badge/estado-completado-success)
![Versión](https://img.shields.io/badge/versión-2.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)

## 📖 Descripción

**TaskMaster** es una aplicación web de gestión de tareas (To-Do App) desarrollada con JavaScript vanilla, HTML5 y CSS3. Permite a los usuarios organizar sus pendientes diarios con persistencia de datos mediante `localStorage`, sin necesidad de backend o conexión a internet.

### 🎯 Problema que resuelve

Necesitas una forma simple y rápida de organizar tus tareas diarias que **NO desaparezca** cuando cierres el navegador. A diferencia de escribir en papel o usar aplicaciones complejas que requieren registro, TaskMaster guarda todo en tu navegador automáticamente y funciona completamente offline.

---

## ✨ Características Principales

### Core Features (v1.0)
- ✅ **Agregar tareas** con validación de inputs vacíos
- ✅ **Marcar como completadas** con efecto visual (tachado + color gris)
- ✅ **Eliminar tareas** con confirmación previa
- ✅ **Persistencia de datos** mediante localStorage (las tareas sobreviven al cierre del navegador)
- ✅ **Contador dinámico** que muestra tareas pendientes vs totales
- ✅ **Filtros por estado**: Todas / Pendientes / Completadas
- ✅ **Diseño responsive** optimizado para mobile y desktop

### Advanced Features (v2.0)
- 🆕 **Sistema de categorías** con 3 tipos:
  - 🏠 **Personal** (color azul)
  - 💼 **Trabajo** (color rojo)
  - 📚 **Estudio** (color verde)
- 🆕 **Filtros por categoría** combinables con filtros de estado
- 🆕 **Indicadores visuales** con emojis y bordes de colores
- 🆕 **Selector de categoría** al agregar nuevas tareas

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de dependencias ni servidor

### Pasos de Instalación

1. **Clona o descarga el repositorio:**
```bash
git clone https://github.com/tu-usuario/taskmaster-app.git
cd taskmaster-app
```

2. **Estructura de archivos:**
```
taskmaster-app/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos personalizados
├── app.js              # Lógica de la aplicación
├── css/
│   └── bootstrap.min.css   # Framework CSS (Bootstrap 5)
└── js/
    └── bootstrap.bundle.min.js  # Bootstrap JS
```

3. **Abrir la aplicación:**
   - Opción A: Doble clic en `index.html`
   - Opción B: Usar Live Server de VS Code
   - Opción C: Servir con cualquier servidor local (Python, Node, etc.)

```bash
# Ejemplo con Python
python -m http.server 8000
# Abrir http://localhost:8000 en el navegador
```

---

## 🎮 Guía de Uso

### 1. Agregar una tarea
1. Escribe el texto de la tarea en el input
2. Selecciona una categoría (Personal, Trabajo, o Estudio)
3. Haz clic en "➕ Agregar" o presiona **Enter**
4. La tarea aparecerá instantáneamente con el color de su categoría

### 2. Marcar como completada
- Haz clic en el **checkbox** al lado de la tarea
- El texto se tachará y cambiará a color gris
- El contador de pendientes se actualizará automáticamente

### 3. Eliminar una tarea
- Haz clic en el botón **🗑️** al lado de la tarea
- Confirma la eliminación en el diálogo emergente
- La tarea se eliminará permanentemente

### 4. Filtrar tareas
**Por estado:**
- **Todas**: Muestra todas las tareas
- **Pendientes**: Solo tareas sin completar
- **Completadas**: Solo tareas marcadas como completadas

**Por categoría:** (si implementaste los botones opcionales)
- **🏠 Personal**: Solo tareas personales
- **💼 Trabajo**: Solo tareas laborales
- **📚 Estudio**: Solo tareas académicas

**Nota:** Los filtros son combinables (ej: "Pendientes + Trabajo")

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados + animaciones
- **JavaScript ES6+**: Lógica de la aplicación
  - Arrow functions
  - Template literals
  - Array methods (`.filter()`, `.find()`, `.map()`)
  - Destructuring

### Framework & Librerías
- **Bootstrap 5.3**: Sistema de grid responsive + componentes UI

### APIs del Navegador
- **localStorage**: Persistencia de datos local
- **JSON.stringify() / JSON.parse()**: Serialización de datos
- **DOM API**: Manipulación dinámica del HTML

---

## 📂 Estructura de Datos

### Objeto Tarea
Cada tarea se almacena como un objeto JavaScript con la siguiente estructura:

```javascript
{
    id: 1713024600123,               // Timestamp único (Number)
    texto: "Preparar presentación",  // Descripción (String)
    completada: false,               // Estado (Boolean)
    fecha: "2025-04-13T14:30:00Z",  // Fecha de creación ISO 8601 (String)
    categoria: "trabajo"             // Categoría: personal | trabajo | estudio (String)
}
```

### Array Global
```javascript
let tareas = [
    { id: 123, texto: "Comprar pan", completada: false, fecha: "...", categoria: "personal" },
    { id: 456, texto: "Estudiar JS", completada: true, fecha: "...", categoria: "estudio" },
    // ... más tareas
];
```

### Almacenamiento en localStorage
```javascript
// Clave: 'taskmaster_tareas'
// Valor: String JSON del array completo
localStorage.setItem('taskmaster_tareas', JSON.stringify(tareas));
```

---

## 🎨 Personalización

### Cambiar Colores de Categorías

Edita `styles.css` en la sección de categorías:

```css
/* Categoría: Personal */
.categoria-personal {
    border-left: 5px solid #3498db; /* Cambia el código de color aquí */
}

/* Categoría: Trabajo */
.categoria-trabajo {
    border-left: 5px solid #e74c3c;
}

/* Categoría: Estudio */
.categoria-estudio {
    border-left: 5px solid #2ecc71;
}
```

### Modificar el Degradado de Fondo

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Cambia los colores del degradado aquí */
}
```

### Agregar Nuevas Categorías

1. **Agrega la opción en el HTML:**
```html
<select id="selectCategoria" class="form-select">
    <option value="personal">🏠 Personal</option>
    <option value="trabajo">💼 Trabajo</option>
    <option value="estudio">📚 Estudio</option>
    <option value="salud">❤️ Salud</option> <!-- NUEVA -->
</select>
```

2. **Agrega el emoji en JavaScript (`app.js`):**
```javascript
const emojis = {
    'personal': '🏠',
    'trabajo': '💼',
    'estudio': '📚',
    'salud': '❤️'  // NUEVO
};
```

3. **Agrega el estilo CSS:**
```css
.categoria-salud {
    border-left: 5px solid #f39c12; /* Color naranja */
}
```

---

## 🧪 Testing Manual

### Checklist de Funcionalidad

- [ ] Puedo agregar una tarea vacía (debería mostrar alerta)
- [ ] Puedo agregar una tarea con solo espacios (debería mostrar alerta)
- [ ] Puedo agregar una tarea válida y aparece instantáneamente
- [ ] El input y selector se limpian después de agregar
- [ ] Puedo presionar Enter para agregar (sin usar el botón)
- [ ] Puedo marcar una tarea como completada
- [ ] La tarea completada se tacha y cambia de color
- [ ] El contador se actualiza correctamente
- [ ] Puedo desmarcar una tarea completada
- [ ] Al eliminar una tarea, aparece confirmación
- [ ] Si cancelo la eliminación, la tarea permanece
- [ ] Si confirmo, la tarea se elimina
- [ ] Los filtros "Todas/Pendientes/Completadas" funcionan
- [ ] El botón activo se resalta visualmente
- [ ] Al refrescar (F5), las tareas persisten
- [ ] Al cerrar y reabrir el navegador, las tareas persisten
- [ ] Cada categoría muestra su color distintivo
- [ ] El selector de categoría funciona correctamente

### Testing en Diferentes Dispositivos

- [ ] La app se ve bien en desktop (1920x1080)
- [ ] La app se ve bien en tablet (768x1024)
- [ ] La app se ve bien en mobile (375x667)
- [ ] Los botones son fáciles de tocar en mobile
- [ ] El texto es legible en pantallas pequeñas

---

## 🐛 Solución de Problemas

### Las tareas no persisten al refrescar

**Causa:** localStorage no está guardando correctamente.

**Solución:**
1. Abre DevTools (F12) → Console
2. Verifica si hay errores de `JSON.parse()`
3. Revisa que `guardarTareas()` se llame después de cada cambio
4. Comprueba que no estés en modo incógnito (localStorage no persiste ahí)

### Los filtros no funcionan

**Causa:** Nombres de variables inconsistentes en el código.

**Solución:**
1. Verifica que uses `filtroActivo.estado` y `filtroActivo.categoria` (no `filtros`)
2. Revisa que los IDs de los botones en HTML coincidan con los del JavaScript

### Las categorías no muestran colores

**Causa:** Clases CSS no aplicadas correctamente.

**Solución:**
1. Abre DevTools → Inspector de elementos
2. Verifica que el `<div>` tenga la clase `categoria-personal` (o trabajo/estudio)
3. Revisa que el CSS tenga las reglas para `.categoria-personal`, etc.

### Error: "Cannot read property 'value' of null"

**Causa:** JavaScript se ejecuta antes de que el DOM esté listo.

**Solución:**
- Asegúrate de que todo tu código esté dentro de `DOMContentLoaded`:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Todo tu código aquí
});
```

---

## 📚 Conceptos Aprendidos

Este proyecto enseña los siguientes conceptos fundamentales de desarrollo web:

### JavaScript
- ✅ Manipulación del DOM (`getElementById`, `innerHTML`)
- ✅ Event listeners (`click`, `keypress`, `change`)
- ✅ Arrays y métodos funcionales (`.filter()`, `.find()`, `.map()`, `.forEach()`)
- ✅ Objetos JavaScript y propiedades
- ✅ Template literals (backticks)
- ✅ Arrow functions
- ✅ Ternary operator (`condicion ? valorTrue : valorFalse`)
- ✅ Short-circuit evaluation (`||`, `&&`)

### Web APIs
- ✅ localStorage API (`.setItem()`, `.getItem()`, `.removeItem()`)
- ✅ JSON.stringify() y JSON.parse()
- ✅ Date API (`Date.now()`, `new Date().toISOString()`)

### Arquitectura
- ✅ Separación de responsabilidades (funciones específicas)
- ✅ Estado de aplicación (array global `tareas`)
- ✅ Renderizado dinámico (generar HTML desde JavaScript)
- ✅ Sincronización entre memoria y almacenamiento

### CSS & Design
- ✅ Responsive design con media queries
- ✅ Flexbox para layouts
- ✅ Transiciones y animaciones CSS
- ✅ Bootstrap grid system

---

## 🔮 Futuras Mejoras (Roadmap)

### Corto Plazo
- [ ] Edición inline de tareas (botón ✏️)
- [ ] Drag & drop para reordenar tareas
- [ ] Fechas de vencimiento con alertas
- [ ] Modo oscuro (dark mode)

### Mediano Plazo
- [ ] Búsqueda/filtrado por texto
- [ ] Prioridades (Alta/Media/Baja)
- [ ] Subtareas anidadas
- [ ] Estadísticas y gráficos

### Largo Plazo
- [ ] Sincronización en la nube (Firebase)
- [ ] Colaboración multi-usuario
- [ ] PWA (Progressive Web App) con service workers
- [ ] Exportar/importar datos (JSON, CSV)

---

## 👨‍💻 Autor

**Nicolas** - [NiConBravo](https://github.com/NiConBravo)

- 🎓 Estudiante del Bootcamp FullStack Python - Desafío Latam
- 📍 Ubicación: Berlín, Alemania
- 💼 Background: Producción y Logística → Desarrollo Web

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **Desafío Latam** por el programa de bootcamp
- **Bootstrap** por el framework CSS
- **MDN Web Docs** por la documentación de referencia
- **Claude (Anthropic)** por la asistencia en el desarrollo y documentación

---

## 📸 Screenshots

### Vista Desktop
![Desktop View](screenshots/desktop-view.png)

### Vista Mobile
![Mobile View](screenshots/mobile-view.png)

### Filtros Activos
![Filters](screenshots/filters.png)

---

## 📞 Contacto y Soporte

¿Encontraste un bug? ¿Tienes sugerencias?

- 🐛 Reporta issues en: [GitHub Issues](https://github.com/NiConBravo/taskmaster-app/issues)
- 💬 Contribuciones via Pull Requests son bienvenidas

---

## 📊 Estado del Proyecto

```
Progreso General: ████████████████████ 100%

✅ Core Features        [100%] ████████████████████
✅ Categorías           [100%] ████████████████████
✅ Responsive Design    [100%] ████████████████████
✅ Documentación        [100%] ████████████████████
⏳ PWA Features         [ 0%]
⏳ Cloud Sync           [ 0%]
```

---

**¿Te gusta TaskMaster?** ⭐ Dale una estrella en GitHub!

---

*Última actualización: Abril 2025*
