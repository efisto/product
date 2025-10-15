"use client";
import { useState } from "react";

const variants = [
  { id: "1", color: "Violet", material: "Leather" },
  { id: "2", color: "Violet", material: "Linen" },
  { id: "3", color: "Beige", material: "Leather" },
  { id: "4", color: "Beige", material: "Linen" },
];

const colorMap: Record<string, string> = {
  Violet: "#b599c9",
  Beige: "#F5F5DC",
};

const ProductPage = () => {
  const imageUrls = [
    "https://new.exterioramenities.com/_next/image?url=https%3A%2F%2Fmedia.new.exterioramenities.com%2Fmedusa%2Fcypress-retreat-01JW79F9WXDYBRJHP6CBAWX744.png&w=1920&q=75",
    "https://new.exterioramenities.com/_next/image?url=https%3A%2F%2Fmedia.new.exterioramenities.com%2Fmedusa%2Fcypress-retreat-2-01JW79F9WYBB7EDAH39J5DFYDG.png&w=1920&q=75",
  ];

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("Violet");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Leather");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const selectedVariants = variants.find(
    (variant) => variant.color === selectedColor && variant.material == selectedMaterial
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!selectedVariants) return;
    alert(`Added to cart (Cypress Retreat ${selectedVariants.id})`);
  };

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
        <h1 className="text-4xl font-serif mb-2">Cypress Retreat</h1>
        <h2 className="text-2xl font-serif mb-3">$500.00</h2>
        <p className="text-gray-700 font-serif leading-relaxed mb-5">
          The Cypress Retreat is a nod to traditional design with its elegant lines and durable, high-quality upholstery. A timeless choice, it offers long-lasting comfort and a refined aesthetic for any home.
        </p>

        <div className="mb-4">
          <h3 className="font-serif mb-2">Color</h3>
          <div className="flex gap-3">
            {["Violet", "Beige"].map((color) => (
              <div key={color} className="flex flex-col items-center">
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

        <div className="mb-4">
          <h3 className="font-serif mb-2">Material</h3>
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
                {["Leather", "Linen"].map((material) => (
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
            disabled={!selectedVariants}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
