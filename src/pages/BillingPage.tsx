import { useState } from "react";
import { Check, Sparkles, Zap, Crown, CreditCard, Calendar, DollarSign, AlertCircle, Receipt, Lock, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBilling, PLANS, Plan, BillingCycle } from "@/contexts/BillingContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const planIcons = {
  starter: Sparkles,
  professional: Zap,
  enterprise: Crown,
};

type CheckoutStep = "details" | "payment" | "review" | "processing" | "success";

export default function BillingPage() {
  const { subscription, invoices, subscribe, cancel } = useBilling();
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<CheckoutStep>("details");
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelConfirmStep, setCancelConfirmStep] = useState<"reason" | "confirm">("reason");

  // Checkout form state
  const [billingInfo, setBillingInfo] = useState({ name: "", email: "", company: "", country: "" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });

  const currentPlan = subscription ? PLANS.find((p) => p.id === subscription.planId) : null;

  const openCheckout = (plan: Plan) => {
    setCheckoutPlan(plan);
    setStep("details");
  };

  const closeCheckout = () => {
    setCheckoutPlan(null);
    setStep("details");
    setBillingInfo({ name: "", email: "", company: "", country: "" });
    setCard({ number: "", name: "", expiry: "", cvc: "" });
  };

  const handleSubscribe = async () => {
    if (!checkoutPlan) return;
    setStep("processing");
    await new Promise((r) => setTimeout(r, 1800));
    const last4 = card.number.replace(/\s/g, "").slice(-4) || "4242";
    subscribe(checkoutPlan, cycle, { last4, brand: "Visa" });
    setStep("success");
  };

  const handleCancel = () => {
    cancel();
    setCancelOpen(false);
    setCancelReason("");
    setCancelConfirmStep("reason");
    toast.success("Subscription cancelled", { description: "You'll continue to have access until the end of your billing cycle." });
  };

  const formatCurrency = (n: number) => `$${n.toFixed(2)}`;
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Plan & Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            subscription ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {subscription ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-foreground">Current Plan</h2>
              {subscription && currentPlan ? (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-0">{currentPlan.name} • {subscription.cycle}</Badge>
              ) : (
                <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted">No Active Subscription</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {subscription && currentPlan
                ? `You're on the ${currentPlan.name} plan. Manage or cancel your subscription anytime.`
                : "You are not subscribed to any plan. Choose a plan below to unlock all features."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Payment:</span>
                <span className="font-semibold text-foreground">
                  {subscription ? `${subscription.paymentBrand} •••• ${subscription.paymentLast4}` : "None"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Renews:</span>
                <span className="font-semibold text-foreground">{subscription ? formatDate(subscription.renewsAt) : "—"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Next bill:</span>
                <span className="font-semibold text-foreground">
                  {subscription && currentPlan
                    ? formatCurrency(subscription.cycle === "monthly" ? currentPlan.monthlyPrice : currentPlan.yearlyPrice)
                    : "—"}
                </span>
              </div>
            </div>

            {subscription && (
              <div className="mt-5 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCancelOpen(true)} className="text-destructive hover:text-destructive">
                  Cancel Subscription
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">Choose your plan</h2>
            <p className="text-sm text-muted-foreground mt-1">Start with what fits today, upgrade as you grow.</p>
          </div>
          <div className="inline-flex items-center bg-muted rounded-lg p-1 text-sm">
            <button
              onClick={() => setCycle("monthly")}
              className={cn("px-4 py-1.5 rounded-md font-medium transition-colors", cycle === "monthly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}
            >
              Monthly
            </button>
            <button
              onClick={() => setCycle("yearly")}
              className={cn("px-4 py-1.5 rounded-md font-medium transition-colors flex items-center gap-2", cycle === "yearly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}
            >
              Yearly <span className="text-[10px] text-emerald-600 font-semibold">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => {
            const Icon = planIcons[plan.id];
            const isCurrent = subscription?.planId === plan.id && subscription?.cycle === cycle;
            const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border bg-card p-6 flex flex-col transition-all",
                  plan.popular ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/40"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary border-0 shadow-md">Most Popular</Badge>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", plan.popular ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">${price}</span>
                    <span className="text-sm text-muted-foreground">/{cycle === "monthly" ? "month" : "year"}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => openCheckout(plan)}
                  disabled={isCurrent}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  {isCurrent ? "Current Plan" : subscription ? `Switch to ${plan.name}` : `Choose ${plan.name}`}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold text-foreground">Billing History</h2>
        <p className="text-sm text-muted-foreground mt-1">Your past invoices and payments</p>

        <div className="mt-5">
          {invoices.length === 0 ? (
            <div className="border border-dashed border-border rounded-lg py-12 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Receipt className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">No invoices yet</p>
              <p className="text-sm text-muted-foreground mt-1">Your billing history will appear here once you subscribe.</p>
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left text-muted-foreground">
                    <th className="px-4 py-2.5 font-medium">Invoice</th>
                    <th className="px-4 py-2.5 font-medium">Date</th>
                    <th className="px-4 py-2.5 font-medium">Plan</th>
                    <th className="px-4 py-2.5 font-medium">Amount</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-t border-border">
                      <td className="px-4 py-3 font-mono text-xs text-foreground">{inv.id}</td>
                      <td className="px-4 py-3 text-foreground">{formatDate(inv.date)}</td>
                      <td className="px-4 py-3 text-foreground">{inv.plan}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{formatCurrency(inv.amount)}</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 capitalize">{inv.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={!!checkoutPlan} onOpenChange={(o) => !o && step !== "processing" && closeCheckout()}>
        <DialogContent className="max-w-2xl">
          {checkoutPlan && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {step === "success" ? "Welcome aboard! 🎉" : `Subscribe to ${checkoutPlan.name}`}
                </DialogTitle>
                <DialogDescription>
                  {step === "details" && "Step 1 of 3 — Tell us about you"}
                  {step === "payment" && "Step 2 of 3 — Secure payment details"}
                  {step === "review" && "Step 3 of 3 — Review and confirm"}
                  {step === "processing" && "Processing your payment securely..."}
                  {step === "success" && "Your subscription is now active."}
                </DialogDescription>
              </DialogHeader>

              {/* Stepper */}
              {step !== "success" && step !== "processing" && (
                <div className="flex items-center gap-2 mb-2">
                  {(["details", "payment", "review"] as CheckoutStep[]).map((s, i) => {
                    const idx = ["details", "payment", "review"].indexOf(step);
                    const active = i <= idx;
                    return (
                      <div key={s} className="flex items-center gap-2 flex-1">
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                          {i + 1}
                        </div>
                        {i < 2 && <div className={cn("h-0.5 flex-1", i < idx ? "bg-primary" : "bg-muted")} />}
                      </div>
                    );
                  })}
                </div>
              )}

              {step === "details" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" value={billingInfo.name} onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={billingInfo.email} onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })} placeholder="jane@agency.com" />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" value={billingInfo.company} onChange={(e) => setBillingInfo({ ...billingInfo, company: e.target.value })} placeholder="Acme Education" />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" value={billingInfo.country} onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })} placeholder="United States" />
                    </div>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardnum">Card number</Label>
                    <div className="relative">
                      <Input
                        id="cardnum"
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: e.target.value.replace(/[^\d ]/g, "") })}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardname">Name on card</Label>
                    <Input id="cardname" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Jane Smith" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="exp">Expiry</Label>
                      <Input id="exp" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "") })} placeholder="123" maxLength={4} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                    <Lock className="w-3.5 h-3.5" />
                    Your payment is encrypted and processed securely.
                  </div>
                </div>
              )}

              {step === "review" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Plan</span>
                      <span className="font-semibold text-foreground">{checkoutPlan.name} ({cycle})</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Billing email</span>
                      <span className="font-medium text-foreground">{billingInfo.email || "—"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment method</span>
                      <span className="font-medium text-foreground">Visa •••• {card.number.replace(/\s/g, "").slice(-4) || "----"}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold text-foreground">Total today</span>
                      <span className="text-xl font-bold text-foreground">
                        {formatCurrency(cycle === "monthly" ? checkoutPlan.monthlyPrice : checkoutPlan.yearlyPrice)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">By subscribing, you agree to our Terms of Service. Your subscription will renew automatically. Cancel anytime.</p>
                </div>
              )}

              {step === "processing" && (
                <div className="py-12 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">Securely processing payment...</p>
                </div>
              )}

              {step === "success" && (
                <div className="py-6 flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">You're now on {checkoutPlan.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">A receipt has been sent to {billingInfo.email || "your email"}.</p>
                  </div>
                </div>
              )}

              {step !== "processing" && (
                <DialogFooter className="gap-2 sm:gap-2">
                  {step === "details" && (
                    <>
                      <Button variant="outline" onClick={closeCheckout}>Cancel</Button>
                      <Button onClick={() => setStep("payment")} disabled={!billingInfo.name || !billingInfo.email}>
                        Continue <ArrowRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {step === "payment" && (
                    <>
                      <Button variant="outline" onClick={() => setStep("details")}><ArrowLeft className="w-4 h-4" /> Back</Button>
                      <Button onClick={() => setStep("review")} disabled={card.number.replace(/\s/g, "").length < 12 || !card.name || !card.expiry || card.cvc.length < 3}>
                        Review order <ArrowRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {step === "review" && (
                    <>
                      <Button variant="outline" onClick={() => setStep("payment")}><ArrowLeft className="w-4 h-4" /> Back</Button>
                      <Button onClick={handleSubscribe}>
                        <Lock className="w-4 h-4" /> Pay {formatCurrency(cycle === "monthly" ? checkoutPlan.monthlyPrice : checkoutPlan.yearlyPrice)}
                      </Button>
                    </>
                  )}
                  {step === "success" && (
                    <Button onClick={closeCheckout} className="w-full">Done</Button>
                  )}
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelOpen} onOpenChange={(o) => { if (!o) { setCancelOpen(false); setCancelConfirmStep("reason"); setCancelReason(""); } }}>
        <DialogContent className="max-w-md">
          {cancelConfirmStep === "reason" ? (
            <>
              <DialogHeader>
                <DialogTitle>Cancel your subscription?</DialogTitle>
                <DialogDescription>
                  We're sorry to see you go. Help us improve by sharing why you're leaving.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <RadioGroup value={cancelReason} onValueChange={setCancelReason}>
                  {["Too expensive", "Missing features I need", "Switching to another tool", "Not using it enough", "Other"].map((r) => (
                    <div key={r} className="flex items-center space-x-2 rounded-md border border-border p-3 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={r} id={r} />
                      <Label htmlFor={r} className="cursor-pointer flex-1 font-normal">{r}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {cancelReason === "Other" && (
                  <Textarea placeholder="Tell us more..." />
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCancelOpen(false)}>Keep my plan</Button>
                <Button variant="destructive" onClick={() => setCancelConfirmStep("confirm")} disabled={!cancelReason}>
                  Continue
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-2">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  Your subscription will be cancelled. You'll lose access to premium features at the end of your current billing period
                  {subscription && ` (${formatDate(subscription.renewsAt)})`}. This action cannot be undone here.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                <p className="text-foreground"><span className="text-muted-foreground">You'll lose:</span> Premium features, priority support, and advanced analytics.</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCancelConfirmStep("reason")}>Go back</Button>
                <Button variant="destructive" onClick={handleCancel}>Yes, cancel subscription</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
