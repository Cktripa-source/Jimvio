"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn, signInWithGoogle } from "@/lib/auth/actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
        <p className="text-white/50">Sign in to your JIMVIO account</p>
      </div>

      {/* Google Sign In */}
      <form action={signInWithGoogle as () => void}>
        <Button type="submit" variant="glass" className="w-full mb-6" size="lg">
          <Chrome className="h-5 w-5" />
          Continue with Google
        </Button>
      </form>

      <div className="flex items-center gap-4 mb-6">
        <Separator className="flex-1" />
        <span className="text-white/30 text-xs font-medium uppercase tracking-wider">or email</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<Mail className="h-4 w-4" />}
          required
          autoComplete="email"
        />
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          icon={<Lock className="h-4 w-4" />}
          iconRight={
            <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          required
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" loading={isPending}>
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </form>

      <p className="text-center text-white/50 text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
          Create one free
        </Link>
      </p>
    </div>
  );
}
