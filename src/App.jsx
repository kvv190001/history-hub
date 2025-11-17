import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'


const App = () => {

    const posts = [
        {
            "id": 87,
            "created_at": "2023-04-14 23:53:31.127016+00",
            "title": "Who is your favorite Founding Father?",
            "content": "Mine is Thomas Jefferson! What about you?",
            "image_url": "https://i.imgur.com/0QpthJU.jpg",
            "upvotes": 3,
            "comments": ["It's gotta be George Washington!", "Did you forget about Ben Franklin?"]
        }
    ]


    // Sets up routes
    let element = useRoutes([
        {
            path: "/",
            element: <ReadPosts data={posts} />
        },
        {
            path: "/edit/:id",
            element: <EditPost data={posts} />
        },
        {
            path: "/new",
            element: <CreatePost />
        }
    ]);

    return (

        <div className="App">

            <div className="header">
                <h1 className="logo">HistoryHub</h1>

                <div className="navButtons">
                    <Link to="/"><button className="headerBtn">Home</button></Link>
                    <Link to="/new"><button className="headerBtn">Create New Post</button></Link>
                </div>
            </div>
            {element}
        </div>

    )
}

export default App