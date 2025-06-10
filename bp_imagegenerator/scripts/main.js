import { world, system, MolangVariableMap } from "@minecraft/server";
import { HttpRequest, HttpRequestMethod, HttpHeader, http } from "@minecraft/server-net";





world.beforeEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender;
    const message = eventData.message;

    if (message.startsWith(".particle ")) {
        const args = message.split(" ");
        const durationSeconds = parseInt(args[1]);
        const imageUrl = args[2];

        if (isNaN(durationSeconds) || !imageUrl) {
            player.sendMessage("§cUsage: .particle <seconds> <image_url>");
            return;
        }

        const origin = {
            x: player.location.x,
            y: player.location.y + 2,
            z: player.location.z
        };

        const request = new HttpRequest("http://localhost:9595/render_image");
        request.method = HttpRequestMethod.Post;
        request.headers = [new HttpHeader("Content-Type", "application/json")];
        request.body = JSON.stringify({
            url: imageUrl,
            origin: origin
        });

        system.runTimeout(async () => {
            try {
                const response = await http.request(request);

                if (response.status !== 200) {
                    player.sendMessage(`§c[Image Renderer] Failed: ${response.status}`);
                    return;
                }

                const data = JSON.parse(response.body);
                const particles = data.particles;

                let ticksRemaining = durationSeconds;

                const drawImage = () => {
                    for (const p of particles) {
                        const molang = new MolangVariableMap();
                        molang.setFloat("variable.r", p.color.r);
                        molang.setFloat("variable.g", p.color.g);
                        molang.setFloat("variable.b", p.color.b);
                        world.getDimension("overworld").spawnParticle(p.type, p.pos, molang);
                    }

                    ticksRemaining--;
                    if (ticksRemaining > 0) {
                        system.runTimeout(drawImage, 20); // 20 ticks = 1 second
                    } else {
                        player.sendMessage(`§a[Image Renderer] Done.`);
                    }
                };

                drawImage(); // Initial draw
            } catch (err) {
                console.error(err);
                player.sendMessage(`§c[Image Renderer] Error: ${err}`);
            }
        });

        return;
    }
});