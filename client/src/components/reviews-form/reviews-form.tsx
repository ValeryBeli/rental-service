import React, { useState, FormEvent, ChangeEvent } from "react";
import { Review } from '../../types/review';

type ReviewsFormProps = {
  onSubmit: (review: Review) => Promise<void>;
  isLoading?: boolean;
};

const MIN_REVIEW_LENGTH = 10;

function ReviewsForm({ onSubmit, isLoading = false }: ReviewsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    review: ''
  });

  const trimmedLength = formData.review.trim().length;
  const remaining = Math.max(0, MIN_REVIEW_LENGTH - trimmedLength);
  const isSubmitDisabled = formData.rating === 0 || trimmedLength < MIN_REVIEW_LENGTH;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rating: Number(evt.target.value)
    }));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      review: evt.target.value
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isSubmitDisabled || isSubmitting) {
      return;
    }

    const newReview: Review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      rating: formData.rating,
      comment: formData.review.trim(),
      user: {
        name: 'You',
        avatarUrl: 'img/avatar-max.jpg',
        isPro: false
      }
    };

    setIsSubmitting(true);
    
    onSubmit(newReview)
      .then(() => {
        // Очищаем форму только после успешной отправки
        setFormData({
          rating: 0,
          review: ''
        });
      })
      .catch(() => {
        // При ошибке форма остаётся заполненной, пользователь может повторить попытку
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((num) => (
          <React.Fragment key={num}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={num}
              id={`${num}-stars`}
              type="radio"
              checked={formData.rating === num}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${num}-stars`}
              className="reviews__rating-label form__rating-label"
              title={`Rate ${num}`}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="/img/sprite.svg#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay..."
        value={formData.review}
        onChange={handleReviewChange}
      ></textarea>

      <div className="reviews__help-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <p className="reviews__help" style={{margin: 0}}>
          To submit review please make sure to set{" "}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{" "}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <div style={{fontSize: '0.9rem', color: trimmedLength >= MIN_REVIEW_LENGTH ? '#4CAF50' : '#999'}}>
          {trimmedLength} / {MIN_REVIEW_LENGTH}{remaining > 0 ? ` (need ${remaining})` : ' ✓'}
        </div>
      </div>

      <div className="reviews__button-wrapper" style={{marginTop: '8px'}}>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export { ReviewsForm };