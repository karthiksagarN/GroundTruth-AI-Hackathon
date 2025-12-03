import shutil
import os
from config import Config

class ZipService:
    @staticmethod
    def create_zip(session_id: str, file_paths: list[str]) -> str:
        """Creates a zip file from a list of file paths."""
        zip_filename = f"creatives_{session_id}"
        zip_path = os.path.join(Config.TEMP_DIR, zip_filename) # shutil.make_archive adds .zip extension
        
        # Create a temporary directory for the zip content
        temp_zip_dir = os.path.join(Config.TEMP_DIR, session_id)
        os.makedirs(temp_zip_dir, exist_ok=True)
        
        try:
            for file_path in file_paths:
                if os.path.exists(file_path):
                    shutil.copy(file_path, temp_zip_dir)
            
            # Create zip
            shutil.make_archive(zip_path, 'zip', temp_zip_dir)
            
            return f"{zip_path}.zip"
        finally:
            # Cleanup temp dir
            shutil.rmtree(temp_zip_dir, ignore_errors=True)
