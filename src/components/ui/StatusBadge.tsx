// src/components/ui/StatusBadge.tsx
const statusColors: Record<string, string> = {
  active: 'bg-[#D3F3E1] text-[#00883D] border-[#00883D]',
  completed: 'bg-[#D1E8FF] text-[#0072CE] border-[#0072CE]',
  pending: 'bg-[#FDE38F] text-[#B28700] border-[#B28700]',
  cancelled: 'bg-[#E8AEAE] text-[#D92037] border-[#D92037]',
  free: 'bg-[#E4E4E4] text-[#555555] border-[#555555]',
  Default: 'bg-gray-500 text-white',
};

interface StatusBadgeProps {
  status: string;
  originalStatus?: string; // Used for color mapping
}

export default function StatusBadge({ status, originalStatus }: StatusBadgeProps) {
  // Use the original status for color mapping if provided, otherwise normalize the displayed status
  const colorKey = originalStatus ? originalStatus.toLowerCase() : status.toLowerCase();

  return (
    <span
      className={`px-4 py-1.5 rounded-[8px] text-sm border font-semibold w-[113px] text-center ${
        statusColors[colorKey as keyof typeof statusColors] || statusColors.Default
      }`}
    >
      {status}
    </span>
  );
}
