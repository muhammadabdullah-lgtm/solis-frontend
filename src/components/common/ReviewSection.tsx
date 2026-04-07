import type { ApiReview, ReviewsResponse } from "../../services/products.service";
import { formatDateShort } from "../../lib/utils";
import StarRating from "./StartRating";

const ReviewsSection = ({ reviews }: { reviews: ReviewsResponse | null }) => {
  if (!reviews) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-sm text-gray-400 text-center">
        Reviews unavailable.
      </div>
    );
  }

  const reviewList = Array.isArray(reviews.reviews) ? reviews.reviews : [];
  const total = reviews.total ?? reviewList.length;
  const avgRating =
    reviews.average_rating != null ? Number(reviews.average_rating) : null;

  if (total === 0 && reviewList.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
        <p className="text-3xl mb-2">💬</p>
        <p className="text-sm text-gray-400">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {avgRating !== null && !isNaN(avgRating) && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-black text-gray-900">
                {avgRating.toFixed(1)}
              </p>
              <StarRating rating={avgRating} size="sm" />
              <p className="text-xs text-gray-400 mt-1">{total} reviews</p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = Number(reviews.rating_breakdown?.[String(star)] ?? 0);
                const pct = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-right text-gray-500">{star}</span>
                    <span className="text-amber-400 leading-none">★</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-5 text-gray-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {reviewList.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }: { review: ApiReview }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
    <div className="flex items-start justify-between gap-2 mb-2">
      <div>
        <p className="text-sm font-semibold text-gray-900">{review.user_name}</p>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <time className="text-xs text-gray-400 shrink-0">
        {formatDateShort(review.created_at)}
      </time>
    </div>
    {review.body && (
      <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
    )}
  </div>
);

export default ReviewsSection;
