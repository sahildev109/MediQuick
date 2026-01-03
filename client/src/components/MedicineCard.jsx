export default function MedicineCard({ medicine }) {

  const handleCart = () => {
    // 1️⃣ Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2️⃣ Check if medicine already exists
    const alreadyInCart = existingCart.find(
      (item) => item._id === medicine._id
    );

    let updatedCart;

    if (alreadyInCart) {
      // 3️⃣ Increase quantity
      updatedCart = existingCart.map((item) =>
        item._id === medicine._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      // 4️⃣ Add new item with qty = 1
      updatedCart = [...existingCart, { ...medicine, qty: 1 }];
    }

    // 5️⃣ Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow transition hover:scale-[1.02] h-110 w-110">
      <h2 className="font-bold text-lg text-[#1c3c71]">{medicine.name}</h2>
      <img src={medicine.image} alt="someimg" className="h-70 w-auto"/>
      <p className="text-sm text-gray-600">{medicine.description}</p>
      <p className="text-[#1c3c71]">₹{medicine.price}</p>

      <button
        className="mt-4 w-full bg-[#467f95] text-white py-2 rounded-lg hover:cursor-pointer hover:bg-[#88ceba]"
        onClick={handleCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
