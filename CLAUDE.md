# pottery-site — Project Notes

## What This Is

**Savi + Tuli Pottery** — an artisanal pottery ecommerce storefront. Gallery-forward aesthetic, designed to feel expressive while staying easy to shop. Brand tagline: "Artistic pottery built for daily ritual."

## Tech Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS with a custom design system (earthy clay/moss/peach palette, Fraunces serif + Manrope sans fonts)
- No router — single-page app, all state in `App.tsx`
- Cart persisted to `localStorage` under key `"pottery-site-cart"`

## Project Structure

```
src/
  App.tsx               — main component; all sections + cart state live here
  components/
    ProductCard.tsx     — individual product tile (image, price, add-to-cart)
    CategoryCard.tsx    — collection overview card with staggered entrance animation
  data/
    pottery.ts          — TypeScript types (Product, Category) + seed data arrays
      categories[]      — 5 collections
      featuredPieces[]  — 6 products (hardcoded, ready to swap with API)
public/assets/pottery/  — 14 product/collection images (cup-01..03, bowl-01, set-01..02, art-01..03, process-01..03)
tailwind.config.ts      — custom colors, shadows, keyframes
```

## What's Built

- Hero section with CTAs
- Collections grid (5 category cards)
- Featured products grid (6 pieces, responsive 2–3 col)
- Studio story/about section
- Slide-out cart drawer (add, increment/decrement qty, remove, subtotal, localStorage persistence)
- Sold-out product state (disabled button)

## What's Not Done Yet

| Feature | Notes |
|---|---|
| Checkout / payment | Button renders but is a no-op; no payment processor wired |
| Category filtering | Category cards link to `#featured` but don't filter; all 6 products always shown |
| Full product catalog | Data supports more (counts: 8 cups, 4 bowls, 3 sets, 5 art, 6 process) but only 6 shown |
| Mobile nav | Desktop nav hidden below `md` breakpoint; no hamburger menu implemented |
| Product detail pages | No routing; no individual product pages |
| Search | None |
| User accounts / wishlist / orders | None |
| Email / newsletter / contact | None |

## Products (seed data)

| ID | Name | Category | Price | In Stock |
|---|---|---|---|---|
| speckled-rim-mug | Speckled Rim Mug | Cups & Mugs | $48 | yes |
| ember-serving-bowl | Ember Serving Bowl | Bowls | $84 | yes |
| sunset-pair | Sunset Pair Set | Sets | $102 | **no** |
| ocean-loop-vessel | Ocean Loop Vessel | Art Objects | $136 | yes |
| coastal-cup | Coastal Cup | Cups & Mugs | $46 | yes |
| wheelborn-form | Wheelborn Form | Studio Process | $95 | yes |

## Design System Notes

- Background: radial gradient (peach → cream → beige) + subtle CSS noise texture via `.hero-noise` utility
- `shadow-card` and `shadow-glow` custom shadows on cards
- Hover effects: translate-y upward + image zoom on ProductCard
- Keyframe animations: `drift` (6s vertical float), `spin-slow` (24s rotation for decorative ring)
- Glass-morphism: `backdrop-blur` + semi-transparent backgrounds in cart drawer

## Cart Implementation

State in `App.tsx`:
```ts
cartItems: Record<string, number>   // productId → quantity
isCartOpen: boolean
```
`cartCount`, `cartProducts`, and `subtotal` are all derived via `useMemo`. Cart drawer uses CSS `translate` (not unmount/remount) so it stays performant on open/close. `aria-hidden` is set when closed.

## Likely Next Steps

1. **Mobile navigation** — hamburger menu for `< md` breakpoint (nav is fully hidden right now)
2. **Category filtering** — filter `featuredPieces` by selected category when a collection card is clicked
3. **More products** — expand `featuredPieces` array or swap in an API; grid layout scales automatically
4. **Checkout** — integrate Stripe or similar; the checkout button is the clear entry point
5. **Product detail view** — could be a modal or a route; add react-router if routing is needed

## Recent Commits

```
91e14fe  slide out cart wired up
2158e52  Add maintainability comments across pottery-site components
7937380  Initial pottery-site implementation
```
