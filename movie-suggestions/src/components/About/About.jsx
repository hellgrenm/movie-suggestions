export function About() {

    return (   

        <div className="text-white container mt-4 pt-5">
            <h1>About</h1>
            <p>This is a simple project by me to try and use my own AI agent from Google ADK to help find similar movies to the input supplied by the user.
            I couldn't get the AI to supply correct IMDB links and images, so all information about the movies is gathered from <a target="_blank" href="http://www.omdbapi.com/">OMDb API</a>.</p>
        </div>

    );
    
}