import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../reduxstates/store";
import {
  fetchItemsAsync,
  addItemAsync,
  deleteItemAsync,
  updateItemAsync,
} from "../../reduxstates/itemsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch: AppDispatch = useDispatch();
  const [item, setItem] = useState<{ id: number; name: string }>({ id: 0, name: "" });

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addItemAsync({ name: item.name }));
    setItem({ id: 0, name: "" });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteItemAsync(id));
  };

  const handleUpdate = (item: { id: number; name: string }) => {
    dispatch(updateItemAsync(item));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative text-center">
      <h1 className="text-2xl font-bold  mb-4">Welcome to Home Page</h1>
      <Button onClick={() => navigate("/product")} text="Go to Product Page" />
      <div className="w-full max-w-md">
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
        <button
          className="bg-green-500 text-white p-2 rounded mb-4 w-full"
          onClick={handleAdd}
        >
          Add Item
        </button>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              {item.name}
              <div>
                <button
                  className="bg-red-500 text-white p-2 rounded ml-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white p-2 rounded ml-2"
                  onClick={() => handleUpdate({ ...item, name: item.name + " Updated" })}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
