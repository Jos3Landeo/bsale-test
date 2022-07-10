const myform = document.getElementById('myform');
const HTMLResponse = document.querySelector('#content');
const menuDrop = document.querySelector('#menudrop');

const getProducts = async () => {
    const url = `http://localhost:3000/products`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    const list = data.map(product => {
        return (`
                <div class="col mt-4">
                    <div class="card" style="width: 18rem;">
                    <img src="${product.url_image}" class="img-thumbnail" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    </div>
                    </div>
                </div>
            `)
    });
    HTMLResponse.innerHTML = `${list.join('')}`
}
const getCategories = async () => {
    const url = `http://localhost:3000/categories`;
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
    const url = `http://localhost:3000/products/${myinput}`;
    const respuesta = await fetch(url);  
    const data = await respuesta.json();
    const list = data.map(product => {
        return (`
                <div class="col mt-4">
                    <div class="card" style="width: 18rem;">
                    <img src="${product.url_image}" class="img-thumbnail" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    </div>
                    </div>
                </div>
            `)
    });
    HTMLResponse.innerHTML = `${list.join('')}`
}

const getProductByCategory = async (value) => {
    event.preventDefault();
    const url = `http://localhost:3000/category/${value}`;
    const respuesta = await fetch(url);  
    const data = await respuesta.json();
    const list = data.map(product => {
        return (`
                <div class="col mt-4">
                    <div class="card" style="width: 18rem;">
                    <img src="${product.url_image}" class="img-thumbnail" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    </div>
                    </div>
                </div>
            `)
    });
    HTMLResponse.innerHTML = `${list.join('')}`
}
