const myform = document.getElementById('myform'); //Formulario de busqueda
const HTMLResponse = document.querySelector('#content'); //Div principal, contiene todo el contenido
const menuDrop = document.querySelector('#menudrop'); //Drop menu de las categorias
const headers = {'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'};
//Cuerpo, recibe los Json de las API y las lista
const body = (value) =>{
    const list = value.map(product => {
        return (`
                <div class="col mt-4">
                    <div class="card" style="width: 18rem;">
                    <img src="${product.url_image}" class="img-thumbnail" alt="No disponible">
                    <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    </div>
                    </div>
                </div>
            `)
    });
    HTMLResponse.innerHTML = `${list.join('')}`
}
//Consulta de los productos en general
const getProducts = async () => {
    const url = `https://bsale-test-js.herokuapp.com/api/products`;
    const respuesta = await fetch(url, {method : "GET", mode: 'cors', headers: headers});
    const data = await respuesta.json();
    body(data);
}
//Consulta del nombre de las categorias
const getCategories = async () => {
    const url = `https://bsale-test-js.herokuapp.com/api/categories`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    const list = data.map(category => {
        return (`
                <li><a id="${category.id}" class="dropdown-item" href="/" onclick="getProductByCategory(this.getAttribute('id'))">${category.name}</a></li>
            `)
    });
    menuDrop.innerHTML = `${list.join('')}`
}
//Llamada a las consultas principales
getCategories();
getProducts();

//Evento de busqueda en el formulario
myform.addEventListener('submit', () => {
    event.preventDefault();
    getProductByName();
})
//Consulta de los productos por nombre, al no tener nada traera todos los productos
const getProductByName = async () => {
    showMessage(0);
    const myinput = document.querySelector('#myinput').value;
    const url = `https://bsale-test-js.herokuapp.com/api/product/${myinput}`;
    const respuesta = await fetch(url);  
    const data = await respuesta.json();
    const isEmpty = Object.keys(data).length === 0;
    if (isEmpty) {
        showMessage(1);
    }
    body(data);
}
//Consulta de los productos por categoria
const getProductByCategory = async (value) => {
    event.preventDefault();
    showMessage(0);
    const url = `https://bsale-test-js.herokuapp.com/api/category/${value}`;
    const respuesta = await fetch(url);  
    const data = await respuesta.json();
    body(data);
}
//Mensajes, en este caso solo el de 0 busqueda
const showMessage = (value = 0) => {
    const message = document.getElementById('message');
    if (value == 1) {   
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
}