import { useEffect, useState } from "react";

export interface VariantOption { 
  option_id: string; 
  value: string; 
  option?: { 
    id: string; 
    title: string; 
  }; 
}

export interface Variant {
  id: string;
  title: string;    
  options: VariantOption[];
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  variants: Variant[];
}

const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:9000/store/products/${productId}`,
          {
            headers: {
              "x-publishable-api-key": "pk_3e97d7962c7bbb01e72d0a33256412669f0e7a5fc8354c5596605c2e3bf86631"
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProduct({
          id: data.product.id,
          title: data.product.title,
          subtitle: data.product.subtitle,
          description: data.product.description,
          variants: data.product.variants || [],
        });

      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading };
};

export default useProduct;
