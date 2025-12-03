import os
import shutil
from fastapi import UploadFile
from config import Config
import uuid

class StorageService:
    @staticmethod
    async def save_upload(file: UploadFile) -> str:
        """Saves an uploaded file to the temp directory and returns the path."""
        filename = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(Config.TEMP_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return file_path

    @staticmethod
    def get_file_url(file_path: str) -> str:
        """Returns the static URL for a file path."""
        rel_path = os.path.relpath(file_path, Config.STATIC_DIR)
        return f"/static/{rel_path}"
