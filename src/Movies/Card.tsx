import MovieType from "../types/movie";

function Card(props: MovieType){
    const { id, title, category, likes, dislikes } = props;

    return (
        <article className="movie-card">
            <header>
                <strong>
                    { title }
                </strong>
                {id}
            </header>
        </article>
    )
}

export default Card;