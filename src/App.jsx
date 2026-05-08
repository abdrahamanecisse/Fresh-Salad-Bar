import { useState, useEffect } from "react";

const menu = [
    { name: "Laitue Fraîche", price: 3, image: "🥬", popular: true },
    { name: "Roquette", price: 3.5, image: "🌿", popular: false },
    { name: "Riz Basmati", price: 4, image: "🍚", popular: true },
];

function App() {
    // ✅ Load cart from localStorage (PRO METHOD)
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    // 🔥 ADD TO CART
    const addToCart = (item) => {
        setCart((prev) => {
            const exist = prev.find((c) => c.name === item.name);

            if (exist) {
                return prev.map((c) =>
                    c.name === item.name
                        ? { ...c, qty: c.qty + 1 }
                        : c
                );
            }

            return [...prev, { ...item, qty: 1 }];
        });
    };

    // 🔥 DECREASE QTY
    const decreaseQty = (item) => {
        setCart((prev) => {
            const exist = prev.find((c) => c.name === item.name);
            if (!exist) return prev;

            if (exist.qty === 1) {
                return prev.filter((c) => c.name !== item.name);
            }

            return prev.map((c) =>
                c.name === item.name
                    ? { ...c, qty: c.qty - 1 }
                    : c
            );
        });
    };

    // 💾 SAVE CART
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // 💰 TOTAL
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    // 🛒 COUNT
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* HERO */}
            <header className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold">🥗 Fresh Salad</h1>
                        <p className="mt-2 text-lg">
                            Crée ton bowl parfait en quelques secondes
                        </p>
                    </div>

                    <div className="bg-black px-5 py-3 rounded-full text-lg font-bold">
                        🛒 {cartCount}
                    </div>
                </div>
            </header>

            {/* MENU */}
            <section className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {menu.map((item) => (
                    <div
                        key={item.name}
                        className="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 transition"
                    >
                        <div className="text-5xl">{item.image}</div>

                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <p className="text-green-600 font-bold">
                                    {item.price.toFixed(2)}€
                                </p>
                            </div>

                            {item.popular && (
                                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                                    Populaire
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => addToCart(item)}
                            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-bold"
                        >
                            Ajouter +
                        </button>
                    </div>
                ))}
            </section>

            {/* PANIER */}
            <section className="bg-white mx-6 mb-10 rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-4">🛒 Mon Panier</h2>

                {cart.length === 0 ? (
                    <p className="text-gray-500">Aucun article ajouté</p>
                ) : (
                    cart.map((item) => (
                        <div
                            key={item.name}
                            className="flex justify-between py-3 border-b"
                        >
                            <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-gray-500">
                                    {item.price}€ x {item.qty}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => decreaseQty(item)}
                                    className="px-3 bg-gray-200 rounded"
                                >
                                    -
                                </button>

                                <button
                                    onClick={() => addToCart(item)}
                                    className="px-3 bg-gray-200 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {/* TOTAL */}
                <div className="mt-6 flex justify-between">
                    <h3 className="text-xl font-bold text-green-600">
                        {total.toFixed(2)}€
                    </h3>

                    <button className="bg-black text-white px-6 py-3 rounded-xl">
                        Commander 🚚
                    </button>
                </div>
            </section>

        </div>
    );
}

export default App;