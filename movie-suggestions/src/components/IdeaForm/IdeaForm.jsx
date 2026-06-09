import { useState } from 'react';
import { getMovies } from './movieApi';

export function  IdeaForm() {

    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    function handleDescription(e){
        setDescription(e.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setMovies([]);
        setLoading(true);
        
        try {
            const content = await getMovies(description);
            console.log("submit!");
            console.log(content);
            setMovies(content);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (


<>
             <form onSubmit={handleSubmit}>
                <div className="row">

                                    
                    <div className="col-8">
                        <label>Movie description:</label>
                        <textarea maxLength="2500" className="form-control mt-2 mb-2" id="idea_description" required onChange={handleDescription} value={description} 
                        placeholder="Maximun 2500 words."></textarea>
                    </div>
                                    
                    <div className="col-6">
                        {loading ?(
                        <button type="button" className="btn btn-primary" disabled>
                            Loading...
                        </button>

                        ) : (
                        <button type="submit" className="btn btn-primary mb-2">Send</button>
                        )}
                    </div>
                </div>
            </form>

                <div className="container row d-flex flex-wrap justify-content-start">

                    {movies.results && movies.results.map(movie => (

                   <div key={movie.name} className='p-1 col-10 col-md-6 col-lg-4 pb-md-5'>
            

                    <div className="card border-white " id="movie-card" >
                    <img className="card-img-top" src={movie.poster} alt={movie.name}  />
                    <div className="card-body">
                        <a target='_blank' className='text-dark' href={movie.imdb}> <h5 className="card-title">{movie.name}</h5> </a>
                        <p className="card-text">{movie.description} <a className='text-dark' target='_blank' href={movie.imdb}> Click to read more. </a> </p>
                        <p>IMDB-rating:{ movie.rating }</p>
                    </div>

                    </div>


                </div>
                ))}


                    
                </div>
             

         

        </>






    )
    
}