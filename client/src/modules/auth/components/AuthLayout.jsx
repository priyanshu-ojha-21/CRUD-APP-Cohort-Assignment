
export default function AuthLayout({ headline, sub, children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[1.05fr_1fr] bg-[#f6f3ec] font-sans text-[#15161b]">
      {/* Brand panel */}
      <aside className="relative overflow-hidden bg-[#15161b] text-[#f6f3ec] flex flex-col justify-between px-8 py-10 md:px-12 md:py-14 min-h-[220px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, transparent 0px, transparent 38px, rgba(246,243,236,0.14) 38px, rgba(246,243,236,0.14) 39px)",
          }}
        />

        <div className="relative font-display font-semibold text-xl tracking-tight">
          Snitch
        </div>

        <div className="relative max-w-[30ch]">
          <h1 className="font-display font-medium leading-[1.08] text-3xl md:text-5xl mb-4">
            {headline}
          </h1>
          <p className="text-sm leading-relaxed text-[#f6f3ec]/70">{sub}</p>
        </div>

        <div className="relative flex justify-between text-xs text-[#f6f3ec]/50 border-t border-[#f6f3ec]/15 pt-4">
          <span>Est. 2026</span>
          <span>snitch.com</span>
        </div>
      </aside>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-12">
        <div className="w-full max-w-[380px]">{children}</div>
      </div>
    </div>
  );
}