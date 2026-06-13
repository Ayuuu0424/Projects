import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between items-center px-10 py-4 shadow">
      <h1 className="text-2xl font-bold text-pink-600">BeautyApp</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>
    </div>
  );
}

export default Header;
