import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <div className="card">
            <p className="card-date">Posted {props.created_at_relative}</p>

            <Link to={`/post/${props.id}`} className="card-title">
                {props.title}
            </Link>

            <p className="card-upvotes">{props.upvotes} upvotes</p>
        </div>
    );
};

export default Card;
