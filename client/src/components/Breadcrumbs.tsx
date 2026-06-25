import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
  activeClassName?: string;
}

export default function Breadcrumbs({
  items,
  className = "",
  linkClassName = "",
  iconClassName = "",
  activeClassName = "",
}: BreadcrumbsProps) {
  const baseLinkClass = linkClassName || "text-muted-foreground hover:text-primary transition-colors";
  const baseIconClass = iconClassName || "text-muted-foreground";
  const baseActiveClass = activeClassName || "text-foreground font-medium";

  return (
    <nav aria-label="Breadcrumb" className={`py-4 ${className}`.trim()}>
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className={`flex items-center ${baseLinkClass}`}>
            <Home className={`h-4 w-4 ${baseIconClass}`} />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className={`h-4 w-4 ${baseIconClass}`} />
            {item.href ? (
              <Link href={item.href} className={baseLinkClass}>
                {item.label}
              </Link>
            ) : (
              <span className={baseActiveClass}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
