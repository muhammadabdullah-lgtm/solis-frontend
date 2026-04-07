
const TextLink = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="text-xs text-gray-500 hover:text-black transition-colors text-left"
  >
    {children}
  </button>
);



export default TextLink;

