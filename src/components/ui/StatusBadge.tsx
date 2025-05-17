const statusColors: Record<string, string> = {
  Active: 'bg-[#D3F3E1] text-[#00883D] border-[#00883D]',
  Completed: 'bg-[#D1E8FF] text-[#0072CE] border-[#0072CE]',
  Pending: 'bg-[#FDE38F] text-[#B28700] border-[#B28700]',
  Cancelled: 'bg-[#E8AEAE] text-[#D92037] border-[#D92037]',
  Free: 'bg-[#E4E4E4] text-[#555555] border-[#555555]',
  Default: 'bg-gray-500 text-white',
};

export default function StatusBadge({ status }: { status: string }) {
  // Normalize status for case-insensitive matching
  const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <span
      className={`px-4 py-1.5 rounded-[8px] text-sm border font-semibold w-[113px] text-center ${
        statusColors[normalizedStatus as keyof typeof statusColors] || statusColors.Default
      }`}
    >
      {status}
    </span>
  );
}
