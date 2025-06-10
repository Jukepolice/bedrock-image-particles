# 🧩 bedrock-image-particles

Bring web images to life in **Minecraft Bedrock Edition** using nothing but particles and a simple chat command.

Type `.particle <time> <image URL>` and watch the image appear in your world!

---

## 📸 Example

```mcfunction
.particle 5 https://i.imgur.com/example.png
```

This spawns a particle-based image in-game that lasts for 5 seconds.

---

## ✨ Features

* 💬 Chat-based command for spawning images: `.particle <time> <image URL>`
* 🖼️ Renders real images as many Minecraft particles
* ⚙️ Includes:

  * ✅ Bedrock Behavior Pack
  * ✅ Python Flask API for image conversion

---

## 🚀 How It Works

1. Player enters the `.particle` command in the Minecraft chat.
2. The Flask API fetches the image and processes it.
3. The Behavior Pack spawns particles at the correct positions and colors.
4. Result: a rendered image appears in-game.

---

## 🛠️ Requirements

* Minecraft Bedrock Edition
* Python 3.10+
* Flask (`pip install flask`)
* A Bedrock server or world with experimental features enabled

---

## 📦 Installation

1. Clone this repo:

   ```bash
   git clone https://github.com/Jukepolice/bedrock-image-particles.git
   ```

2. Add the behavior pack to your Minecraft server.

3. Run the Flask API:

   ```bash
   python main.py
   ```

4. Join the server and use the `.particle` command.

---

## 🧪 Stack

![Python](https://img.shields.io/badge/python-3.11-blue?logo=python)
![Flask](https://img.shields.io/badge/API-Flask-black?logo=flask)
![Minecraft Bedrock](https://img.shields.io/badge/Minecraft-Bedrock-green?logo=minecraft)

---

## 🧠 Tips

* Hosting the Flask API locally is fine, but you can deploy it remotely for public servers.
* Make sure `server-net` and `Beta APIs` are enabled in your world.

---
