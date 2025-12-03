import shutil
import os
from config import Config

class ZipService:
    @staticmethod
    @staticmethod
    def create_zip(session_id: str, files: list[dict]) -> str:
        """
        Creates a zip file from a list of file mappings.
        files: list of dicts with 'path' and 'name' keys
        """
        zip_filename = f"creatives_{session_id}"
        zip_path = os.path.join(Config.TEMP_DIR, zip_filename) # shutil.make_archive adds .zip extension
        
        # Create a temporary directory for the zip content
        temp_zip_dir = os.path.join(Config.TEMP_DIR, session_id)
        os.makedirs(temp_zip_dir, exist_ok=True)
        
        try:
            for file_data in files:
                file_path = file_data['path']
                dest_name = file_data['name']
                
                if os.path.exists(file_path):
                    dest_path = os.path.join(temp_zip_dir, dest_name)
                    shutil.copy(file_path, dest_path)
            
            # Create zip
            shutil.make_archive(zip_path, 'zip', temp_zip_dir)
            
            return f"{zip_path}.zip"
        finally:
            # Cleanup temp dir
            shutil.rmtree(temp_zip_dir, ignore_errors=True)
