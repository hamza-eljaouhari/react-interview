import MovieType from "../types/movie";
import "./Card.css";

function Card(props: MovieType){
    const { id, title, category, likes, dislikes } = props;

    return (
        <article className="movie-card">
            <header>
                <strong>
                    { title }
                </strong>
            </header>

            <hr/>

            <span className="movie-category">{category}</span>

            <hr/>

            <div className="movie-votes">
                <span className="movie-dislikes">Dislikes ({dislikes})</span>
                <span className="movie-likes">Likes ({likes})</span>
            </div>
        </article>
    )
}

export default Card;