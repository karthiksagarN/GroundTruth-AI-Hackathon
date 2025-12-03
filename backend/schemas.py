from pydantic import BaseModel
from typing import List, Optional

class Creative(BaseModel):
    id: str
    image_url: str
    headline: str
    caption: str
    tone: str

class GenerateResponse(BaseModel):
    session_id: str
    creatives: List[Creative]
    zip_url: str
