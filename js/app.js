//Funcionalidad
let carrito = [];
let total = 0;

const precioTotal = document.getElementById('precioTotal');
const localStorage = window.localStorage;
productosAnime(productosEnStock);
guardarCarrito();
verificarCarrito();

//Modificamos el DOM
function productosAnime(productosEnStock) {
    productosEnStock.forEach(producto => {
        $("#contenedor-bootstrap").append(
                        `
                            <div class= "card">
                            <img src=${producto.img} class="card-img-top">
                            <div class="card-body ">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio}</p>
                            <button id="boton${producto.id}" class="btn btn-danger">Comprar</button>
                        </div>  
                        </div> 
                        </div>
                        `)

   $(`#boton${producto.id}`).on('click', function () {
        agregarProductos(producto.id);
        Toastify({
            text: "Producto agregado! 👉👈",
            backgroundColor: "#fa3434",
            position:'center',
            className: "info",
          }).showToast();
        });
    });

};

//Agregamos productos al carrito
function agregarProductos(id){
   
            let productoCarrito = productosEnStock.find(producto=> producto.id == id);
    
            carrito.push(productoCarrito);
            verificarCarrito();
            $("#contenedor-carrito").append(
            `<div class= "agregarProducto">
                            <img src=${productoCarrito.img} class="card-img-top imagen">
                            <p >${productoCarrito.nombre}</p>
                            <p>Precio: ${productoCarrito.precio}</p>
                            <hr>
                            </div>`);                            
            totalCompra();
            guardarEnLocalStorage();
        };

function verificarCarrito() {
    if(carrito.length == 0){
        $("#contenedor-carrito").empty();
        $("#contenedor-carrito").append('<h2 id="mensaje">No hay productos en su carrito 🥺</h2>');
    }else{
        $("#mensaje").css('display', 'none');
    };
};

//Suma el total de la compra
function totalCompra(){
    precioTotal.innerText =`$${carrito.reduce((acc , el)=> acc + el.precio, 0)}`;
};

//Borramos todos los productos del carrito
function borrarCarrito() {
    carrito = [];
    localStorage.clear();
    totalCompra()
    verificarCarrito();
};

$("#vaciar").on('click', borrarCarrito);


//Guardamos en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

function guardarCarrito() {
    let recuperado = JSON.parse(localStorage.getItem('carrito'));
    if (recuperado) {
        recuperado.forEach(el=>{
            agregarProductos(el.id);
        })
    }
};



