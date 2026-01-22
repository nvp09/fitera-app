import { useState, useEffect } from "react";

const STORAGE_KEY = "comments";

/** Custom hook for managing comments
* @param {string} postId - Post ID
 * @returns {Object} Comment state and handlers
 */
export function useComments(postId) {
  const [comments, setComments] = useState([]);

  // Load comments from localStorage
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    setComments(storedComments[postId] || []);
  }, [postId]);

  /**
   * Add a new comment
   * @param {Object} comment - Comment object with author, avatar, text
   * @returns {boolean} Success status
   */
  const addComment = (comment) => {
    const newComment = {
      id: Date.now(),
      ...comment,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    stored[postId] = updatedComments;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    return true;
  };

  return {
    comments,
    addComment,
  };
}

