from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO
import requests

app = Flask(__name__)

@app.route('/render_image', methods=['POST'])
def render_image():
    data = request.get_json()
    image_url = data.get("url")
    origin = data.get("origin", {"x": 0, "y": 64, "z": 0})

    try:
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content)).convert("RGB")
        img = img.resize((50, 50))

        particles = []
        for y in range(img.height):
            for x in range(img.width):
                r, g, b = img.getpixel((x, y))
                scale = 0.25
                px = origin["x"] + x * scale
                py = origin["y"] + (img.height - y) * scale
                pz = origin["z"]

                particles.append({
                    "type": "my:colored_dot",
                    "pos": {"x": px, "y": py, "z": pz},
                    "color": {
                        "r": round(r / 255, 3),
                        "g": round(g / 255, 3),
                        "b": round(b / 255, 3)
                    }
                })

        return jsonify({"particles": particles})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9595, debug=True)
