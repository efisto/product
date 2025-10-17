"use client";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0)
    return <p className="p-10 text-center text-gray-500">Your cart is empty.</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl mb-6">Your shopping cart</h1>

      {cart.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-4 border-b pb-6 gap-6"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-xl mb-1">{item.title}</h2>
            <p className="text-gray-500 text-sm">{item.color} / {item.material}</p>
            <div className="inline-flex items-center gap-1 mt-2 border rounded">
              <button
                onClick={() => updateQuantity(index, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className={`px-2 py-2 ${item.quantity <= 1 ? "text-gray-300" : "text-black"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(index, item.quantity + 1)}
                className="px-2 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

          </div>
          <div className="flex flex-col items-end">
            <p>${item.price * item.quantity}</p>
            <button
              onClick={() => removeFromCart(index)}
              className="text-red-500 hover:text-black mt-4 mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6 text-xl font-bold">
        Total: ${total}
      </div>
    </div>
  );
};

export default CartPage;
