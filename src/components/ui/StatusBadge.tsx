const statusColors: Record<string, string> = {
  Active: 'bg-green-300 text-black',
  Pending: 'bg-yellow-300 text-black',
  Cancelled: 'bg-red-500 text-white',
  Default: 'bg-gray-500 text-white',
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-4 py-1.5 rounded text-sm font-semibold min-w-32 max-w-xs text-center ${
        statusColors[status as keyof typeof statusColors] || statusColors.Default
      }`}
    >
      {status}
    </span>
  );
}
