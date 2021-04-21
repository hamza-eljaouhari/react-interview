import { useEffect, useState } from "react";
import moviesApi from "../movies";
import Card from "./Card";
import MovieType from "../types/movie";
import Select from "./Select";
import {
    Link,
    withRouter
} from "react-router-dom";

import "./List.css";
import { setMoviesCategories } from "../redux/reducers/movies/actions";

const DEFAULT_PER_PAGE = 4;


var colorArray = ['#EF5350', '#EC407A', '#AB47BC', '#673AB7', '#00B3E6', 
		  '#2196F3', '#00796B', '#4CAF50', '#CDDC39', '#3F51B5'];


function Movies(props: any){

    const [movies, setMovies] = useState<any>([])
    const [moviesCategories, setMoviesCategories] = useState<any>([])

    useEffect(() => {
        moviesApi.then((response: any) => {

            var uniqueCategories: any = [];

            response.forEach((movie: MovieType) => {
                if(!uniqueCategories.includes(movie.category)){
                    uniqueCategories.push(movie.category)
                }
            })

            setMoviesCategories(uniqueCategories);
            setMovies(response);

        }).catch((error) => {
            alert("There was an error fetching the data from the server. Please try again in a while.")
        })
    }, []);
    
    function like(id: string): void{
        var newMovies = movies.map((movie: MovieType) => {
            if(movie.id === id){
                movie.likes++;
            }

            return movie
        })

        setMovies(newMovies);
    }

    function dislike(id: string): void{
        var newMovies = movies.map((movie: MovieType) => {
            if(movie.id === id){
                movie.dislikes++;
            }

            return movie;
        })

        setMovies(newMovies);
    }

    function deleteItem(id: string): void{
        const newMovies = movies.filter((movie: MovieType) => {
            return movie.id !== id;
        });

        setMovies(newMovies);

        const { pageNumber } = props.match.params;

        console.log("length", movies.length)
        console.log("page number", parseInt(pageNumber))
        if(movies.length - 1 <= (parseInt(pageNumber) - 1) * DEFAULT_PER_PAGE){
            props.history.push("/movies/" + (parseInt(pageNumber) - 1));
        }
    }

    function paginateMovies() : MovieType[] {
        const { pageNumber } = props.match.params;
        var moviesPage = [...movies]
        return moviesPage.splice(DEFAULT_PER_PAGE * (parseInt(pageNumber)  - 1), DEFAULT_PER_PAGE)
    }

    function hasPreviousPage() : boolean {
        const { pageNumber } = props.match.params;
        if(parseInt(pageNumber) === 1){
            return false;
        }

        return true;
    }

    function hasNextPage() : boolean {
        const { pageNumber } = props.match.params;
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
            <div className="multi-select-container">
                <Select categories={moviesCategories }></Select>
            </div>
            <section className="movies-list">
                {
                    paginateMovies().map((movie: MovieType) => {
                        return <Card 
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            category={movie.category}
                            categoryColor={colorArray[moviesCategories.indexOf(movie.category)]}
                            likes={movie.likes}
                            dislikes={movie.dislikes}
                            deleteItem={deleteItem}
                            like={like}
                            dislike={dislike}
                        ></Card>
                    })
                }
            </section>
            <nav className="navigation-buttons">
                {
                    hasPreviousPage() &&
                    <Link to={previousPagePath()} className="navigation-button" style={{float: "left", margin: "30px"}}>
                        Previous
                    </Link>
                }
                {
                    hasNextPage() &&
                    <Link to={nextPagePath()} className="navigation-button" style={{float: "right", margin: "30px"}}>
                        Next
                    </Link>
                }
            </nav>
        </>
    )
}

export default withRouter(Movies);