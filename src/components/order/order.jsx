// React Component

import { useValue } from "../../Context/Context";
import "./order.css";

export default function Order() {
  const { cartItems, allData } = useValue();

  // Filter the products that match cart items
  const orders = allData.filter((product) => cartItems.includes(product.id));

  return (
    <div className="order-container">
      <h1 className="order-title">Order Confirmation</h1>
      <p className="order-message">
        Thank you for your order. Your order will be delivered to you soon.
      </p>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            {order.name} - ${order.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
