import { useNavigate } from "react-router-dom";
import { useValue } from "../Context/Context";
import "./cart.css";
import { useState } from "react";

export default function Cart() {
  const { allData, cartItems, handleRemoveFromCart } = useValue();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const navigate = useNavigate();

  const cart = allData.filter((product) => cartItems.includes(product.id));

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      navigate("/order");
    }, 3000);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">
          Your cart is empty. Add items to proceed.
        </p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2 className="cart-item-title">{item.title}</h2>
                <p className="cart-item-price">${item.price}</p>
                <button
                  className="cart-item-remove"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <button
          className="cart-purchase-button"
          onClick={handlePurchase}
          disabled={isPurchasing}
        >
          {isPurchasing ? "Purchasing..." : "Purchase All"}
        </button>
      )}
    </div>
  );
}
