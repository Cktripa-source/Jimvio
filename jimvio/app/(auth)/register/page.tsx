"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Chrome, CheckCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { signUp, signInWithGoogle } from "@/lib/auth/actions";

const roleOptions = [
  { value: "buyer", label: "Buyer", icon: "🛒", desc: "Shop the marketplace" },
  { value: "vendor", label: "Vendor", icon: "🏪", desc: "Sell your products" },
  { value: "affiliate", label: "Affiliate", icon: "🔗", desc: "Earn commissions" },
  { value: "influencer", label: "Influencer", icon: "🎬", desc: "Promote campaigns" },
  { value: "community", label: "Community", icon: "👥", desc: "Build a community" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("buyer");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.append("role", selectedRole);
    startTransition(async () => {
      const result = await signUp(formData);
      if (result?.error) setError(result.error);
      if (result?.success) setSuccess(result.success);
    });
  }

  if (success) {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
        <p className="text-white/60 mb-6">{success}</p>
        <Link href="/login">
          <Button className="w-full" size="lg">Back to Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-2">Create your account</h1>
        <p className="text-white/50">Join 35,000+ creators on JIMVIO</p>
      </div>

      {/* Google Sign Up */}
      <form action={signInWithGoogle as () => void}>
        <Button type="submit" variant="glass" className="w-full mb-5" size="lg">
          <Chrome className="h-5 w-5" />
          Continue with Google
        </Button>
      </form>

      <div className="flex items-center gap-4 mb-5">
        <Separator className="flex-1" />
        <span className="text-white/30 text-xs font-medium uppercase tracking-wider">or email</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="full_name"
          label="Full name"
          placeholder="Jean-Pierre Uwimana"
          icon={<User className="h-4 w-4" />}
          required
        />
        <Input
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<Mail className="h-4 w-4" />}
          required
        />
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Min 8 characters"
          icon={<Lock className="h-4 w-4" />}
          iconRight={
            <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          required
          minLength={8}
        />

        {/* Role selector */}
        <div>
          <label className="text-sm font-medium text-white/80 block mb-2">
            I want to <span className="text-white/40">(choose your primary role)</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {roleOptions.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setSelectedRole(r.value)}
                className={`
                  flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-center
                  ${selectedRole === r.value
                    ? "border-brand-500/60 bg-brand-500/20 shadow-brand"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                  }
                `}
              >
                <span className="text-xl">{r.icon}</span>
                <span className="text-xs font-medium text-white">{r.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-2 text-center">
            You can activate all roles later from your dashboard
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" loading={isPending}>
          <UserPlus className="h-4 w-4" />
          Create Free Account
        </Button>

        <p className="text-xs text-white/30 text-center">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-brand-400 hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-400 hover:underline">Privacy Policy</Link>
        </p>
      </form>

      <p className="text-center text-white/50 text-sm mt-5">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
