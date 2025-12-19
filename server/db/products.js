const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const createProduct = async (product) => {
  const SQL = `
        INSERT INTO products(id, name, price, image)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
  const response = await client.query(SQL, [
    uuidv4(),
    product.name,
    product.price,
    product.image,
  ]);
  return response.rows[0];
};

const fetchProducts = async () => {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const updateProduct = async (product) => {
  const SQL = `
    UPDATE products
    SET image = $1
    WHERE id = $2
    RETURNING *
  `;
  const response = await client.query(SQL, [product.image, product.id]);
  return response.rows[0];
};

module.exports = {
  createProduct,
  fetchProducts,
  updateProduct,
};
