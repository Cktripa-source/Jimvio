import React from "react";
import Link from "next/link";
import { Twitter, Instagram, Youtube, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Platform: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Influencers", href: "/influencers" },
    { label: "Communities", href: "/communities" },
    { label: "Pricing", href: "/pricing" },
  ],
  Sellers: [
    { label: "Start Selling", href: "/register?role=vendor" },
    { label: "Vendor Dashboard", href: "/dashboard" },
    { label: "Affiliate Program", href: "/affiliates" },
    { label: "Influencer Campaigns", href: "/influencers" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Status", href: "https://status.jimvio.com" },
  ],
};

const socials = [
  { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com/jimvio", label: "Twitter" },
  { icon: <Instagram className="h-4 w-4" />, href: "https://instagram.com/jimvio", label: "Instagram" },
  { icon: <Youtube className="h-4 w-4" />, href: "https://youtube.com/jimvio", label: "YouTube" },
  { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com/company/jimvio", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/50 backdrop-blur-sm pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-brand">
                <span className="text-white font-black">J</span>
              </div>
              <span className="text-2xl font-black text-white">
                JIM<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">VIO</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 mb-5 leading-relaxed max-w-xs">
              The global creator-commerce ecosystem. Buy, sell, affiliate, influence, and build communities in one platform.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-400" />
                <span>Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-400" />
                <span>hello@jimvio.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-400" />
                <span>+250 700 000 000</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} JIMVIO. All rights reserved. Built in Rwanda 🇷🇼
          </p>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/10 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
