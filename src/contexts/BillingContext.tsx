import { createContext, useContext, useState, ReactNode } from "react";

export type BillingCycle = "monthly" | "yearly";

export interface Plan {
  id: "starter" | "professional" | "enterprise";
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small agencies getting started",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Up to 50 students",
      "2 team members",
      "Basic application tracking",
      "Email support",
      "1 GB document storage",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing consultancies",
    monthlyPrice: 89,
    yearlyPrice: 890,
    popular: true,
    features: [
      "Up to 500 students",
      "10 team members",
      "Advanced pipeline management",
      "Priority support",
      "20 GB document storage",
      "Custom reports & analytics",
      "API access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large-scale operations",
    monthlyPrice: 249,
    yearlyPrice: 2490,
    features: [
      "Unlimited students",
      "Unlimited team members",
      "Multi-branch support",
      "Dedicated account manager",
      "Unlimited document storage",
      "Advanced integrations",
      "Custom workflows",
      "SSO & advanced security",
    ],
  },
];

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: "paid" | "refunded";
}

export interface Subscription {
  planId: Plan["id"];
  cycle: BillingCycle;
  startedAt: string;
  renewsAt: string;
  paymentLast4: string;
  paymentBrand: string;
}

interface BillingContextValue {
  subscription: Subscription | null;
  invoices: Invoice[];
  subscribe: (plan: Plan, cycle: BillingCycle, payment: { last4: string; brand: string }) => void;
  cancel: () => void;
}

const BillingContext = createContext<BillingContextValue | undefined>(undefined);

export function BillingProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const subscribe: BillingContextValue["subscribe"] = (plan, cycle, payment) => {
    const now = new Date();
    const renews = new Date(now);
    if (cycle === "monthly") renews.setMonth(renews.getMonth() + 1);
    else renews.setFullYear(renews.getFullYear() + 1);

    setSubscription({
      planId: plan.id,
      cycle,
      startedAt: now.toISOString(),
      renewsAt: renews.toISOString(),
      paymentLast4: payment.last4,
      paymentBrand: payment.brand,
    });

    const amount = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    setInvoices((prev) => [
      {
        id: `INV-${Date.now()}`,
        date: now.toISOString(),
        amount,
        plan: `${plan.name} (${cycle})`,
        status: "paid",
      },
      ...prev,
    ]);
  };

  const cancel = () => setSubscription(null);

  return (
    <BillingContext.Provider value={{ subscription, invoices, subscribe, cancel }}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error("useBilling must be used within BillingProvider");
  return ctx;
}
