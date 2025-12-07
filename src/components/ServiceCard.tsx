import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    description: string;
    index: number;
    className?: string;
    list?: string[];
}

export function ServiceCard({ title, description, index, className, list }: ServiceCardProps) {
    return (
        <div className={cn("glass-panel card-3d p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-red/20 transition-all duration-300 group shadow-lg relative overflow-hidden", className)}>
            <div className="absolute -right-4 -top-4 text-9xl font-heading font-bold text-white/[0.03] group-hover:text-brand-red/[0.05] transition-colors select-none">
                {index.toString().padStart(2, '0')}
            </div>
            <div className="text-brand-red font-heading text-xl font-bold mb-6 tracking-widest uppercase opacity-80">
                Step {index.toString().padStart(2, '0')}
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-wide group-hover:text-brand-red transition-colors">
                {title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-4">
                {description}
            </p>
            {list && list.length > 0 && (
                <ul className="space-y-2 mt-4 border-t border-white/10 pt-4">
                    {list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                            <span className="text-brand-red mt-1">•</span>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
