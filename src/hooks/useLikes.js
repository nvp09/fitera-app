import { useState, useEffect } from "react";

const STORAGE_KEY = "likes";

/**
 * Custom hook for managing likes
 * @param {string} postId - Post ID
 * @param {Object} user - Current user object
 * @returns {Object} Like state and handlers
 */
export function useLikes(postId, user) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // Load likes from localStorage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const postLikes = storedLikes[postId] || {
      count: 0,
      users: [],
    };

    setLikeCount(postLikes.count);
    setLiked(user && postLikes.users.includes(user.id));
  }, [postId, user]);

  /**
   * Toggle like status
   * @returns {boolean} Success status
   */
  const toggleLike = () => {
    if (!user) return false;

    const storedLikes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const postLikes = storedLikes[postId] || {
      count: 0,
      users: [],
    };

    if (liked) {
      postLikes.count -= 1;
      postLikes.users = postLikes.users.filter((id) => id !== user.id);
      setLiked(false);
    } else {
      postLikes.count += 1;
      postLikes.users.push(user.id);
      setLiked(true);
    }

    storedLikes[postId] = postLikes;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedLikes));
    setLikeCount(postLikes.count);

    return true;
  };

  return {
    likeCount,
    liked,
    toggleLike,
  };
}

