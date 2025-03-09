const statusColors: Record<string, string> = {
  Active: 'bg-[#D3F3E1] text-[#00883D]  border-[#00883D]',
  Pending: 'bg-[#FDE38F] text-[#B28700]  border-[#B28700]',
  Cancelled: 'bg-[#E8AEAE] text-[#D92037]  border-[#D92037]',
  Default: 'bg-gray-500 text-white',
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-4 py-1.5 rounded-[8px] text-sm border font-semibold w-[113px] text-center  ${
        statusColors[status as keyof typeof statusColors] || statusColors.Default
      }`}
    >
      {status}
    </span>
  );
}
