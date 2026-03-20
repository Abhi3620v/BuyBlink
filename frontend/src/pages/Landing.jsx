import { Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  CreditCard,
  Headphones,
  HeartHandshake,
  Quote,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import useAuth from "../context/useAuth";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import BrandLogo from "../components/BrandLogo";

const features = [
  {
    icon: ShieldCheck,
    title: "Curated Premium Quality",
    description:
      "BuyBlink highlights products that look polished, feel reliable, and are ready for repeat orders.",
  },
  {
    icon: Truck,
    title: "Faster Buying Journey",
    description:
      "From product discovery to checkout, every interaction is designed to reduce friction and build confidence.",
  },
  {
    icon: Headphones,
    title: "Support That Feels Personal",
    description:
      "Customer shopping and seller growth are backed by one clean platform with clear guidance.",
  },
];

const categories = [
  {
    title: "Everyday Retail",
    description:
      "Premium consumer products for personal use, gifting, and quick reorder moments.",
    accent: "from-emerald-200 via-white to-white",
  },
  {
    title: "Business Wholesale",
    description:
      "Bulk-ready products for stores, cafes, workspaces, and procurement teams.",
    accent: "from-cyan-200 via-white to-white",
  },
  {
    title: "Eco Lifestyle",
    description:
      "Modern sustainable products that make premium shelves feel more conscious and contemporary.",
    accent: "from-amber-100 via-white to-white",
  },
];

const steps = [
  {
    title: "Browse",
    description:
      "Discover premium collections across retail and wholesale-ready categories.",
  },
  {
    title: "Compare",
    description:
      "Review clean pricing, bulk options, product details, and buyer-friendly presentation.",
  },
  {
    title: "Checkout",
    description:
      "Move through cart, shipping, and payment in a smooth and trustworthy flow.",
  },
  {
    title: "Grow",
    description:
      "Sellers can later expand with dashboard tools while customers continue enjoying a refined storefront.",
  },
];

const testimonials = [
  {
    quote:
      "This feels less like a student project and more like a real marketplace brand. The buying journey is much clearer.",
    name: "Riya Mehta",
    role: "Retail Customer",
  },
  {
    quote:
      "Wholesale shopping is easier when the experience feels premium instead of cluttered. BuyBlink gets that part right.",
    name: "Karan Malhotra",
    role: "Procurement Manager",
  },
  {
    quote:
      "The platform creates a stronger first impression for both shoppers and sellers, which matters a lot for trust.",
    name: "Ananya Verma",
    role: "Brand Consultant",
  },
];

const stats = [
  { value: "12K+", label: "Monthly shoppers" },
  { value: "480+", label: "Seller brands" },
  { value: "96%", label: "Repeat orders" },
  { value: "24/7", label: "Support window" },
];

const featuredProducts = [
  {
    id: 101,
    name: "Reserve Wildflower Honey",
    description:
      "Single-origin honey with rich floral notes and a premium shelf-ready glass jar.",
    retailPrice: 450,
    wholesalePrice: 360,
    minWholesaleQty: 12,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewCount: 148,
  },
  {
    id: 102,
    name: "Signature Roast Coffee",
    description:
      "Balanced roasted beans made for everyday premium brewing and cafe-style flavor.",
    retailPrice: 799,
    wholesalePrice: 640,
    minWholesaleQty: 10,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewCount: 201,
  },
  {
    id: 103,
    name: "Artisan Almond Crunch",
    description:
      "Premium roasted almonds packaged for gifting, pantry restocks, and health-conscious buyers.",
    retailPrice: 699,
    wholesalePrice: 560,
    minWholesaleQty: 15,
    image:
      "https://images.unsplash.com/photo-1514511547117-f4c5e7b1d8f1?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewCount: 124,
  },
];

function Landing() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="bg-[#f7f7f2] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.14),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7f7f2_100%)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.08fr,0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700 shadow-sm">
              <Sparkles size={14} />
              Modern premium commerce
            </div>

            <div className="mt-6">
              <BrandLogo theme="light" />
            </div>

            <h1 className="mt-8 max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
              One premium marketplace for retail shoppers and wholesale buyers.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              BuyBlink combines premium presentation, elegant product discovery,
              and clean checkout into a storefront that feels professional from
              the first scroll to the final purchase.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/retail"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Shop Retail
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/wholesale"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Explore Wholesale
                <Boxes size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-2xl font-black text-slate-950">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="absolute -right-3 bottom-10 h-28 w-28 rounded-full bg-amber-200/60 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/95 p-5 shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                alt="Premium shopping experience"
                className="h-[420px] w-full rounded-[1.6rem] object-cover"
              />

              <div className="absolute bottom-10 left-10 max-w-xs rounded-3xl border border-white/80 bg-white/92 p-5 shadow-xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
                  Built for modern buying
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  A more polished commerce experience.
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Customers enjoy a premium storefront while sellers prepare to
                  scale operations through dashboard tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Features
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Everything a premium storefront should feel like
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The public experience is designed around trust, clarity, and
            elegant buying flow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 text-emerald-700">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
                Categories
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Premium collections for every kind of buyer
              </h2>
            </div>
            <p className="max-w-xl text-slate-600">
              Organised sections help users move faster while keeping the
              storefront feeling elevated and easy to trust.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.title}
                className={`rounded-[1.8rem] border border-slate-200 bg-gradient-to-br ${category.accent} p-8 shadow-sm`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">
                  Curated
                </p>
                <h3 className="mt-5 text-2xl font-black text-slate-950">
                  {category.title}
                </h3>
                <p className="mt-4 max-w-sm leading-7 text-slate-600">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Featured Products
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Customer favorites with premium product storytelling
            </h2>
          </div>
          <Link
            to="/retail"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            View all retail products
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} mode="retail" />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              How It Works
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              From discovery to repeat purchase in four clear steps
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Testimonials
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Trusted by buyers who notice design and reliability
            </h2>
          </div>
          <p className="max-w-xl text-slate-600">
            A premium website should inspire trust quickly. These voices reflect
            the kind of impression BuyBlink is now designed to create.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[1.8rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <Quote size={28} className="text-emerald-500" />
              <p className="mt-5 leading-8 text-slate-600">{item.quote}</p>
              <div className="mt-6">
                <p className="font-semibold text-slate-950">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Statistics
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Momentum that feels enterprise-ready
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 text-center shadow-sm"
              >
                <p className="text-4xl font-black tracking-tight text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-12 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                Newsletter
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Stay ahead of launches, offers, and premium buying insights
              </h2>
              <p className="mt-4 max-w-xl leading-8 text-slate-300">
                Subscribe for product drops, seasonal offers, smarter buying
                tips, and updates as the seller side of BuyBlink keeps evolving.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-emerald-300"
                />
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                  Subscribe Now
                  <ArrowRight size={16} />
                </button>
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <CreditCard size={14} />
                    Offers
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShoppingBag size={14} />
                    New drops
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <HeartHandshake size={14} />
                    Trust
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
