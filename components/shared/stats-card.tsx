import { type LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ icon: Icon, value, label, trend }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-zulu-indigo/90 rounded-xl border border-zulu-indigo/10 p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zulu-gold/10">
          <Icon className="h-5 w-5 text-zulu-gold" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend.isPositive
              ? 'bg-green-500/10 text-green-500'
              : 'bg-red-500/10 text-red-500'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-zulu-indigo">{value}</p>
        <p className="text-sm text-zulu-indigo/50">{label}</p>
      </div>
    </div>
  );
}
