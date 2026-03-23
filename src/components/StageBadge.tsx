interface StageBadgeProps {
  stage: string;
}

export function StageBadge({ stage }: StageBadgeProps) {
  const styles: Record<string, string> = {
    "New Lead": "bg-stage-new-bg text-stage-new",
    "Contacted": "bg-stage-contacted-bg text-stage-contacted",
    "Interested": "bg-stage-interested-bg text-stage-interested",
    "Counselling": "bg-stage-counselling-bg text-stage-counselling",
    "Application Started": "bg-stage-applied-bg text-stage-applied",
    "Applied": "bg-stage-applied-bg text-stage-applied",
    "Offer Received": "bg-stage-interested-bg text-stage-interested",
    "Visa Process": "bg-stage-counselling-bg text-stage-counselling",
    "Converted": "bg-stage-interested-bg text-stage-interested",
    "Lost": "bg-badge-high-bg text-badge-high",
  };

  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${styles[stage] || "bg-muted text-muted-foreground"}`}>
      {stage}
    </span>
  );
}
