import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

const skis = {
    '1': {
        name: 'Salomon QST 99',
        imageUrl: 'https://example.com/qst99.jpg',
        description: 'Great all-mountain skis for intermediate to advanced skiers.',
        reviews: [
            {
                user: 'John Doe',
                rating: 4,
                comment: 'These skis are fantastic for the casual skier!'
            }
        ]
    }
};

const snowboardDetails = ({ skiId }) => {
    const ski = skis[skiId];
    const [reviews, setReviews] = useState(ski.reviews);
    const [newReview, setNewReview] = useState({
        user: '',
        comment: '',
        rating: 0
    });

    if (!ski) {
        return <div>No snowboard found!</div>;
    }

    const handleRatingChange = (newRating) => {
        setNewReview({...newReview, rating: newRating});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewReview({...newReview, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setReviews([...reviews, newReview]);
        setNewReview({ user: '', comment: '', rating: 0 });
    };

    return (
        <div className="page-container">
            <div className="header">
                <h1>{ski.name}</h1>
            </div>
            <div className="ski-details">
                <img src={ski.imageUrl} alt={ski.name} className="ski-image" />
                <div className="ski-info">
                    <h2>{ski.name}</h2>
                    <p>{ski.description}</p>
                </div>
            </div>
            <div className="reviews">
                <h3>Reviews</h3>
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <h4>{review.user}</h4>
                        <ReactStars value={review.rating} size={24} edit={false} />
                        <p>{review.comment}</p>
                    </div>
                ))}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="user" value={newReview.user} onChange={handleChange} placeholder="Your name" required />
                    <textarea name="comment" value={newReview.comment} onChange={handleChange} placeholder="Your review" required />
                    <ReactStars value={newReview.rating} size={24} onChange={handleRatingChange} activeColor="#ffd700" />
                    <button type="submit" className="button">Add Review</button>
                </form>
            </div>
            <button className="button" onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
};

export default snowboardDetails;