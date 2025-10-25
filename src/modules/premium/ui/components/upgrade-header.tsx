import type { Product } from "@polar-sh/sdk/models/components/product.js";

interface Props {
  currentSubscription: Product | null;
}

export const UpgradeHeader = ({ currentSubscription }: Props) => (
  <div>
    <h5 className="font-medium text-xl">Your subscription</h5>
    <p className="text-muted-foreground text-sm">
      You are on the{" "}
      <span className="font-semibold text-primary">
        {currentSubscription?.name ?? "Free"}
      </span>{" "}
      plan.
    </p>
  </div>
);
