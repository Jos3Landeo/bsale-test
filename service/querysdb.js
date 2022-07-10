const connection = require('./database');

const getProducts = () => {
    const sql = 'SELECT * FROM product';
    return new Promise(resolve => {
        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        });
    });
}
const getProductByName = (texto) => {
    const sql = `SELECT * FROM product where name like '%${texto}%'`;
    return new Promise(resolve => {
        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        });
    });
}
const getProductByCategory = (texto) => {
    const sql = `SELECT z.id as id_producto,x.id as id_categoria,z.name,x.name as nombreC,price,url_image FROM product z join category x on (z.category=x.id) where x.name = '${texto}'`;
    return new Promise(resolve => {
        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        });
    });
}
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