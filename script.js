// Espera a que todo el contenido HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona los elementos importantes del HTML
    const inputProducto = document.getElementById('producto-input');
    const btnAgregar = document.getElementById('agregar-btn');
    const listaSupermercado = document.getElementById('lista-supermercado');

    // Carga la lista desde localStorage o usa un array vacío si no hay nada
    let productos = JSON.parse(localStorage.getItem('listaSupermercado')) || [];

    // Función para guardar la lista actual en localStorage
    const guardarLista = () => {
        localStorage.setItem('listaSupermercado', JSON.stringify(productos));
    };

    // Función para mostrar (renderizar) la lista en la página
    const renderizarLista = () => {
        // Limpia la lista actual en el HTML
        listaSupermercado.innerHTML = '';

        // Crea un elemento <li> por cada producto en el array
        productos.forEach((producto, index) => {
            const li = document.createElement('li');
            
            // Añade la clase 'comprado' si el producto está marcado
            if (producto.comprado) {
                li.classList.add('comprado');
            }

            // Estructura interna del <li>
            li.innerHTML = `
                <input type="checkbox" data-index="${index}" ${producto.comprado ? 'checked' : ''}>
                <span>${producto.nombre}</span>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;

            // Añade el <li> a la lista <ul>
            listaSupermercado.appendChild(li);
        });
    };

    // Función para agregar un nuevo producto
    const agregarProducto = () => {
        const nombreProducto = inputProducto.value.trim(); // Obtiene el texto y quita espacios
        
        // Si no hay texto, no hace nada
        if (nombreProducto === '') {
            return;
        }

        // Agrega el nuevo producto al array
        productos.push({ nombre: nombreProducto, comprado: false });
        
        // Limpia el campo de texto
        inputProducto.value = '';
        
        // Guarda y vuelve a renderizar la lista
        guardarLista();
        renderizarLista();
    };

    // Función para manejar los clics dentro de la lista (marcar o eliminar)
    const manejarClicLista = (evento) => {
        const elemento = evento.target; // Elemento donde se hizo clic
        const index = elemento.dataset.index; // Obtiene el índice (posición) del producto

        if (elemento.type === 'checkbox') {
            // Si se hizo clic en un checkbox, actualiza el estado 'comprado'
            productos[index].comprado = elemento.checked;
            guardarLista();
            renderizarLista(); // Vuelve a renderizar para aplicar el estilo tachado
        }

        if (elemento.classList.contains('btn-eliminar')) {
            // Si se hizo clic en 'Eliminar', quita el producto del array
            productos.splice(index, 1);
            guardarLista();
            renderizarLista();
        }
    };

    // --- EVENT LISTENERS ---

    // 1. Al hacer clic en el botón "Agregar"
    btnAgregar.addEventListener('click', agregarProducto);

    // 2. Al presionar "Enter" en el campo de texto
    inputProducto.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            agregarProducto();
        }
    });

    // 3. Al hacer clic en cualquier parte de la lista <ul>
    listaSupermercado.addEventListener('click', manejarClicLista);

    // --- CARGA INICIAL ---
    
    // Muestra la lista guardada en cuanto se carga la página
    renderizarLista();
});