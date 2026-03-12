import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 to-slate-950/60" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-600/25 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-accent-600/20 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-black">J</span>
            </div>
            <span className="text-2xl font-black text-white">
              JIM<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">VIO</span>
            </span>
          </Link>

          <div>
            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              Your Gateway to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">
                Creator Commerce
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed max-w-md">
              One account unlocks a marketplace, affiliate network, influencer platform, and community builder.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🛒", text: "Buy & sell physical and digital products" },
                { icon: "🔗", text: "Earn commissions as an affiliate" },
                { icon: "🎬", text: "Run influencer campaigns with viral clips" },
                { icon: "👥", text: "Build and monetize paid communities" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-white/70 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} JIMVIO. Built with ❤️ in Rwanda 🇷🇼
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-slate-950">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">J</span>
              </div>
              <span className="text-xl font-black text-white">
                JIM<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">VIO</span>
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
