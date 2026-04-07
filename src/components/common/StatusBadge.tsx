import type { OrderStatus } from "../../services/orders.service";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const StatusBadge = ({ status }: { status: OrderStatus }) => (
  <span
    className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[status]}`}
  >
    {status}
  </span>
);

export default StatusBadge;
