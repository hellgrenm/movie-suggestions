from dotenv import load_dotenv
import os
load_dotenv()  
OMDB_API_KEY = os.getenv("OMDB_API_KEY")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.adk.agents.llm_agent import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
import json
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Skapa agenten
root_agent = Agent(
    model='gemini-flash-latest',
    name='root_agent',
    description="Provides 5 movie suggestions based on the input.",
instruction="""You are an assistant that provides exactly 6 movie suggestions based on the input.

You must ALWAYS respond with valid JSON only. Return ONLY a list of 5 movie titles. Use this format:

{
  "movies": [
    "Movie Title 1",
    "Movie Title 2",
    "Movie Title 3",
    "Movie Title 4",
    "Movie Title 5",
    "Movie Title 6"
  ]
}

No markdown, no code blocks, no explanation. Only the JSON object.""",
)
# Sätt upp session service och runner
session_service = InMemorySessionService()
runner = Runner(
    agent=root_agent,
    app_name="movie_agent",
    session_service=session_service
)

class QueryRequest(BaseModel):
    query: str
    session_id: str = "default"

@app.post("/ask")
async def ask_agent(request: QueryRequest):
    # Skapa eller återanvänd session
    session = await session_service.get_session(
        app_name="movie_agent",
        user_id="user",
        session_id=request.session_id
    )
    if session is None:
        session = await session_service.create_session(
            app_name="movie_agent",
            user_id="user",
            session_id=request.session_id
        )
    
    # Skicka meddelande till agenten
    content = types.Content(
        role='user',
        parts=[types.Part(text=request.query)]
    )
    
    response_text = ""
    async for event in runner.run_async(
        user_id="user",
        session_id=request.session_id,
        new_message=content
    ):
        if event.is_final_response() and event.content:
            for part in event.content.parts:
                if part.text:
                    response_text += part.text
    
    try:
        parsed = json.loads(response_text)
        results = []
        
        # Hämta data från OMDB för varje film
        for movie_title in parsed["movies"]:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"https://www.omdbapi.com/?t={movie_title}&apikey={OMDB_API_KEY}&type=movie"
                )
                omdb_data = response.json()
                
                if omdb_data.get("Response") == "True":
                    results.append({
                        "name": omdb_data.get("Title"),
                        "description": omdb_data.get("Plot"),
                        "imdb": f"https://www.imdb.com/title/{omdb_data.get('imdbID')}/",
                        "poster": omdb_data.get("Poster"),
                        "year": omdb_data.get("Year"),
                        "rating": omdb_data.get("imdbRating")
                    })
        
        return {"results": results}
    except Exception as e:
        print(f"FEL I BACKEND: {e}")
        return {"response": str(e)}
    

@app.get("/health")
def health():
    return {"status": "ok"}