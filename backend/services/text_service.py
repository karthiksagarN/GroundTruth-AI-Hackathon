from openai import OpenAI
from config import Config
import json

class TextService:
    @staticmethod
    def generate_copy(brand_name: str, tone: str, context: str = "") -> dict:
        """Generates headline and caption using GPT-4o or returns mock text."""
        if Config.MOCK_MODE:
            return TextService._generate_mock_copy(brand_name, tone)

        try:
            client = OpenAI(api_key=Config.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are a creative copywriter. Generate a catchy headline and a short caption for an ad creative. Return ONLY JSON with keys 'headline' and 'caption'."},
                    {"role": "user", "content": f"Brand: {brand_name}\nTone: {tone}\nContext: {context}"}
                ],
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            print(f"Error generating text: {e}")
            return TextService._generate_mock_copy(brand_name, tone)

    @staticmethod
    def _generate_mock_copy(brand_name: str, tone: str) -> dict:
        return {
            "headline": f"Experience {brand_name}",
            "caption": f"The best choice for you. {tone} vibes only."
        }
