import React, { useState, useEffect } from 'react';

const PostViewer = () => {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

  // Fetch posts when page changes
  useEffect(() => {
    const loadPosts = async () => {
      if (page === 1) setLoading(true);
      else setFetchingMore(true);

      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
        const totalCount = res.headers.get('x-total-count');
        if (totalCount) {
          setTotalPosts(parseInt(totalCount, 10));
        }
        const data = await res.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => [...prev, ...data]);
          if (data.length < 10) setHasMore(false); // No more posts if we got less than requested
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
        setFetchingMore(false);
      }
    };

    loadPosts();
  }, [page]);

  // Pre-fetch the next page when getting close to the end
  useEffect(() => {
    if (posts.length > 0 && index >= posts.length - 3 && hasMore && !fetchingMore) {
      setPage((prev) => prev + 1);
    }
  }, [index, posts.length, hasMore, fetchingMore]);

  // Handle autoplay
  useEffect(() => {
    let interval;
    if (isAutoPlaying && posts.length > 0) {
      interval = setInterval(() => {
        setIndex((prevIndex) => {
          if (prevIndex < posts.length - 1) {
            return prevIndex + 1;
          } else {
            // Stay on the last post if we are still fetching more
            if (hasMore) return prevIndex;
            // Otherwise, loop back to the start
            return 0;
          }
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length, hasMore]);

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
          {index + 1} of {totalPosts > 0 ? totalPosts : (posts.length + (hasMore ? '+' : ''))}
        </span>

        <button
          disabled={index >= posts.length - 1}
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
      
      {fetchingMore && (
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          Loading more posts...
        </p>
      )}
    </div>
  );
};

export default PostViewer;
