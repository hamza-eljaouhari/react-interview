import { useEffect, useState } from "react";
import moviesApi from "../movies";
import Card from "./Card";
import MovieType from "../types/movie";
import "./List.css";

import {
    Link,
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
        var moviesPage = [...movies]
        return moviesPage.splice(DEFAULT_PER_PAGE * (parseInt(pageNumber)  - 1), DEFAULT_PER_PAGE)
    }

    function hasPreviousPage() : boolean {
        const { pageNumber } = props.match.params;
        console.log("haprev", parseInt(pageNumber) === 1)
        if(parseInt(pageNumber) === 1){
            return false;
        }

        return true;
    }

    function hasNextPage() : boolean {
        const { pageNumber } = props.match.params;
        console.log("parseInt(pageNumber) * DEFAULT_PER_PAGE",parseInt(pageNumber) * DEFAULT_PER_PAGE);
        console.log("movies.length", movies.length)
        if(parseInt(pageNumber) * DEFAULT_PER_PAGE < movies.length){
            return true;
        }

        return false;
    }

    
    function previousPagePath() : string {
        const { pageNumber } = props.match.params;

        return "/movies/" + (parseInt(pageNumber) - 1);
    }

    
    function nextPagePath() : string {
        const { pageNumber } = props.match.params;

        return "/movies/" + (parseInt(pageNumber) + 1);
    }

    return (
        <>
            <section className="movies-list">
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
            <nav className="navigation-buttons">
                {
                    hasPreviousPage() &&
                    <Link to={previousPagePath()} style={{float: "left", margin: "30px"}}>
                        Previous
                    </Link>
                }
                {
                    hasNextPage() &&
                    <Link to={nextPagePath()} style={{float: "right", margin: "30px"}}>
                        Next
                    </Link>
                }
            </nav>
        </>
    )
}

export default withRouter(Movies);