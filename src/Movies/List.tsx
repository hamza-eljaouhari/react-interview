import { useEffect, useState } from "react";
import moviesApi from "../movies";
import Card from "./Card";
import MovieType from "../types/movie";
import Select from "./Select";
import {
    Link,
    withRouter
} from "react-router-dom";

import { connect } from 'react-redux'

import "./List.css";
import { setMoviesCategories, setMovies} from "../redux/reducers/movies/actions";

const DEFAULT_PER_PAGE = 4;


var colorArray = ['#EF5350', '#EC407A', '#AB47BC', '#673AB7', '#00B3E6', 
		  '#2196F3', '#00796B', '#4CAF50', '#CDDC39', '#3F51B5'];

function Movies(props: any){

    useEffect(() => {
        moviesApi.then((response: any) => {

            

            setUniqueMoviesCategories(response);
            props.setMovies(response);

        }).catch((error) => {
            alert("There was an error fetching the data from the server. Please try again in a while.")
        })
    }, []);

    useEffect(() => {
        setUniqueMoviesCategories(props.movies)
    }, [props.movies])

    function setUniqueMoviesCategories(movies: any): void{
        var uniqueCategories: any = [];

        movies.forEach((movie: MovieType) => {
            if(!uniqueCategories.includes(movie.category)){
                uniqueCategories.push(movie.category)
            }
        })

        console.log(uniqueCategories)

        props.setCategories(uniqueCategories);
    }
    
    function like(id: string): void{
        var newMovies = props.movies.map((movie: MovieType) => {
            if(movie.id === id){
                movie.likes++;
            }

            return movie
        })

        props.setMovies(newMovies);
    }

    function dislike(id: string): void{
        var newMovies = props.movies.map((movie: MovieType) => {
            if(movie.id === id){
                movie.dislikes++;
            }

            return movie;
        })

        props.setMovies(newMovies);
    }

    function deleteItem(id: string): void{
        const newMovies = props.movies.filter((movie: MovieType) => {
            return movie.id !== id;
        });

        props.setMovies(newMovies);

        const { pageNumber } = props.match.params;

        if(props.movies.length - 1 <= (parseInt(pageNumber) - 1) * DEFAULT_PER_PAGE){
            props.history.push("/movies/" + (parseInt(pageNumber) - 1));
        }
        console.log(props.categories)
    }

    function paginateMovies() : MovieType[] {
        const { pageNumber } = props.match.params;

        var moviesPage = [...props.movies]
        
        return moviesPage.splice(DEFAULT_PER_PAGE * (parseInt(pageNumber)  - 1), DEFAULT_PER_PAGE)
    }

    function hasPreviousPage() : boolean {

        if(props.movies.length < DEFAULT_PER_PAGE){
            return false;
        }

        const { pageNumber } = props.match.params;

        if(parseInt(pageNumber) === 1){
            return false;
        }

        return true;
    }

    function hasNextPage() : boolean {
        if(props.movies.length < DEFAULT_PER_PAGE){
            return false;
        }

        const { pageNumber } = props.match.params;
        
        if(parseInt(pageNumber) * DEFAULT_PER_PAGE < props.movies.length){
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
                <Select categories={props.categories}></Select>
            </div>
            <section className="movies-list">
                {
                    paginateMovies().map((movie: MovieType) => {
                        return <Card 
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            category={movie.category}
                            categoryColor={colorArray[props.categories.indexOf(movie.category)]}
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

const mapStateToProps = (state: any) => {
    return {
        movies: state.moviesReducer.movies,
        categories: state.moviesReducer.categories
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setMovies: (movies: MovieType[]) => dispatch(setMovies(movies)),
        setCategories: (categories: string[]) => dispatch(setMoviesCategories(categories))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Movies));