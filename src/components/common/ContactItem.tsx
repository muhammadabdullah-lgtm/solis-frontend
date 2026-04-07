import type { LucideIcon } from "lucide-react";

const ContactItem = ({ Icon, text }: { Icon: LucideIcon; text: string }) => (
  <div className="flex items-center gap-2">
    <Icon size={13} className="text-[#feee00] shrink-0" />
    <span>{text}</span>
  </div>
);


export default ContactItem;