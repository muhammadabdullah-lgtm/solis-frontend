function SectionEmpty({
  icon,
  message,
}: {
  icon: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
      <span className="text-4xl" aria-hidden>
        {icon}
      </span>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}

export default SectionEmpty;
