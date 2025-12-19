import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router";
import Products from "./Products/Products";
import Layout from "./Layout/Layout";
import SingleProduct from "./Products/SingleProduct";
import Login from "./Auth/Login";
import AboutMe from "./Auth/AboutMe";
import Cart from "./Auth/Cart";
import Orders from "./Auth/Orders";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [lineItems, setLineItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getHeaders = () => {
    return {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    };
  };

  const authorization = async () => {
    if (window.localStorage.getItem("token")) {
      const { data } = await axios.get("/api/auth/me", getHeaders());
      setUser(data);
    }
  };

  useEffect(() => {
    authorization();
  }, []);

  useEffect(() => {
    const fetchLineItems = async () => {
      const { data } = await axios.get("/api/lineItems", getHeaders());
      setLineItems(data);
    };
    if (user.id) {
      fetchLineItems();
    }
  }, [user]);
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("/api/orders", getHeaders());
      setOrders(data);
    };
    if (user.id) {
      fetchOrders();
    }
  }, [user]);

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser({});
    navigate("/");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const cart =
    orders.find((order) => {
      return order.is_cart;
    }) || {};

  const createLineItem = async (product) => {
    const { data } = await axios.post(
      "/api/lineItems",
      {
        order_id: cart.id,
        product_id: product.id,
      },
      getHeaders()
    );
    setLineItems([...lineItems, data]);
  };

  const updateOrder = async (order) => {
    await axios.put(`/api/orders/${order.id}`, order, getHeaders());
    const { data } = await axios.get("/api/orders", getHeaders());
    setOrders(data);
  };

  const updateProduct = async (updatedProduct) => {
    const { data } = await axios.patch(
      `/api/products/${updatedProduct.id}`,
      updatedProduct,
      getHeaders()
    );
    setProducts(
      products.map((product) => (product.id === data.id ? data : product))
    );
  };

  return (
    <div>
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route
            index
            element={
              <Products
                products={products}
                user={user}
                createLineItem={createLineItem}
                updateProduct={updateProduct}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                user={user}
                createLineItem={createLineItem}
                updateProduct={updateProduct}
              />
            }
          />
          <Route
            path="/products/:id"
            element={<SingleProduct products={products} />}
          />
          <Route
            path="/login"
            element={<Login authorization={authorization} />}
          />
          <Route path="/me" element={<AboutMe user={user} logout={logout} />} />
          <Route
            path="/orders"
            element={
              <Orders
                orders={orders}
                lineItems={lineItems}
                products={products}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                lineItems={lineItems}
                products={products}
                updateOrder={updateOrder}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
