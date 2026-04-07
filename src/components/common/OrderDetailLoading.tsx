const OrderDetailLoading = () => {
    return (
         <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-24 animate-pulse" />
          ))}
        </div>
      </div>
    )
}


export default OrderDetailLoading;