import { Link } from "react-router";
import ProductImageEditor from "./ProductImageEditor";

const Products = ({ products, user, createLineItem, updateProduct }) => {
  return (
    <div>
      <h1>Products - {products.length}</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <img src={product.image} />
              <ProductImageEditor
                updateProduct={updateProduct}
                product={product}
              />
              {user.id ? (
                <button
                  onClick={() => {
                    createLineItem(product);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <p>Login to add to cart</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
