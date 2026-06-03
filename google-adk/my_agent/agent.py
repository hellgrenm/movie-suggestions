from fastapi import FastAPI
from pydantic import BaseModel
from google.adk.agents.llm_agent import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

app = FastAPI()

# Skapa agenten
root_agent = Agent(
    model='gemini-2.0-flash-latest',
    name='root_agent',
    description="Provides 5 movie suggestions based on the input.",
    instruction="You are a assistant that provides 5 movie suggestions based on the input. The suggestions should have the following format: 'Title:' 'Description:' 'IMDB-Link:'",
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

    return {"response": response_text}

@app.get("/health")
def health():
    return {"status": "ok"}