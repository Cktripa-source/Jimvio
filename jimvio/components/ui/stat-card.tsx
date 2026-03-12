import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  className?: string;
  description?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconColor = "from-brand-600 to-accent-600",
  className,
  description,
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 hover:bg-white/[0.07] transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-white/60">{title}</p>
        {icon && (
          <div className={cn("p-2 rounded-xl bg-gradient-to-br", iconColor)}>
            <span className="text-white [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      {description && <p className="text-xs text-white/40 mb-2">{description}</p>}
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-400" />
          )}
          <span
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-emerald-400" : "text-red-400"
            )}
          >
            {isPositive ? "+" : ""}{change}%
          </span>
          {changeLabel && (
            <span className="text-xs text-white/40">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
