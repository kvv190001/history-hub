import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

const ReadPost = () => {

    const { id } = useParams()
    const [post, setPost] = useState({ id: 0, created_at: "", title: "", content: "", image_url: "", upvotes: 0, comments: [] })

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('HistoryPosts')
                .select('*')
                .eq('id', id)
                .single()

            setPost(data)
        }

        fetchPost();
    }, [id])

    const formatTimeAgo = (timestamp) => {
        const now = new Date()
        const postDate = new Date(timestamp)
        const hoursAgo = Math.floor((now - postDate) / (1000 * 60 * 60))

        if (hoursAgo < 1) return "Just now"
        if (hoursAgo < 24) return `Posted ${hoursAgo} hours ago`
        const daysAgo = Math.floor(hoursAgo / 24)
        return `Posted ${daysAgo} days ago`
    }

    const handleUpvote = async () => {
        const newUpvotes = post.upvotes + 1
        await supabase
            .from('HistoryPosts')
            .update({ upvotes: newUpvotes })
            .eq('id', id)

        setPost({ ...post, upvotes: newUpvotes })
    }

    const handleAddComment = async (commentText) => {
        if (!commentText.trim()) return;

        const updatedComments = [...(post.comments || []), commentText];

        const { error } = await supabase
            .from("HistoryPosts")
            .update({ comments: updatedComments })
            .eq("id", id)
            .select(); // required for Supabase v2

        if (error) {
            console.error("Error updating comments:", error);
            return;
        }

        setPost({ ...post, comments: updatedComments });
    };


    const handleDelete = async () => {
        await supabase
            .from('HistoryPosts')
            .delete()
            .eq('id', id)

        window.location.href = '/'
    }

    const handleEdit = () => {
        window.location.href = `/edit/${id}`
    }

    return (
        <div className="read-post-container">
            <div className="post-wrapper">
                <div className="post-card">
                    {/* Timestamp */}
                    <div className="post-timestamp">
                        {formatTimeAgo(post.created_at)}
                    </div>

                    {/* Title */}
                    <h1 className="post-title">
                        {post.title}
                    </h1>

                    {/* Content */}
                    <p className="post-content">
                        {post.content}
                    </p>

                    {/* Image */}
                    {post.image_url && (
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="post-image"
                        />
                    )}

                    {/* Actions Bar */}
                    <div className="actions-bar">
                        <button
                            onClick={handleUpvote}
                            className="upvote-button"
                        >
                            <svg className="upvote-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>{post.upvotes} upvotes</span>
                        </button>

                        <div className="action-buttons">
                            <button
                                onClick={handleEdit}
                                className="icon-button"
                                title="Edit post"
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleDelete}
                                className="icon-button delete"
                                title="Delete post"
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section">
                        {post.comments && post.comments.length > 0 && (
                            <div className="comments-list">
                                {post.comments.map((comment, index) => (
                                    <div key={index} className="comment-item">
                                        - {comment}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add Comment Input */}
                        <input
                            type="text"
                            placeholder="Leave a comment..."
                            className="comment-input"
                            onKeyDown={async (e) => {
                                if (e.key === "Enter") {
                                    await handleAddComment(e.target.value);
                                    e.target.value = "";
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadPost