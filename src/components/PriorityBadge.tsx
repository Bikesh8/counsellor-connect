interface PriorityBadgeProps {
  priority: "High" | "Medium" | "Low";
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles = {
    High: "bg-badge-high-bg text-badge-high",
    Medium: "bg-badge-medium-bg text-badge-medium",
    Low: "bg-badge-low-bg text-badge-low",
  };

  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[priority]}`}>
      {priority}
    </span>
  );
}
