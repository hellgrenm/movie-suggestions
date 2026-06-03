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
                
            <div className=' movie-results'>
             
                    {movies.results && movies.results.map(movie => (
                   <div key={movie.name} className='p-3 border border-secondary'>
                    <div className='row'>
                        <a className='col-6' target='_blank' href={movie.imdb}> 
                            <p>{movie.name}</p>  
                        </a>   
                        <p className='col-6'>Release year: {movie.year}</p>
                    </div>
                    <div className='row justify-content-center justify-content-sm-start'>
                    <img className='col-12 col-sm-5 mb-1' src={movie.poster} alt={movie.name} style={{width: '200px'}} /> 
                    <p className='col-12 col-sm-7'>{movie.description}</p>
                    </div>
                    <p>IMDB-rating: {movie.rating}</p>
                </div>
                    ))}
                </div>       
  
         

        </>






    )
    
}