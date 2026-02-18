import { useEffect, useMemo, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import { categories, featuredPieces } from "./data/pottery";

const CART_STORAGE_KEY = "pottery-site-cart";

function getInitialCart() {
  if (typeof window === "undefined") return {};
  const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!savedCart) return {};
  try {
    return JSON.parse(savedCart) as Record<string, number>;
  } catch {
    return {};
  }
}

function App() {
  const [cartItems, setCartItems] = useState<Record<string, number>>(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useMemo(
    () => Object.values(cartItems).reduce((total, quantity) => total + quantity, 0),
    [cartItems]
  );
  const cartProducts = useMemo(
    () => featuredPieces.filter((piece) => (cartItems[piece.id] ?? 0) > 0),
    [cartItems]
  );
  const subtotal = useMemo(() => {
    return cartProducts.reduce((total, piece) => {
      const unitPrice = Number.parseFloat(piece.price.replace("$", ""));
      return total + unitPrice * (cartItems[piece.id] ?? 0);
    }, 0);
  }, [cartItems, cartProducts]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (pieceId: string) => {
    setCartItems((currentItems) => ({
      ...currentItems,
      [pieceId]: (currentItems[pieceId] ?? 0) + 1
    }));
    setIsCartOpen(true);
  };

  const updateQuantity = (pieceId: string, nextQuantity: number) => {
    setCartItems((currentItems) => {
      const updatedItems = { ...currentItems };
      if (nextQuantity <= 0) {
        delete updatedItems[pieceId];
      } else {
        updatedItems[pieceId] = nextQuantity;
      }
      return updatedItems;
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-clay-50 text-ink">
      {/* Ambient texture and color fields that shape the "artsy but usable" look. */}
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-peach/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-[24rem] w-[24rem] animate-drift rounded-full bg-moss/20 blur-3xl" />

      {/* Top-level site navigation and cart entry point. */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#" className="font-display text-3xl tracking-tight text-clay-900">
        Savi + Tuli Pottery
        </a>
        <nav className="hidden gap-8 text-sm uppercase tracking-[0.2em] md:flex">
          <a href="#collections" className="hover:text-clay-700">Collections</a>
          <a href="#featured" className="hover:text-clay-700">Shop</a>
          <a href="#story" className="hover:text-clay-700">Story</a>
        </nav>
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="rounded-full border border-ink px-5 py-2 text-xs uppercase tracking-[0.18em] transition hover:bg-ink hover:text-white"
        >
          Cart ({cartCount})
        </button>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10">
        {/* Hero: brand story + primary actions + featured visual. */}
        <section className="grid items-start gap-10 pb-14 pt-6 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex rounded-full border border-clay-300 bg-white/50 px-4 py-1 text-xs uppercase tracking-[0.2em] text-clay-700">
              Handmade ceramics
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[0.95] text-ink md:text-7xl">
              Artistic pottery built for daily ritual.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink/70">
              Each piece is wheel-thrown and finished by hand. A gallery-forward storefront designed to feel expressive while staying easy to shop.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#featured"
                className="rounded-full bg-ink px-8 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-clay-700"
              >
                Shop featured
              </a>
              <a
                href="#story"
                className="rounded-full border border-ink px-8 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-white"
              >
                Meet the artist
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-8 animate-spinSlow rounded-full border border-dashed border-clay-300/60" />
            <img
              src="/assets/pottery/art-03.jpg"
              alt="Feature pottery"
              className="relative z-10 aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card"
            />
            <div className="absolute -bottom-5 -right-5 z-20 rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-clay-700">New drop</p>
              <p className="font-display text-xl">Saturday 10AM</p>
            </div>
          </div>
        </section>

        {/* Collection cards route users to major shopping/story sections. */}
        <section id="collections" className="pt-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl">Browse collections</h2>
            <p className="max-w-sm text-sm uppercase tracking-[0.15em] text-ink/55">
              5 curated groups to start, expandable as new work is added.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </section>

        {/* Featured items act as the main shoppable product strip. */}
        <section id="featured" className="pt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl">Featured pieces</h2>
            <button
              type="button"
              className="rounded-full border border-ink px-6 py-2 text-xs uppercase tracking-[0.18em] transition hover:bg-ink hover:text-white"
            >
              View all products
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredPieces.map((piece) => (
              <ProductCard key={piece.id} piece={piece} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Studio story section adds craft context and trust signals. */}
        <section id="story" className="mt-20 grid gap-8 rounded-[2rem] border border-clay-100 bg-white/65 p-8 shadow-card backdrop-blur-sm md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-clay-700">About the studio</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">Ceramics with character, made one by one.</h2>
            <p className="mt-4 max-w-2xl text-ink/70">
              The studio focuses on playful silhouettes, earthy glazes, and pieces made to be touched and used. Every form carries fingerprints of the process, making each item slightly unique.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-clay-300 px-4 py-1 text-xs uppercase tracking-[0.14em]">Wheel-thrown</span>
              <span className="rounded-full border border-clay-300 px-4 py-1 text-xs uppercase tracking-[0.14em]">Food-safe glazes</span>
              <span className="rounded-full border border-clay-300 px-4 py-1 text-xs uppercase tracking-[0.14em]">Small batches</span>
            </div>
          </div>
          <img
            src="/assets/pottery/process-03.jpg"
            alt="Pottery studio process"
            className="h-full w-full rounded-3xl object-cover"
          />
        </section>
      </main>

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-clay-100 bg-white p-6 shadow-card transition-transform duration-300 md:w-[28rem] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl">Cart</h2>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full border border-ink px-4 py-2 text-xs uppercase tracking-[0.15em]"
          >
            Close
          </button>
        </div>

        {cartProducts.length === 0 ? (
          <p className="mt-10 text-sm text-ink/60">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mt-6 flex-1 space-y-4 overflow-y-auto">
              {cartProducts.map((piece) => (
                <li key={piece.id} className="rounded-2xl border border-clay-100 p-3">
                  <div className="flex gap-3">
                    <img src={piece.image} alt={piece.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-2xl leading-none">{piece.name}</p>
                      <p className="mt-2 text-sm text-ink/65">{piece.price}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(piece.id, (cartItems[piece.id] ?? 1) - 1)}
                          className="h-8 w-8 rounded-full border border-ink text-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm">{cartItems[piece.id] ?? 0}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(piece.id, (cartItems[piece.id] ?? 0) + 1)}
                          className="h-8 w-8 rounded-full border border-ink text-sm"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => updateQuantity(piece.id, 0)}
                          className="ml-auto text-xs uppercase tracking-[0.14em] text-ink/60 hover:text-ink"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-clay-100 pt-4">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.12em] text-ink/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-2xl bg-ink px-4 py-3 text-sm uppercase tracking-[0.16em] text-white"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
      {isCartOpen && (
        <button
          type="button"
          aria-label="Close cart"
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 z-40 bg-ink/30"
        />
      )}
    </div>
  );
}

export default App;
