import MovieType from "../types/movie";
import "./Card.css";

import { MdThumbUp } from 'react-icons/md';
import { MdThumbDown } from 'react-icons/md';

const iconSize = 16;

function Card(props: any){
    const { id, title, category, categoryColor, likes, dislikes } = props;
    console.log(categoryColor)
    return (
        <article className="movie-card">
            <header>
                <strong>
                    { title }
                </strong>
            </header>

            <hr/>

            <span className="movie-category" style={{backgroundColor: categoryColor}}>{category}</span>

            <hr/>

            <div className="movie-votes">
                <span className="movie-dislikes">
                    <MdThumbDown size={iconSize}/>
                    ({dislikes})
                </span>
                <span className="movie-likes">
                    <MdThumbUp size={iconSize}/>
                    ({likes})
                </span>
            </div>
        </article>
    )
}

export default Card;