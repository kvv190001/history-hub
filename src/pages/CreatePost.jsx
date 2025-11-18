import { useState } from 'react'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({ title: "", content: "", image_url: "" })

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();

        await supabase
            .from('HistoryPosts')
            .insert({ title: post.title, content: post.content, image_url: post.image_url })
            .select()

        window.location = "/";
    }

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <form onSubmit={createPost}>
                    {/* Title Field */}
                    <div className="form-group">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={post.title}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Content Field */}
                    <div className="form-group">
                        <textarea
                            rows="8"
                            id="content"
                            name="content"
                            placeholder="Content (Optional)"
                            value={post.content}
                            onChange={handleChange}
                            className="form-textarea"
                        />
                    </div>

                    {/* Image URL Field */}
                    <div className="form-group">
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="Image URL (Optional)"
                            value={post.imageUrl}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost