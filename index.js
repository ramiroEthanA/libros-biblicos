//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2 , nombre: 'Exodo', autor: 'Juan', anioPublicacion: 2024},
    {id: 3 , nombre: 'Levitico', autor: 'Moises', anioPublicacion: 1990},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});
//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese anio'});
    }
});

//endpoint 7
app.get('/datos/', (req, res) => {
    const nombre = 'Ramiro'; // nombre
    const profesion = 'Analista de Sistemas'; // profesión
    res.send(`¡Bienvenido/a, ${nombre}! Tu profesión actual es ${profesion}.`);
});


//endpoint 8
app.get('/libros/autor/:autor', (req, res) => {
    const autor = req.params.autor;
    const librosPorAutor = librosBiblicos.filter(libro => libro.autor.toLowerCase() === autor.toLowerCase());
    if (librosPorAutor.length > 0) {
        res.json(librosPorAutor);
    } else {
        res.status(404).json({mensaje: 'No se encontraron libros para ese autor.'});
    }
});


});
// enpoint 9 otro
app.get('/libro/cantidad', (req, res) => {
    const cantidadLibro = librosBiblicos.reduce((total, libro) => total + 1, 0);
    res.json({ cantidad: cantidadLibro });
});


// Endpoint 10
app.get('/libros/nombre/:texto', (req, res) => {
    const texto = req.params.texto.toLowerCase();
    const librosPorNombre = librosBiblicos.filter(libro => libro.nombre.toLowerCase().includes(texto));
    if (librosPorNombre.length > 0) {
        res.json(librosPorNombre);
    } else {
        res.status(404).json({mensaje: 'No se encontraron libros con ese nombre.'});
    }
});



// endpoint 11 otro 
app.get('/libro/orden', (req, res) => {
    const librosOrdenados = librosBiblicos.slice().sort((a, b) => {
        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
    res.json(librosOrdenados);
});


app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});