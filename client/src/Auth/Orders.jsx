const Orders = ({ orders, lineItems, products }) => {
  return (
    <div>
      <h2>Orders</h2>
      <div>
        {orders
          .filter((order) => {
            return !order.is_cart;
          })
          .map((order) => {
            const orderLineItems = lineItems.filter((lineItem) => {
              return lineItem.order_id === order.id;
            });
            return (
              <ul>
                {orderLineItems.map((lineItem) => {
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
            );
          })}
      </div>
    </div>
  );
};

export default Orders;
