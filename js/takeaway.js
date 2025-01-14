const precios = {
  muzzarella: { mediano: 8, grande: 12 },
  fugazzeta: { mediano: 10, grande: 14 },
  hawaina: { mediano: 9, grande: 13 }
};

// Actualiza la imagen, descripción y precio al seleccionar una pizza
document.getElementById('pizza').addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const imagePath = selectedOption.getAttribute('data-img');
  const description = selectedOption.getAttribute('data-desc');
  const pizzaValue = selectedOption.value;

  document.getElementById('pizzaImage').src = imagePath;
  document.getElementById('pizzaDesc').textContent = description;

  const tamanio = document.getElementById('tamanio').value;
  const precio = precios[pizzaValue][tamanio];
  document.getElementById('pizzaPrice').textContent = `Precio (${tamanio.charAt(0).toUpperCase() + tamanio.slice(1)}): $${precio}`;
});

// Actualiza el precio al cambiar el tamaño
document.getElementById('tamanio').addEventListener('change', function () {
  const pizzaValue = document.getElementById('pizza').value;
  const tamanio = this.value;
  const precio = precios[pizzaValue][tamanio];
  document.getElementById('pizzaPrice').textContent = `Precio (${tamanio.charAt(0).toUpperCase() + tamanio.slice(1)}): $${precio}`;
});

// Lista de pedidos y total
const listaPedido = document.getElementById('listaPedido');

// Función para agregar un producto al pedido
function agregarProducto(pizza, tamanio, cantidad) {
  const precioPizza = precios[pizza][tamanio] * cantidad;

  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  listItem.innerHTML = `
      <div>
          <strong>${cantidad}x ${pizza.charAt(0).toUpperCase() + pizza.slice(1)} (${tamanio})</strong>
          <span class="ms-3 badge bg-primary">$${precioPizza.toFixed(2)}</span>
      </div>
      <button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button>
  `;

  listItem.querySelector('.eliminar-btn').addEventListener('click', function () {
      eliminarProducto(listItem);
  });

  listaPedido.appendChild(listItem);
  actualizarPrecioTotal();
}

// Función para eliminar un producto del pedido
function eliminarProducto(listItem) {
  listaPedido.removeChild(listItem);
  actualizarPrecioTotal();
}

// Función para actualizar el precio total
function actualizarPrecioTotal() {
  let total = 0;
  const productos = listaPedido.querySelectorAll('.list-group-item .badge');
  productos.forEach(item => {
      const precioItem = parseFloat(item.textContent.replace('$', ''));
      if (!isNaN(precioItem)) {
          total += precioItem;
      }
  });
  document.getElementById('totalPedido').textContent = total.toFixed(2);
}

// Agregar productos al pedido
document.getElementById('agregarPizza').addEventListener('click', function () {
  const pizza = document.getElementById('pizza').value;
  const tamanio = document.getElementById('tamanio').value;
  const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
  agregarProducto(pizza, tamanio, cantidad);
});
