"use client";

import React, { useState, useEffect } from 'react';

function Rating() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [allRatings, setAllRatings] = useState<number[]>([]);
  const [feedbacks, setFeedbacks] = useState<{ name: string; comment: string }[]>([]);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('allRatings') || '[]');
    const savedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setAllRatings(savedRatings);
    setFeedbacks(savedFeedbacks);
  }, []);

  const averageRating = allRatings.length ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1) : '0';
  const ratingPercentage = allRatings.length ? ((Number(averageRating) / 5) * 100).toFixed(1) : '0';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && comment && rating) {
      const newRatings = [...allRatings, rating];
      const newFeedbacks = [...feedbacks, { name, comment }];
      setAllRatings(newRatings);
      setFeedbacks(newFeedbacks);
      localStorage.setItem('allRatings', JSON.stringify(newRatings));
      localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));
      alert("Komentar dan rating berhasil dikirim!");
      setName('');
      setComment('');
      setRating(0);
    } else {
      alert("Mohon isi semua kolom dan pilih rating.");
    }
  };

  const handleDelete = (index: number) => {
    const newFeedbacks = feedbacks.filter((_, i) => i !== index);
    setFeedbacks(newFeedbacks);
    alert("Komentar berhasil dihapus!");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", color: "#000" }}>
      <h2 style={{ color: "#333" }}>Formulir Komentar</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Nama:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="comment" style={{ display: "block", marginBottom: "5px" }}>Komentar:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Rating:</label>
          <div style={{ display: "flex", gap: "5px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: star <= rating ? "#FFD700" : "#ccc"
                }}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Kirim Komentar
        </button>
      </form>

      <div style={{ marginTop: "2em" }}>
        <h3>Rata-Rata Rating: {averageRating} dari 5 bintang</h3>
        <div style={{ width: "100%", backgroundColor: "#f1f1f1", borderRadius: "4px", height: "20px", margin: "10px 0" }}>
          <div style={{ width: `${ratingPercentage}%`, backgroundColor: "#4caf50", height: "100%", borderRadius: "4px" }} />
        </div>
        <div style={{ textAlign: "center" }}>{ratingPercentage}%</div>
      </div>

      <div style={{ marginTop: "2em" }}>
        <h3>Daftar Komentar</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f9f9f9" }}>Nama</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f9f9f9" }}>Komentar</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f9f9f9" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{feedback.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{feedback.comment}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                  <button onClick={() => handleDelete(index)} style={{ backgroundColor: "#ff4d4d", color: "#fff", border: "none", borderRadius: "4px", padding: "5px 10px", cursor: "pointer" }}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rating;
