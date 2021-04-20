import { useEffect, useState } from "react";
import moviesApi from "../movies";
import Card from "./Card";
import MovieType from "../types/movie";

function Movies(){

    const [movies, setMovies] = useState<any>([])

    useEffect(() => {
        moviesApi.then((response) => {
            console.log(response)
            setMovies(response);
        }).catch((error) => {
            alert("There was an error fetching the data from the server. Please try again in a while.")
        })
    }, []);

    return (
        <section>
            {
                movies.map((movie: MovieType) => {
                    return <Card key={movie.id}></Card>
                })
            }
        </section>
    )
}

export default Movies;