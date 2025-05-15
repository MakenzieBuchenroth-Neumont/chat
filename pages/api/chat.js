/**
 * Simple in-memory comment storage
 * Note: This is temporary storage that resets when the server restarts
 * In a production environment, this should be replaced with a database
 */
const comments = [];

/**
 * API route handler for managing comments
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {void} - Sends JSON response with appropriate status code
 */
export default function handler(req, res) {
  // Handle GET requests - retrieve all comments
  if (req.method === 'GET') {
    return res.status(200).json(comments);
  }

  // Handle POST requests - create a new comment
  if (req.method === 'POST') {
    const { name, text } = req.body;
    
    // Create a new comment object with timestamp
    const newComment = {
      name,
      text,
      timestamp: Date.now() // Unix timestamp in milliseconds
    };

    // Add new comment to the beginning of the array
    // Using unshift for LIFO (Last In, First Out) ordering
    comments.unshift(newComment);
    
    return res.status(201).json(newComment);
  }

  // Handle unsupported HTTP methods
  return res.status(405).end(); // Method Not Allowed
}