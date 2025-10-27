import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const pricingCardVariants = cva("w-full rounded-lg p-4 py-6", {
  variants: {
    variant: {
      default: "bg-white text-foreground",
      highlighted: "bg-linear-to-br from-sidebar-accent to-sidebar text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardIconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "fill-primary text-white",
      highlighted: "fill-white text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardSecondaryTextVariants = cva("text-muted-foreground text-sm", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      highlighted: "text-white/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends VariantProps<typeof pricingCardVariants> {
  title: string;
  description: string;
  price: number;
  priceSuffix: string;
  features: string[];
  buttonText: string;
  className?: string;
  onClick?: () => void;
}

export const PricingCard = ({
  variant,
  title,
  description,
  price,
  priceSuffix,
  features,
  buttonText,
  className,
  onClick,
}: Props) => (
  <div className={cn(pricingCardVariants({ variant }), className, "border")}>
    <div className="flex items-end justify-between gap-x-4">
      <div className="flex flex-col gap-y-1">
        <h6 className="font-medium text-lg">{title}</h6>
        <p className={pricingCardSecondaryTextVariants({ variant })}>
          {description}
        </p>
      </div>
      <div className="flex shrink-0 items-end gap-x-0.5">
        <p className="font-bold text-2xl">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(price)}
        </p>
        <span className={pricingCardSecondaryTextVariants({ variant })}>
          {priceSuffix}
        </span>
      </div>
    </div>
    <div className="py-6">
      <Separator className="text-muted-foreground" />
    </div>
    <Button
      className="w-full"
      onClick={onClick}
      size="lg"
      variant={variant === "highlighted" ? "default" : "outline"}
    >
      {buttonText}
    </Button>
    <div className="mt-6 flex flex-col gap-y-2">
      <p className="font-medium uppercase">Features</p>
      <ul
        className={cn(
          "flex flex-col gap-y-2",
          pricingCardSecondaryTextVariants({ variant })
        )}
      >
        {features.map((feature) => (
          <li className="flex items-center gap-x-2" key={feature}>
            <CircleCheckIcon className={pricingCardIconVariants({ variant })} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
