import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Link2, Video, Users } from "lucide-react";

const benefits = [
  { icon: <ShoppingBag className="h-4 w-4" />, title: "Global Marketplace",  desc: "500K+ physical & digital products" },
  { icon: <Link2        className="h-4 w-4" />, title: "Affiliate Network",   desc: "Earn up to 50% commission per sale" },
  { icon: <Video        className="h-4 w-4" />, title: "Viral Clip Engine",   desc: "Promote products, earn automatically" },
  { icon: <Users        className="h-4 w-4" />, title: "Paid Communities",    desc: "Build & monetize your audience" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* ── Left: Form ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-page">
        <div className="p-5 border-b border-base">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-c hover:text-base transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Jimvio
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-sm animate-fade-in">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/images/jimvio-logo.svg"
                alt="Jimvio"
                width={130}
                height={37}
                priority
              />
            </div>
            {children}
          </div>
        </div>

        <div className="p-5 border-t border-base text-center">
          <p className="text-xs text-muted-c">© {new Date().getFullYear()} Jimvio · Built with ❤️ in Rwanda 🇷🇼</p>
        </div>
      </div>

      {/* ── Right: Brand panel ──────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden" style={{ background: "linear-gradient(145deg, #4B2D8F 0%, #7C3AED 60%, #9333ea 100%)" }}>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Orange accent blob */}
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: "#F5A623", filter: "blur(80px)", transform: "translate(30%, 30%)" }} />
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10" style={{ background: "#F5A623", filter: "blur(40px)" }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            {/* White logo on panel */}
            <div className="mb-12">
              <Image src="/images/jimvio-logo-white.svg" alt="Jimvio" width={140} height={40} />
            </div>

            <div className="mb-10">
              <p className="text-purple-200 text-xs font-semibold uppercase tracking-widest mb-3">
                Global Creator-Commerce Platform
              </p>
              <h2 className="text-5xl font-extrabold text-white leading-tight mb-4">
                ACCESS THE<br />
                <span className="text-accent-300" style={{ color: "#F5A623" }}>GLOBAL</span> HUB.
              </h2>
              <p className="text-purple-200 text-base leading-relaxed max-w-sm">
                One account unlocks every role — buy, sell, affiliate, influence, and build paid communities.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 mt-0.5">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{b.title}</p>
                    <p className="text-purple-200 text-xs">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "35,000+",   label: "Active Users"    },
              { value: "RWF 2.4B+", label: "Total Paid Out"  },
              { value: "99.9%",     label: "Uptime"          },
              { value: "50+",       label: "Countries"       },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-3">
                <p className="text-xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-purple-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
