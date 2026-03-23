interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    "New": "bg-status-new-bg text-status-new",
    "Prospect": "bg-status-prospect-bg text-status-prospect",
  };

  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}
