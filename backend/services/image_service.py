import os
import fal_client
from PIL import Image, ImageDraw, ImageFont
from config import Config
import uuid
import asyncio

class ImageService:
    @staticmethod
    async def generate_image(prompt: str, tone: str) -> str:
        """Generates an image using Flux.1 or returns a mock image."""
        filename = f"creative_{uuid.uuid4()}.png"
        filepath = os.path.join(Config.CREATIVES_DIR, filename)

        if Config.MOCK_MODE:
            return ImageService._generate_mock_image(filepath, prompt, tone)
        
        try:
            handler = fal_client.submit(
                "fal-ai/flux/dev",
                arguments={
                    "prompt": f"{prompt}, {tone} style, high quality, advertising photography",
                    "image_size": "landscape_4_3",
                    "num_inference_steps": 28,
                    "guidance_scale": 3.5,
                },
            )
            result = handler.get()
            image_url = result["images"][0]["url"]
            
            # Download the image
            import requests
            response = requests.get(image_url)
            if response.status_code == 200:
                with open(filepath, "wb") as f:
                    f.write(response.content)
                return filepath
            else:
                print(f"Failed to download image: {response.status_code}")
                return ImageService._generate_mock_image(filepath, prompt, tone)

        except Exception as e:
            print(f"Error generating image: {e}")
            return ImageService._generate_mock_image(filepath, prompt, tone)

    @staticmethod
    def _generate_mock_image(filepath: str, prompt: str, tone: str) -> str:
        """Creates a simple placeholder image."""
        img = Image.new('RGB', (800, 600), color = (73, 109, 137))
        d = ImageDraw.Draw(img)
        
        # Try to load a font, fallback to default
        try:
            font = ImageFont.truetype("Arial", 20)
        except IOError:
            font = ImageFont.load_default()
            
        d.text((10,10), f"Mock Image\nTone: {tone}\nPrompt: {prompt[:50]}...", fill=(255,255,0), font=font)
        img.save(filepath)
        return filepath
