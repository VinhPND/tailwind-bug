import React, { useState} from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
};

const Product: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = async () => {
    try {
      const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
      setApiProducts(response.data);
      setFormVisible(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleConfirmProduct = () => {
    if (selectedProduct) {
      setProducts([...products, selectedProduct]);
      setCount(count + 1);
      setSelectedProduct(null);
      setFormVisible(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <h1 className="text-2xl mb-4">Product Page</h1>
      <h2 className="text-xl text-blue-500 mb-4">Count: {count}</h2>

      <div className="flex justify-between gap-4 mb-4">
        <Button onClick={() => navigate("/")} text="Go to Home Page" />
        <Button onClick={handleAddProduct} text="Thêm sản phẩm" />
      </div>

      {isFormVisible && (
        <div className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded bg-gray-100 w-full max-w-md">
          <h3 className="text-lg">Chọn sản phẩm từ danh sách</h3>

          <div className="overflow-y-auto max-h-60 w-full">
            <ul className="list-none p-0">
              {apiProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className={`p-4 mb-2 cursor-pointer rounded hover:bg-gray-200 transition duration-200 ${
                    selectedProduct?.id === product.id
                      ? "bg-gray-300 font-bold"
                      : "bg-white"
                  }`}
                >
                  <h4 className="font-semibold">{product.title}</h4>
                  <p className="text-gray-500">Giá: {product.price} $</p>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleConfirmProduct} text="Xác nhận" />
        </div>
      )}

      <ul className="list-none p-0 mt-6">
        {products.map((product, index) => (
          <li key={index} className="p-4 mb-2 border rounded w-full max-w-md">
            <h3 className="font-bold">{product.title}</h3>
            <p className="text-gray-500">Giá: {product.price} $</p>
          </li>
        ))}
      </ul>
    </div>
  
  );
};

export default Product;
