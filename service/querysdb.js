const connection = require('./database');

//Query que trae todos los productos
const getProducts = () => {
    const sql = 'SELECT * FROM product';
    return new Promise(resolve => {
        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        });
    });
}
//Query que trae todos los productos similares al nombre dado
const getProductByName = (name) => {
    const sql = `SELECT * FROM product where name like ?`;
    return new Promise(resolve => {
        connection.query(sql, ['%'+name+'%'], function (error, results) {
            if (error) throw error;
            resolve(results)
        });
    });
}
//Query que trae todos los productos por su id
const getProductByCategory = (id) => {
    const sql = `SELECT z.id as id_producto,x.id as id_categoria,z.name,x.name as nombreC,price,url_image FROM product z join category x on (z.category=x.id) where x.id = ?`;
    return new Promise(resolve => {
        connection.query(sql, [id], function (error, results) {
            if (error) throw error;
            resolve(results)
        });
    });
}
//Query que trae todos el nombre de las categorias
const getCategories = () => {
    const sql = `SELECT * FROM category`;
    return new Promise(resolve => {
        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        });
    });
}
module.exports = {getProducts, getProductByName, getCategories, getProductByCategory};