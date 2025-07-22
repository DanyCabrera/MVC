class Estudiante {
    id: number;
    nombre: string;
    carrera: string;

    constructor(id: number, nombre: string, carrera: string) {
        this.id = id;
        this.nombre = nombre;
        this.carrera = carrera;
    }
}

class Curso {
    id: number;
    nombre: string;
    creditos: number;

    constructor(id: number, nombre: string, creditos: number) {
        this.id = id;
        this.nombre = nombre;
        this.creditos = creditos;
    }
}

class Inscripcion {
    estudiante: Estudiante;
    curso: Curso;

    constructor(estudiante: Estudiante, curso: Curso) {
        this.estudiante = estudiante;
        this.curso = curso;
    }
}

// Definimos el array con tipo Estudiante[]
let estudiantes: Estudiante[] = [];
let cursos: Curso[] = [];
let inscripciones: Inscripcion[] = [];
let idActual: number = 1;
let idCursoActual: number = 1;

// Obtener el formulario y hacer casting a HTMLFormElement
const form = document.getElementById('form-estudiante') as HTMLFormElement;

// Listener para el submit del formulario
form.addEventListener('submit', function (e: Event) {
    e.preventDefault();

    // Obtener inputs y castear a HTMLInputElement para acceder a .value
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const carreraInput = document.getElementById('carrera') as HTMLInputElement;

    const nombre = nombreInput.value.trim();
    const carrera = carreraInput.value.trim();

    if (nombre && carrera) {
        const nuevo = new Estudiante(idActual++, nombre, carrera);
        estudiantes.push(nuevo);
        mostrarEstudiantes();
        form.reset();
    } else {
        alert("Todos los campos son obligatorios.");
    }
});

// Obtener el formulario de curso
const formCurso = document.getElementById('form-curso') as HTMLFormElement;
if (formCurso) {
    formCurso.addEventListener('submit', function (e: Event) {
        e.preventDefault();
        const nombreInput = document.getElementById('nombre-curso') as HTMLInputElement;
        const creditosInput = document.getElementById('creditos-curso') as HTMLInputElement;

        const nombre = nombreInput.value.trim();
        const creditos = parseInt(creditosInput.value.trim());

        if (nombre && !isNaN(creditos)) {
            const nuevoCurso = new Curso(idCursoActual++, nombre, creditos);
            cursos.push(nuevoCurso);
            mostrarCursos();
            formCurso.reset();
        } else {
            alert("Todos los campos son obligatorios.");
        }
    });
}

// Formulario de inscripción
const formInscripcion = document.getElementById('form-inscripcion') as HTMLFormElement;
if (formInscripcion) {
    formInscripcion.addEventListener('submit', function (e: Event) {
        e.preventDefault();
        const estudianteSelect = document.getElementById('select-estudiante') as HTMLSelectElement;
        const cursoSelect = document.getElementById('select-curso') as HTMLSelectElement;

        const estudianteId = parseInt(estudianteSelect.value);
        const cursoId = parseInt(cursoSelect.value);

        const estudiante = estudiantes.find(e => e.id === estudianteId);
        const curso = cursos.find(c => c.id === cursoId);

        if (estudiante && curso) {
            const nuevaInscripcion = new Inscripcion(estudiante, curso);
            inscripciones.push(nuevaInscripcion);
            mostrarInscripciones();
            formInscripcion.reset();
        } else {
            alert("Debe seleccionar estudiante y curso.");
        }
    });
}

function mostrarEstudiantes(): void {
    const lista = document.getElementById('lista-estudiantes') as HTMLUListElement;
    lista.innerHTML = "";
    estudiantes.forEach(e => {
        const item = document.createElement('li');
        item.textContent = `${e.nombre} - ${e.carrera}`;
        lista.appendChild(item);
    });
    actualizarSelects();
}

function mostrarCursos(): void {
    const lista = document.getElementById('lista-cursos') as HTMLUListElement;
    if (!lista) return;
    lista.innerHTML = "";
    cursos.forEach(c => {
        const item = document.createElement('li');
        item.textContent = `${c.nombre} - Créditos: ${c.creditos}`;
        lista.appendChild(item);
    });
    actualizarSelects();
}

function mostrarInscripciones(): void {
    const lista = document.getElementById('lista-inscripciones') as HTMLUListElement;
    if (!lista) return;
    lista.innerHTML = "";
    inscripciones.forEach(i => {
        const item = document.createElement('li');
        item.textContent = `${i.estudiante.nombre} inscrito en ${i.curso.nombre}`;
        lista.appendChild(item);
    });
}

function actualizarSelects(): void {
    const estudianteSelect = document.getElementById('select-estudiante') as HTMLSelectElement;
    const cursoSelect = document.getElementById('select-curso') as HTMLSelectElement;
    if (estudianteSelect) {
        estudianteSelect.innerHTML = "";
        estudiantes.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id.toString();
            option.textContent = e.nombre;
            estudianteSelect.appendChild(option);
        });
    }
    if (cursoSelect) {
        cursoSelect.innerHTML = "";
        cursos.forEach(c => {
            const option = document.createElement('option');
            option.value = c.id.toString();
            option.textContent = c.nombre;
            cursoSelect.appendChild(option);
        });
    }
}
