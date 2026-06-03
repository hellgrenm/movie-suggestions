import { Container } from "react-bootstrap";
import { useState } from 'react';
import { IdeaForm } from '../IdeaForm/IdeaForm.jsx';




export function Body() {

    

    return(
        <>
    
                <Container className="fluid pt-5 mt-4 text-white">
                    <h1>Welcome to MovieBox</h1>
                    <p>Enter a short description about a movie you would like to see and we will try to provide you with 5 movie suggestions.</p>
                </Container>
                <Container className="text-white">
                    < IdeaForm />
                </Container>
 
        </>
    );
    
}