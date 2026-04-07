const FormError = ({ errors }: { errors: string[] }) => {
  if (errors.length === 0) return null;

  return (
    <ul className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 space-y-0.5">
      {errors.map((msg) => (
        <li key={msg} className="flex items-start gap-1.5">
          <span className="mt-px shrink-0">•</span>
          {msg}
        </li>
      ))}
    </ul>
  );
}

export default FormError;
