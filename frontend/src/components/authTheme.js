export const AUTH_VARIANTS = {
  seller: {
    surface:
      "bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf0_0%,_#f8fafc_52%,_#f0fdf4_100%)]",
    panel: "from-amber-300 via-emerald-300 to-cyan-300",
    badge: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
    icon: "bg-amber-100 text-amber-800",
    button: "bg-amber-400 text-slate-950 hover:bg-amber-300",
    focus: "focus:border-amber-400 focus:ring-amber-400/20",
    accentText: "text-amber-700",
  },
  customer: {
    surface:
      "bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.16),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_#ecfeff_0%,_#f8fafc_52%,_#f0fdf4_100%)]",
    panel: "from-cyan-300 via-emerald-300 to-rose-300",
    badge: "bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200",
    icon: "bg-cyan-100 text-cyan-800",
    button: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    focus: "focus:border-cyan-400 focus:ring-cyan-400/20",
    accentText: "text-cyan-700",
  },
};

export const AUTH_FIELD_BASE =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4";
