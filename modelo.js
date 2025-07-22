var Estudiante = /** @class */ (function () {
    function Estudiante(id, nombre, carrera) {
        this.id = id;
        this.nombre = nombre;
        this.carrera = carrera;
    }
    return Estudiante;
}());
var Curso = /** @class */ (function () {
    function Curso(id, nombre, creditos) {
        this.id = id;
        this.nombre = nombre;
        this.creditos = creditos;
    }
    return Curso;
}());
var Inscripcion = /** @class */ (function () {
    function Inscripcion(estudiante, curso) {
        this.estudiante = estudiante;
        this.curso = curso;
    }
    return Inscripcion;
}());
// Definimos el array con tipo Estudiante[]
var estudiantes = [];
var cursos = [];
var inscripciones = [];
var idActual = 1;
var idCursoActual = 1;
// Obtener el formulario y hacer casting a HTMLFormElement
var form = document.getElementById('form-estudiante');
// Listener para el submit del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Obtener inputs y castear a HTMLInputElement para acceder a .value
    var nombreInput = document.getElementById('nombre');
    var carreraInput = document.getElementById('carrera');
    var nombre = nombreInput.value.trim();
    var carrera = carreraInput.value.trim();
    if (nombre && carrera) {
        var nuevo = new Estudiante(idActual++, nombre, carrera);
        estudiantes.push(nuevo);
        mostrarEstudiantes();
        form.reset();
    }
    else {
        alert("Todos los campos son obligatorios.");
    }
});
// Obtener el formulario de curso
var formCurso = document.getElementById('form-curso');
if (formCurso) {
    formCurso.addEventListener('submit', function (e) {
        e.preventDefault();
        var nombreInput = document.getElementById('nombre-curso');
        var creditosInput = document.getElementById('creditos-curso');
        var nombre = nombreInput.value.trim();
        var creditos = parseInt(creditosInput.value.trim());
        if (nombre && !isNaN(creditos)) {
            var nuevoCurso = new Curso(idCursoActual++, nombre, creditos);
            cursos.push(nuevoCurso);
            mostrarCursos();
            formCurso.reset();
        }
        else {
            alert("Todos los campos son obligatorios.");
        }
    });
}
// Formulario de inscripción
var formInscripcion = document.getElementById('form-inscripcion');
if (formInscripcion) {
    formInscripcion.addEventListener('submit', function (e) {
        e.preventDefault();
        var estudianteSelect = document.getElementById('select-estudiante');
        var cursoSelect = document.getElementById('select-curso');
        var estudianteId = parseInt(estudianteSelect.value);
        var cursoId = parseInt(cursoSelect.value);
        var estudiante = estudiantes.find(function (e) { return e.id === estudianteId; });
        var curso = cursos.find(function (c) { return c.id === cursoId; });
        if (estudiante && curso) {
            var nuevaInscripcion = new Inscripcion(estudiante, curso);
            inscripciones.push(nuevaInscripcion);
            mostrarInscripciones();
            formInscripcion.reset();
        }
        else {
            alert("Debe seleccionar estudiante y curso.");
        }
    });
}
function mostrarEstudiantes() {
    var lista = document.getElementById('lista-estudiantes');
    lista.innerHTML = "";
    estudiantes.forEach(function (e) {
        var item = document.createElement('li');
        item.textContent = "".concat(e.nombre, " - ").concat(e.carrera);
        lista.appendChild(item);
    });
    actualizarSelects();
}
function mostrarCursos() {
    var lista = document.getElementById('lista-cursos');
    if (!lista)
        return;
    lista.innerHTML = "";
    cursos.forEach(function (c) {
        var item = document.createElement('li');
        item.textContent = "".concat(c.nombre, " - Cr\u00E9ditos: ").concat(c.creditos);
        lista.appendChild(item);
    });
    actualizarSelects();
}
function mostrarInscripciones() {
    var lista = document.getElementById('lista-inscripciones');
    if (!lista)
        return;
    lista.innerHTML = "";
    inscripciones.forEach(function (i) {
        var item = document.createElement('li');
        item.textContent = "".concat(i.estudiante.nombre, " inscrito en ").concat(i.curso.nombre);
        lista.appendChild(item);
    });
}
function actualizarSelects() {
    var estudianteSelect = document.getElementById('select-estudiante');
    var cursoSelect = document.getElementById('select-curso');
    if (estudianteSelect) {
        estudianteSelect.innerHTML = "";
        estudiantes.forEach(function (e) {
            var option = document.createElement('option');
            option.value = e.id.toString();
            option.textContent = e.nombre;
            estudianteSelect.appendChild(option);
        });
    }
    if (cursoSelect) {
        cursoSelect.innerHTML = "";
        cursos.forEach(function (c) {
            var option = document.createElement('option');
            option.value = c.id.toString();
            option.textContent = c.nombre;
            cursoSelect.appendChild(option);
        });
    }
}
