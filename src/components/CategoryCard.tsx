import type { Category } from "../data/pottery";

type CategoryCardProps = {
  category: Category;
  index: number;
};

export default function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <a
      href={category.href}
      className="group relative isolate block overflow-hidden rounded-[2rem] border border-clay-100/70 bg-white/50 shadow-card backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-glow"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-white/75">{category.tone}</p>
        <h3 className="mt-2 font-display text-3xl leading-tight">{category.name}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-full border border-white/45 px-3 py-1 text-xs uppercase tracking-[0.16em]">
            {category.count} pieces
          </span>
          <span className="text-sm uppercase tracking-[0.16em]">Explore</span>
        </div>
      </div>
    </a>
  );
}
