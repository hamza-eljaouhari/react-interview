import movies from "../movies";
import MovieType from "../types/movie";
import "./Select.css";

function Select(props: any){

    return(
        <form>
            <div className="control-form">
                <label htmlFor="categories">Choose a cateogory:</label>

                <select name="categories" id="categories" multiple>
                    {
                        props.categories.map((category: string) => {
                            return <option value={category}>{ category }</option>
                        })
                    }
                </select>
            </div>
        </form>
    )
}

export default Select;