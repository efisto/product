"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const { cart } = useCart();
    const pathname = usePathname();
    
    return (
    <header className="sticky top-0 z-50 p-3 bg-white flex justify-between items-center">
        <div className="flex items-center gap-4">
            {pathname === "/cart" && (
                <Link href="/" className="text-2xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
            )}
            <h1 className="text-xl font-bold">SofaSocietyCo.</h1>
        </div>

      <Link href="/cart" className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>

        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full px-2">
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
