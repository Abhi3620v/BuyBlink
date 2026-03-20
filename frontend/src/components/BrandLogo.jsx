import { Leaf, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function BrandLogo({
  to = "/",
  compact = false,
  onClick,
  theme = "dark",
  showTagline = true,
}) {
  const darkTheme = theme === "dark";
  const titleClass = darkTheme ? "text-white" : "text-slate-950";
  const subtitleClass = darkTheme ? "text-slate-400" : "text-slate-500";

  return (
    <Link to={to} onClick={onClick} className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-300 to-amber-300 text-slate-950 shadow-lg shadow-emerald-900/20">
        <ShoppingBag size={compact ? 16 : 18} strokeWidth={2.3} />
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/70 bg-white text-emerald-600">
          <Leaf size={11} strokeWidth={2.4} />
        </div>
      </div>

      <div>
        <p
          className={`font-black uppercase tracking-[0.22em] ${titleClass} ${
            compact ? "text-sm" : "text-base"
          }`}
        >
          BuyBlink
        </p>
        {showTagline && (
          <p
            className={`uppercase tracking-[0.24em] ${subtitleClass} ${
              compact ? "text-[9px]" : "text-[10px]"
            }`}
          >
            Premium Marketplace
          </p>
        )}
      </div>
    </Link>
  );
}

export default BrandLogo;
