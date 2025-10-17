import CartProvider from "@/context/CartContext";
import Header from "@/components/Header";
import "./globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
};

export default Layout;
