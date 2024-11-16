from fastapi import APIRouter, HTTPException

router = APIRouter()

mock_requests = {
    "request_id_1": {
        "id": "request_id_1",
        "code": "def example_function():\n    print('Hello, world!')",
        "status": "pending",
    }
}

@router.get("/code-request/{request_id}")
async def get_code_request(request_id: str):
    request = mock_requests.get(request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"request_id": request_id, "code": request["code"]}