import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import ReadPost from './pages/ReadPost'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'


const App = () => {
    // Sets up routes
    let element = useRoutes([
        {
            path: "/",
            element: <ReadPosts/>
        },
        {
            path: "/post/:id",
            element: <ReadPost/>
        },
        {
            path: "/edit/:id",
            element: <EditPost/>
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