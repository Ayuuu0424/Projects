function ProductCard(props) {
  return (
    <div className="border rounded-lg p-4 w-64">
      <img
        src={props.product.image_link}
        alt={props.product.name}
        className="w-full h-40 object-contain"
      />

      <h2 className="font-bold mt-3">
        {props.product.name.length > 30
          ? props.product.name.slice(0, 30) + "..."
          : props.product.name}
      </h2>

      <p>{props.product.brand}</p>

      <p>₹ {props.product.price}</p>

      <button className="bg-pink-500 flex justify-center items-center">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
