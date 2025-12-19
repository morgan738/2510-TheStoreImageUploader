import { useState, useEffect, useRef } from "react";

const ProductImageEditor = ({ updateProduct, product }) => {
  const [data, setData] = useState("");
  const el = useRef();

  useEffect(() => {
    el.current.addEventListener("change", (event) => {
      const file = event.target.files[0];
      setData(file);
    });
  }, []);

  const changeImg = () => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.addEventListener("load", async () => {
      product = { ...product, image: reader.result };
      await updateProduct(product);
    });
    setData("");
    el.current.value = "";
  };

  return (
    <div>
      <input type="file" ref={el} />
      <br />
      <button
        onClick={() => {
          changeImg();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ProductImageEditor;
