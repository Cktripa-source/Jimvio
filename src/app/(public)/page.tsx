import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/GlassCard";

export default function HomePage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent animate-fade-in">
          The Global Creator-Commerce Ecosystem
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up">
          One platform. One account. Buy, sell, promote, and grow. Marketplace,
          affiliates, influencers, and communities—unified.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/marketplace">Explore Marketplace</Link>
          </Button>
        </div>
      </section>

      {/* Trending Products Preview */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Trending Products</h2>
          <Button variant="ghost" asChild>
            <Link href="/marketplace">View all</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} href="/marketplace">
              <GlassCard className="h-full hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="aspect-square bg-muted rounded-lg mb-4" />
                <h3 className="font-semibold">Product {i}</h3>
                <p className="text-sm text-muted-foreground">$99.00</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Vendors */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Top Vendors</h2>
          <Button variant="ghost" asChild>
            <Link href="/vendors">View all</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Link key={i} href="/vendors">
              <GlassCard className="h-full hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted" />
                <div>
                  <h3 className="font-semibold">Vendor {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    Electronics & Gadgets
                  </p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Marketplace Categories Grid */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "Electronics",
            "Fashion",
            "Software",
            "Courses",
            "AI Tools",
            "Templates",
          ].map((cat) => (
            <Link key={cat} href={`/categories?q=${cat.toLowerCase()}`}>
              <GlassCard className="text-center py-4 hover:scale-[1.02] transition-transform cursor-pointer">
                <span className="font-medium">{cat}</span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How JIMVIO Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Account</h3>
            <p className="text-muted-foreground">
              Sign up once. Activate any role: Buyer, Vendor, Affiliate,
              Influencer, or Community Owner.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Path</h3>
            <p className="text-muted-foreground">
              Switch roles dynamically. Sell products, earn commissions, run
              campaigns, or build communities.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Scale & Grow</h3>
            <p className="text-muted-foreground">
              Leverage our ecosystem. Physical & digital products, affiliate
              network, influencer marketing, and paid communities.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard>
            <p className="text-muted-foreground italic mb-4">
              &ldquo;JIMVIO helped me scale my digital product business 10x in 6
              months. The affiliate network is incredible.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div>
                <p className="font-semibold">Sarah K.</p>
                <p className="text-sm text-muted-foreground">Vendor</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <p className="text-muted-foreground italic mb-4">
              &ldquo;As an affiliate, I earn consistent commissions promoting
              products I believe in. The dashboard makes tracking effortless.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div>
                <p className="font-semibold">Mike T.</p>
                <p className="text-sm text-muted-foreground">Affiliate</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <p className="text-muted-foreground italic mb-4">
              &ldquo;My community grew from 0 to 5,000 paid members. The
              subscription tools are top-notch.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div>
                <p className="font-semibold">Alex R.</p>
                <p className="text-sm text-muted-foreground">Community Owner</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <GlassCard className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Ready to join the ecosystem?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start with a free account. No credit card required.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Create Free Account</Link>
          </Button>
        </GlassCard>
      </section>
    </div>
  );
}
