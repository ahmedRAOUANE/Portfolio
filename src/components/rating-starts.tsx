"use client";

import { useState } from "react";
import { Translations } from "@/utils/types/translations";

const RatingStars = ({ translations }: { translations: Translations }) => {
    const [rating, setRating] = useState(5);

    return (
        <div className="rating">
            <label htmlFor="rating">{translations.feedback.rating}</label>

            <div className="flex items-center space-x-2 mt-2 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl transition-colors duration-200 ${
                            star <= rating ? "text-warning" : "text-light"
                        }`}
                        aria-label={`${star} ${translations.feedback.rating} star`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") setRating(star);
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>

            <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className="hidden"
            />
        </div>
    );
};

export default RatingStars;