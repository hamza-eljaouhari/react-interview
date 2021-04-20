import { useEffect, useState } from "react";
import moviesApi from "../movies";
import Card from "./Card";
import MovieType from "../types/movie";

import {
    withRouter
} from "react-router-dom";

const DEFAULT_PER_PAGE = 4;

function Movies(props: any){

    const [movies, setMovies] = useState<any>([])

    useEffect(() => {
        moviesApi.then((response: any) => {
            setMovies(response);
        }).catch((error) => {
            alert("There was an error fetching the data from the server. Please try again in a while.")
        })
    }, []);

    function paginateMovies() : MovieType[] {
        const { pageNumber } = props.match.params;
        return movies.splice(DEFAULT_PER_PAGE * (pageNumber - 1), DEFAULT_PER_PAGE)
    }

    return (
        <section>
            {
                paginateMovies().map((movie: MovieType) => {
                    return <Card 
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        category={movie.category}
                        likes={movie.likes}
                        dislikes={movie.dislikes}
                    ></Card>
                })
            }
        </section>
    )
}

export default withRouter(Movies);