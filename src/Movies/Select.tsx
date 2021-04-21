import React from "react";
import movies from "../movies";
import MovieType from "../types/movie";
import "./Select.css";

function Select(props: any){
    const {selectFilters} = props;
    return(
        <form>
            <div className="control-form">
                <label htmlFor="categories">Choose a cateogory:</label>

                <select 
                    name="categories" 
                    id="categories" 
                    multiple
                    onChange={selectFilters} >
                    <option key="All" value="All">All</option>
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