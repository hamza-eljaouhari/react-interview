import React from "react";
import movies from "../movies";
import MovieType from "../types/movie";
import "./Select.css";

function Select(props: any){
    const {filterMovies} = props;
    return(
        <form>
            <div className="control-form">
                <label htmlFor="categories">Choose a cateogory:</label>

                <select 
                    name="categories" 
                    id="categories" 
                    multiple
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => filterMovies(event.target.value)} >
                    <option key="all" value="all">All</option>
                    {
                        props.categories.map((category: string) => {
                            return <option key={category} value={category}>{ category }</option>
                        })
                    }
                </select>
            </div>
        </form>
    )
}

export default Select;