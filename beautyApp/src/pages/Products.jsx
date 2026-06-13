import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import loading from "../assets/loading.gif";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // page abhi abhi open hoga toh loading nhi hogi na isliye false rkha
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline",
      );

      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isError) {
    return (
      <h1 className="text-center text-red-500 text-2xl mt-10">
        {errorMessage}
      </h1>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <img src={loading} alt="Loading" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 mt-10">
          <h1 className="text-4xl font-bold">Products Page</h1>

          <p>Total Products: {products.length}</p>

          <div className="flex flex-wrap justify-center gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
