from fastapi import FastAPI, HTTPException

# Create FastAPI app
app = FastAPI()

# Mock request data (replace with actual Syft `Request` objects in real use cases)
mock_requests = {
    "request_id_1": {
        "id": "request_id_1",
        "code": "def example_function():\n    print('Hello, world!')",
        "status": "pending",
    }
}

@app.get("/code-request/{request_id}")
async def get_code_request(request_id: str):
    """
    Retrieve the code from a code request by its ID.
    """
    # Check if the request exists
    request = mock_requests.get(request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Return the code from the request
    return {
        "request_id": request_id,
        "code": request["code"],
    }

# Run the server using: uvicorn <filename>:app --reload