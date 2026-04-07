import { Star } from "lucide-react"
import { Link } from "react-router-dom"

const OrderItems = ({item, order, isDelivered,reviewed, setReviewItem }: any) => {
    return (
        <div key={item.id} className="flex gap-4 items-start">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product_image_url}
                        alt={item.product_name}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0 hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-sm font-semibold text-gray-900 hover:text-black line-clamp-2"
                      >
                        {item.product_name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">SKU: {item.product_sku}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.currency} {item.unit_price} × {item.quantity}
                      </p>
                      {isDelivered && (
                        reviewed ? (
                          <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                            <Star size={11} className="fill-green-500 stroke-green-500" />
                            Review submitted
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setReviewItem(item)}
                            className="mt-2 flex items-center gap-1 text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg px-2.5 py-1 hover:border-[#feee00] hover:bg-[#feee00]/10 transition-colors"
                          >
                            <Star size={12} className="fill-[#feee00] stroke-[#d4c200]" />
                            Rate & Review
                          </button>
                        )
                      )}
                    </div>
                    <p className="text-sm font-bold text-gray-900 shrink-0">
                      {order.currency} {item.subtotal}
                    </p>
                  </div>
    )
}



export default OrderItems;

