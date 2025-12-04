import os
import fal_client
from PIL import Image, ImageDraw, ImageFont
from config import Config
import uuid
import asyncio

class ImageService:
    @staticmethod
    async def generate_image(brand_name: str, tone: str, tagline: str, product_path: str, logo_path: str) -> str:
        """Generates an image using nano-banana-pro."""
        filename = f"creative_{uuid.uuid4()}.png"
        filepath = os.path.join(Config.CREATIVES_DIR, filename)

        if Config.MOCK_MODE:
            return ImageService._generate_mock_image(filepath, brand_name, tone)
        
        try:
            # Upload images
            print(f"Uploading product image: {product_path}")
            product_url = fal_client.upload_file(product_path)
            print(f"Uploading logo image: {logo_path}")
            logo_url = fal_client.upload_file(logo_path)

            # Construct prompt
            if tagline:
                text_instruction = f'CRITICAL: You MUST overlay the following text on the image: "{tagline}"'
            else:
                text_instruction = "CRITICAL: Create a UNIQUE, short, catchy tagline for this specific ad. You MUST overlay this generated tagline on the image."

            prompt = f"""
                Transform the input image into a premium brand advertisement creative.
                Keep the exact same product for the brand '{brand_name}' and model shown in the input image.
                
                {text_instruction}
                The text must be clearly visible, using a modern, elegant font that matches the {tone} tone.
                Place the text in a negative space or a suitable area where it is legible.

                Do not alter the product's shape, material, color, logo placement, or design.
                Do not replace it with a different model or a different device category.

                Improve the scene, not the product:
                - enhance lighting and reflections
                - add a clean, modern commercial background
                - increase depth and cinematic shadows
                - remove imperfections
                - make the composition suitable for Instagram/Facebook ads
                - add subtle brand mood matching the tone: {tone}

                Maintain product identity exactly. Only stylize the environment and ADD THE TEXT.
            """
            print(f"Submitting to nano-banana-pro with prompt: {prompt}")
            handler = fal_client.submit(
                "fal-ai/nano-banana-pro/edit",
                arguments={
                    "prompt": prompt,
                    "num_images": 1,
                    "aspect_ratio": "4:3",
                    "output_format": "png",
                    "image_urls": [
                        product_url,
                        logo_url
                    ],
                    "resolution": "1K",
                    "enable_web_search": True,
                    "num_inference_steps": 28,
                    "guidance_scale": 3.5,
                }
            )
            result = handler.get()
            
            # Handle potential different result structure if model differs, but assuming standard
            if "images" in result and len(result["images"]) > 0:
                image_url = result["images"][0]["url"]
            elif "image" in result:
                 image_url = result["image"]["url"]
            else:
                # Fallback or error
                print(f"Unexpected result format: {result}")
                return ImageService._generate_mock_image(filepath, brand_name, tone)

            # Download the image
            import requests
            response = requests.get(image_url)
            if response.status_code == 200:
                with open(filepath, "wb") as f:
                    f.write(response.content)
                return filepath
            else:
                print(f"Failed to download image: {response.status_code}")
                return ImageService._generate_mock_image(filepath, brand_name, tone)

        except Exception as e:
            print(f"Error generating image: {e}")
            return ImageService._generate_mock_image(filepath, brand_name, tone)

    @staticmethod
    def _generate_mock_image(filepath: str, brand_name: str, tone: str) -> str:
        """Creates a simple placeholder image."""
        img = Image.new('RGB', (800, 600), color = (73, 109, 137))
        d = ImageDraw.Draw(img)
        
        # Try to load a font, fallback to default
        try:
            font = ImageFont.truetype("Arial", 20)
        except IOError:
            font = ImageFont.load_default()
            
        d.text((10,10), f"Mock Image\nBrand: {brand_name}\nTone: {tone}", fill=(255,255,0), font=font)
        img.save(filepath)
        return filepath
