//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos'); 
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el arreglo
       
        limpiaHTML(); //limpiamos el HTML
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement; //acceder al contenido del div del curso para obtener info
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        carritoHTML(); //iterar sobre el carrito y mostrar en el html
    }
}



//Lee el contenido del HTML al que le dimos click y extare la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    //Ccrear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src, //obtener la ruta hacia la imagen
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), //obtener el id del objeto
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{ //.map crea un arreglo de los cursos para ir iterando sobre cada uno
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //en caso de que coincida la comparacion de los cursos retorna el curso+1
            } else { //usamos else porque no se pueden perder los demas elementos que no coincidan
                return curso; //retornan objetos no duplicados
            }
        });
        articulosCarrito = [... cursos];
    } else {
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]; //se usa spread operator para ir realizando copias cada vez que se añada un nuevo articulo
    }

    //console.log(infoCurso);

    
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el acrrito de compras en el HTML
function carritoHTML() {
    
    //Limpiar el HTML porque se generan duplicados
    limpiaHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr')//para hacerlo con diseño de tablas
        row.innerHTML= `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiaHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}





