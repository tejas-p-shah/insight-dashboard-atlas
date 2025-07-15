import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  trend?: string;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = 'text-primary',
  subtitle,
  trend,
  className 
}) => {
  return (
    <div className={cn(
      "bg-background/60 backdrop-blur-md border border-border/50 rounded-lg p-4 shadow-md",
      "hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out",
      "hover:bg-background/70 hover:border-border/70",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 bg-background/50 rounded-lg", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default KPICard;