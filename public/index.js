const myform = document.getElementById('myform');
const HTMLResponse = document.querySelector('#content');
const menuDrop = document.querySelector('#menudrop');

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

const getProducts = async () => {
    const url = `https://bsale-test-js.herokuapp.com/api/products`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    body(data);
}
const getCategories = async () => {
    const url = `https://bsale-test-js.herokuapp.com/api/categories`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    const list = data.map(category => {
        return (`
                <li><a id="categorydrop" name="${category.name}" class="dropdown-item" href="/" onclick="getProductByCategory(this.name)">${category.name}</a></li>
            `)
    });
    menuDrop.innerHTML = `${list.join('')}`
}
getCategories();
getProducts();

myform.addEventListener('submit', () => {
    event.preventDefault();
    getProductByName();
})

const getProductByName = async () => {
    const myinput = document.querySelector('#myinput').value;
    const url = `https://bsale-test-js.herokuapp.com/api/product/${myinput}`;
    const respuesta = await fetch(url);  
    const data = await respuesta.json();
    body(data);
}
const getProductByCategory = async (value) => {
    event.preventDefault();
    const url = `https://bsale-test-js.herokuapp.com/api/category/${value}`;
    const respuesta = await fetch(url);  
    const data = await respuesta.json();
    body(data);
}
