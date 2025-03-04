import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";

function ProductDisplay() {
  const [selectedIds, setSelectedIds] = useState([]);
  console.log(selectedIds);
  const queryClient = useQueryClient();

  // for fetching all products
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/product/products`,
      {
        headers: { token },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // for deleting individual product
  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    if (!id) {
      throw new Error("Product ID is required");
    }

    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/product/delete-product/${id}`,
      { headers: { token } }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      const message = data.message || "Product deleted successfully";
      toast.success(message);

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      toast.error(error.message || "Failed to delete product");
    },
  });

  const handleDeleteProduct = (id) => {
    mutation.mutate(id);
  };

  function handleSelectedProduct(id) {
    if (selectedIds.includes(id)) {
      const updatedIds = selectedIds.filter((itemId) => id !== itemId);
      setSelectedIds(updatedIds);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  // for deleting multiple products

  function handleMultipleDelete() {}

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Bikes</h2>
        {selectedIds.length > 1 && (
          <button onClick={handleMultipleDelete} className="btn btn-error">
            Delete {selectedIds.length} products
          </button>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table min-w-[800px]">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Model</th>
              <th>Condition</th>
              <th>CC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.products && data.products.length > 0
              ? data.products.map((product) => (
                  <tr key={product._id}>
                    <th>
                      <label>
                        <input
                          onChange={() => handleSelectedProduct(product._id)}
                          type="checkbox"
                          className="checkbox"
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={product.images[0]} alt="Bike Image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.bikeName}</div>
                          <div className="text-sm opacity-50">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{product.model}</td>
                    <td>
                      {product.condition === "New" ? (
                        <div className="badge badge-success">
                          {product.condition}
                        </div>
                      ) : (
                        <div className="badge badge-info">
                          {product.condition}
                        </div>
                      )}
                    </td>
                    <td>{product.cc}</td>
                    <td>
                      <div className="flex gap-2">
                        <div className="tooltip" data-tip="edit">
                          <button className="btn btn-info px-2  btn-sm">
                            <Pencil size={20} />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="view">
                          {" "}
                          <button className="btn px-2 btn-success btn-sm">
                            <Eye size={20} />
                          </button>
                        </div>

                        <div className="tooltip" data-tip="delete">
                          <button
                            disabled={
                              mutation.isPending || selectedIds.length > 1
                            }
                            onClick={() => handleDeleteProduct(product._id)}
                            className="btn px-2 btn-error btn-sm"
                          >
                            {mutation.isPending ? (
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : "There are no products"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDisplay;
