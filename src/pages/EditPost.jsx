import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

const EditPost = () => {

    const { id } = useParams()
    const [post, setPost] = useState({ title: "", content: "", image_url: "" })

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('HistoryPosts')
                .select('*')
                .eq('id', id)
                .single()

            // set state of Posts
            setPost(data)
        }

        fetchPost();
    }, [id])

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('HistoryPosts')
            .update({ title: post.title, content: post.content, image_url: post.image_url })
            .eq('id', id);

        window.location = "/";
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <form onSubmit={updatePost}>
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
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditPost