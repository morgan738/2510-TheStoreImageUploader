const Cart = ({ cart, lineItems, products, updateOrder }) => {
  return (
    <div>
      <h2>Cart </h2>
      <ul>
        {lineItems
          .filter((lineItem) => {
            return lineItem.order_id === cart.id;
          })
          .map((lineItem) => {
            const product = products.find((product) => {
              return product.id === lineItem.product_id;
            });
            return (
              <li>
                {product.name} ({lineItem.quantity})
              </li>
            );
          })}
      </ul>
      <button
        onClick={() => {
          updateOrder({ ...cart, is_cart: false });
        }}
      >
        Place order
      </button>
    </div>
  );
};

export default Cart;
