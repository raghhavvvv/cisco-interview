import React, { useState, useEffect } from 'react';

const PostViewer = () => {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && posts.length > 0) {
      interval = setInterval(() => {
        setIndex((prevIndex) => {
          if (prevIndex < posts.length - 1) {
            return prevIndex + 1;
          } else {
            return 0;
          }
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (posts.length === 0) return <p>No posts found.</p>;

  const currentPost = posts[index];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
        <span>Post ID: {currentPost.id}</span>
        <h2>{currentPost.title}</h2>
        <p>{currentPost.body}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          Previous
        </button>

        <span style={{ margin: '0 15px' }}>
          {index + 1} of {posts.length}
        </span>

        <button
          disabled={index === posts.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: '15px' }}>
        <button onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
          {isAutoPlaying ? 'Pause Auto Scroll' : 'Start Auto Scroll'}
        </button>
      </div>
    </div>
  );
};

export default PostViewer;
