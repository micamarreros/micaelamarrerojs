// Contenedor de todos los productos del carrito
const contenedorCarrito = document.getElementById("contenedor-carrito");

// Traigo a carrito de local storage
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

// Uso funcion mostrar carrito con productos traidos de local storage
carrito(productosEnCarrito);

// Muestro el carrito con los productos traidos del local storage
function carrito(productosEnCarrito) {

    // Borro contenedor para que muestre los productos de nuevo
    contenedorCarrito.innerHTML ="";

    productosEnCarrito.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML= `
        <img class="carrito-producto-img" src="${producto.img}" alt="${producto.nombre}">
        <div class="carrito-descripcion-productos">
            <h5 class="carrito-producto-nombre">${producto.nombre}</h5>
            <p>$ ${producto.precio}</p>
            <p>${producto.cantidad}</p>
            <p>Subtotal ${producto.precio * producto.cantidad}</p>
       
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${producto.id})">Eliminar del carrito</button>
        </div>
    `;
        
    contenedorCarrito.append(div);
    
    })
}

function eliminarDelCarrito(id) {
    // Obtengo el producto del array
    const findProducto = productosEnCarrito.find(e => e.id == id);

    const index = productosEnCarrito.indexOf(findProducto);
    
    productosEnCarrito.splice(index, 1);
    
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se eliminó el producto del carrito',
        showConfirmButton: false,
        timer: 1500
    })

    // Muestro el carrito con los productos eliminados
    carrito(productosEnCarrito);
    
    // Actualizo y guardo en local storage los productos del nuevo carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}