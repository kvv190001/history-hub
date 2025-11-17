import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Card from '../components/Card'

const relativeTime = (iso) => {
    const diff = Date.now() - new Date(iso);
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
};


const ReadPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('HistoryPosts')
                .select()
                .order('created_at', { ascending: false });

            setPosts(data)
        };

        fetchPost();
    }, []);

    return (
        <div className="posts-container">
            {
                posts?.length > 0 ?
                    posts.map((post) =>
                        <Card
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            upvotes={post.upvotes}
                            created_at_relative={relativeTime(post.created_at)}
                        />
                    ) : <h2>No Posts Yet 😞</h2>
            }
        </div>
    )
}

export default ReadPosts;
