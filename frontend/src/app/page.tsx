"use client";
import { useState, useMemo, useEffect } from "react";
import useProduct from "@/hooks/useProduct";
import { useCart } from "@/context/CartContext";

const colorMap: Record<string, string> = {
  Violet: "#b599c9",
  Beige: "#F5F5DC",
};

const priceMap: Record<string, number> = {
  "Violet|Leather": 2000,
  "Violet|Linen": 1800,
  "Beige|Leather": 2100,
  "Beige|Linen": 1900,
};

const ProductPage = () => {
  const imageUrls = [
    "https://new.exterioramenities.com/_next/image?url=https%3A%2F%2Fmedia.new.exterioramenities.com%2Fmedusa%2Fcypress-retreat-01JW79F9WXDYBRJHP6CBAWX744.png&w=1920&q=75",
    "https://new.exterioramenities.com/_next/image?url=https%3A%2F%2Fmedia.new.exterioramenities.com%2Fmedusa%2Fcypress-retreat-2-01JW79F9WYBB7EDAH39J5DFYDG.png&w=1920&q=75",
  ];
  const productId = "prod_01K7J8MKDNS0PMAMJ5JHX8VMCM";
  const {product, loading}= useProduct(productId);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showBanner, setShowBanner] = useState(false);

  
  useEffect(() => {
    if (!product) return;

    if (!selectedColor) {
      const defaultColor = product.variants[0].options.find(
        (opt) => opt.option?.title.toLowerCase() === "color"
      )?.value;
      setSelectedColor(defaultColor || null);
    }

    if (!selectedMaterial) {
      const defaultMaterial = product.variants[0].options.find(
        (opt) => opt.option?.title.toLowerCase() === "material"
      )?.value;
      setSelectedMaterial(defaultMaterial || null);
    }
  }, [product]);

  const { colors, materials } = useMemo(() => {
    const colorSet = new Set<string>();
    const materialSet = new Set<string>();

    product?.variants.forEach((variant) => {
      variant.options.forEach((opt) => {
        const title = opt.option?.title?.toLowerCase();
        if (title === "color") colorSet.add(opt.value);
        if (title === "material") materialSet.add(opt.value);
      });
    });

    return {
      colors: Array.from(colorSet),
      materials: Array.from(materialSet),
    };
  }, [product]);

    const selectedPrice = useMemo(() => {
    if (!selectedColor || !selectedMaterial) return null;
    const key = `${selectedColor}|${selectedMaterial}`;
    return priceMap[key] || null;
  }, [selectedColor, selectedMaterial]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedMaterial || !selectedPrice) return;

    addToCart({
      productId,
      title: product?.title || "",
      color: selectedColor,
      material: selectedMaterial,
      quantity,
      price: selectedPrice,
      image: imageUrls[currentIndex],
    });

    setShowBanner(true);

    setTimeout(() => setShowBanner(false), 2000);
  };


  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return <p className="p-10">Product not found.</p>;

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen px-5 lg:px-16 py-5 gap-5">
      
      <div className="relative w-full lg:w-1/3 h-[400px] lg:h-[600px] overflow-hidden rounded-2xl shadow-md"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          if (deltaX > 50) handlePrev();
          else if (deltaX < -50) handleNext();
          setTouchStartX(null);
        }}
      >
        {imageUrls.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slika ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover lg:object-contain transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full border border-gray-400 bg-transparent text-gray-500 hover:bg-gray-100 hover:text-black transition-shadow shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full border border-gray-400 bg-transparent text-gray-500 hover:bg-gray-100 hover:text-black transition-shadow shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`text-xl transition-colors duration-200 ${
                currentIndex === index
                  ? "text-gray-500"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[500px] mt-5 lg:mt-0 lg:ml-20">
        <h1 className="text-4xl font-sans mb-4">{product.title}</h1>
        <h2 className="text-2xl font-sans mb-2">{selectedPrice ? `$${selectedPrice}` : "N/A"}</h2>
        <p className="text-gray-700 font-sans leading-relaxed mb-6">{product.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <h3 className="font-sans mr-1">Colors</h3>
              {selectedColor && (
              <span className="text-gray-500">{selectedColor}</span>
            )}
          </div>
          <div className="flex gap-3">
            {colors.map((color) => (
              <div key={color} className="flex flex-col items-center mr-2">
                <button
                  style={{ backgroundColor: colorMap[color] }}
                  className="w-8 h-8 border-2 border-gray-200"
                  onClick={() => setSelectedColor(color)}
                />
                {selectedColor === color && <div className="w-6 h-[1.5px] bg-black mt-2"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-sans mb-3">Materials</h3>
          <div className="relative w-full lg:w-[500px]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-lg px-5 py-3 text-left flex justify-between items-center"
            >
              {selectedMaterial} 
              <span className="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
            {dropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md">
                {materials.map((material) => (
                  <li
                    key={material}
                    className="font-bold px-5 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedMaterial(material);
                      setDropdownOpen(false);
                    }}
                  >
                    {material}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center mt-4 gap-3 flex-nowrap">
          <div className="inline-flex border rounded-lg overflow-hidden text-lg flex-none">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 bg-white hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <span className="px-3 py-2 text-center bg-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 bg-white hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <button
            className="relative w-full lg:w-[500px] px-6 py-3 bg-black hover:bg-gray-500 text-white rounded text-sm"
            disabled={!selectedColor || !selectedMaterial}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
      {showBanner && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Added to cart
        </div>
      )}
    </div>
  );
};

export default ProductPage;
