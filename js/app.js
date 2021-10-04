//Funcionalidad
let carrito = [];
let total = 0;

const contenedorProductos = document.getElementById('contenedor-bootstrap');
const botonVaciarCarrito = document.getElementById('vaciar');
const carritoAnime = document.getElementById('contenedor-carrito');
const precioTotal = document.getElementById('precioTotal');
const localStorage = window.localStorage;


productosAnime(productosEnStock);


//Modificamos el DOM
function productosAnime(productosEnStock) {
    productosEnStock.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML+= `
                            <img src=${producto.img} class="card-img-top">
                            <div class="card-body ">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio}</p>
                            <button id="boton${producto.id}" class="btn btn-danger">Comprar</button>
                        </div>  
                        </div> 
                        
                        `
    contenedorProductos.appendChild(div);  
    
    let boton = document.getElementById(`boton${producto.id}`)
    boton.onclick = () =>{
        agregarProductos(producto.id)
        Toastify({
            text: "Producto agregado! 👉👈",
            backgroundColor: "#fa3434",
            position:'center',
            className: "info",
          }).showToast();
    }
    });

};

//Agregamos productos al carrito
function agregarProductos(id){
   
            let productoCarrito = productosEnStock.find(producto=> producto.id == id);
    
            carrito.push(productoCarrito);
            verificarCarrito()
            let div = document.createElement('div');
            div.classList.add('agregarProducto');
            div.innerHTML = `
                            <img src=${productoCarrito.img} class="card-img-top imagen">
                            <p >${productoCarrito.nombre}</p>
                            <p>Precio: ${productoCarrito.precio}</p>
                            <hr>`
                            
            carritoAnime.appendChild(div);
            totalCompra();
            guardarEnLocalStorage();
        
        };

function verificarCarrito() {
    if(carrito.length == 0){
        carritoAnime.innerHTML = '<h2 id="mensaje">No hay productos en su carrito 🥺</h2>';
    }else{
        document.getElementById('mensaje').style.display= 'none';
    }
}
verificarCarrito()

function totalCompra(){
    precioTotal.innerText =`$${carrito.reduce((acc , el)=> acc + el.precio, 0)}` ;
};
    
function borrarCarrito() {
    carrito = [];
    localStorage.clear();
    totalCompra()
    verificarCarrito();
};

botonVaciarCarrito.addEventListener('click', borrarCarrito);

//Guardamos en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

function guardarCarrito() {
    let recuperado = JSON.parse(localStorage.getItem('carrito'));
    if (recuperado) {
        recuperado.forEach(el=>{
            agregarProductos(el.id)
        })
    }
};

guardarCarrito();

