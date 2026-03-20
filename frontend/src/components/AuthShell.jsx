import { ArrowRight, CheckCircle2, ChevronLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { AUTH_VARIANTS } from "./authTheme";

function AuthShell({
  variant = "customer",
  badge,
  title,
  description,
  formTitle,
  formDescription,
  highlights = [],
  stats = [],
  alternateQuestion,
  alternateText,
  alternateTo,
  children,
}) {
  const theme = AUTH_VARIANTS[variant] || AUTH_VARIANTS.customer;

  return (
    <div className={`min-h-screen px-4 py-6 sm:px-6 lg:px-8 ${theme.surface}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between pb-6">
        <BrandLogo compact />
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
        >
          <ChevronLeft size={16} />
          Back to Store
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.05fr),520px]">
        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950/60 p-6 text-white shadow-[0_30px_80px_rgba(2,6,23,0.34)] backdrop-blur sm:p-8">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] ${theme.badge}`}>
            <ShieldCheck size={14} />
            {badge}
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            {description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-2">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.icon}`}
                >
                  <highlight.icon size={20} />
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">
                  {highlight.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              BuyBlink Promise
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 size={16} className={theme.accentText} />
                Premium storefront and account experience
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 size={16} className={theme.accentText} />
                Ready for later backend integration and live data sync
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 size={16} className={theme.accentText} />
                Built for trust, speed, and clear user journeys
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Secure Access
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">
                {formTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {formDescription}
              </p>
            </div>

            <div
              className={`hidden h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.panel} text-slate-950 sm:flex`}
            >
              <ArrowRight size={20} />
            </div>
          </div>

          <div className="mt-8">{children}</div>

          <p className="mt-6 text-center text-sm text-slate-500">
            {alternateQuestion}{" "}
            <Link
              to={alternateTo}
              className={`font-semibold ${variant === "seller" ? "text-amber-700 hover:text-amber-800" : "text-cyan-700 hover:text-cyan-800"}`}
            >
              {alternateText}
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default AuthShell;
