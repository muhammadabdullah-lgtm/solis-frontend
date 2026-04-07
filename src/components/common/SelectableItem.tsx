const SelectableItem = ({ selected, onClick, children }: any) => (
  <button
    onClick={onClick}
    className={`
      flex-1 text-left text-sm px-2 py-1 rounded-md transition-colors
      ${selected 
        ? "bg-[#feee00] font-semibold text-black" 
        : "text-gray-700 hover:bg-gray-50"
      }
    `}
  >
    {children}
  </button>
);


export default SelectableItem;