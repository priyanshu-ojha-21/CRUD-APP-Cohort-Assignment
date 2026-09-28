import { Link } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

export default function ProductCard({ product, onDelete }) {
  const { isAuthenticated } = useAuth();
  const image = product.productImage?.[0];

  return (
    <div className="border border-black/10 rounded-[3px] overflow-hidden bg-[#f6f3ec] flex flex-col">
      <div className="aspect-[4/5] bg-[#ece7db] overflow-hidden">
        {image ? (
          <img src={image} alt={product.productName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8b8a85] text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-display text-lg leading-snug">{product.productName}</h3>

        <div className="flex items-center justify-between mt-1">
          <span className="text-[#15161b] font-medium">₹{product.productPrice}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              product.productStock > 0
                ? "bg-[#d6a93d]/20 text-[#a87f22]"
                : "bg-[#b3452c]/10 text-[#b3452c]"
            }`}
          >
            {product.productStock > 0 ? `${product.productStock} in stock` : "Out of stock"}
          </span>
        </div>

        {isAuthenticated && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-black/10">
            <Link
              to={`/products/${product._id}/edit`}
              className="flex-1 text-center text-sm py-1.5 rounded-[3px] border border-black/15 hover:bg-black/5 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(product._id)}
              className="flex-1 text-sm py-1.5 rounded-[3px] border border-[#b3452c]/30 text-[#b3452c] hover:bg-[#b3452c]/5 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}