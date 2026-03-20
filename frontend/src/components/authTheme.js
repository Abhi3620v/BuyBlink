export const AUTH_VARIANTS = {
  seller: {
    surface:
      "bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.14),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_#0f172a_0%,_#111827_52%,_#020617_100%)]",
    panel: "from-amber-300 via-emerald-300 to-cyan-300",
    badge: "bg-amber-400/12 text-amber-100 ring-1 ring-amber-300/20",
    icon: "bg-amber-300/14 text-amber-100",
    button: "bg-amber-400 text-slate-950 hover:bg-amber-300",
    focus: "focus:border-amber-400 focus:ring-amber-400/20",
    accentText: "text-amber-200",
  },
  customer: {
    surface:
      "bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(244,114,182,0.1),_transparent_26%),linear-gradient(180deg,_#0f172a_0%,_#111827_52%,_#020617_100%)]",
    panel: "from-cyan-300 via-emerald-300 to-rose-300",
    badge: "bg-cyan-400/12 text-cyan-100 ring-1 ring-cyan-300/20",
    icon: "bg-cyan-300/14 text-cyan-100",
    button: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    focus: "focus:border-cyan-400 focus:ring-cyan-400/20",
    accentText: "text-cyan-200",
  },
};

export const AUTH_FIELD_BASE =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4";
