import type { Product } from "../data/pottery";

type ProductCardProps = {
  piece: Product;
};

export default function ProductCard({ piece }: ProductCardProps) {
  return (
    <article className="group rounded-3xl border border-clay-100/80 bg-white/75 p-3 shadow-card backdrop-blur-sm transition hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={piece.image}
          alt={piece.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-[0.14em] text-ink">
          {piece.category}
        </div>
      </div>
      {/* Price and name stay visible above the fold before CTA interaction. */}
      <div className="flex items-end justify-between gap-3 px-2 pb-2 pt-4">
        <div>
          <h3 className="font-display text-2xl leading-tight text-ink">{piece.name}</h3>
          <p className="mt-1 text-sm text-ink/65">Handmade in small batches</p>
        </div>
        <p className="text-lg font-semibold text-clay-700">{piece.price}</p>
      </div>
      <button
        type="button"
        disabled={!piece.available}
        // Disabled style is used to preserve layout for sold-out one-off pieces.
        className="mt-1 w-full rounded-2xl border border-ink px-4 py-3 text-sm uppercase tracking-[0.15em] transition disabled:cursor-not-allowed disabled:border-clay-100 disabled:bg-clay-50 disabled:text-clay-300 enabled:hover:bg-ink enabled:hover:text-white"
      >
        {piece.available ? "Add to cart" : "Sold out"}
      </button>
    </article>
  );
}
