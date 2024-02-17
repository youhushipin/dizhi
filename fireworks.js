document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 烟花数组
    let fireworks = [];

    // 简单的烟花模型
    class Firework {
        constructor(x, y, targetX, targetY, color) {
            this.x = x;
            this.y = y;
            this.targetX = targetX;
            this.targetY = targetY;
            this.color = color;
            this.velocity = {
                x: (targetX - x) / 60,
                y: (targetY - y) / 60
            };
            this.alpha = 1;
            this.counter = 0;
        }

        update() {
            if(this.counter < 60) {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.counter++;
            } else {
                this.alpha -= 0.02; // 逐渐消失
            }
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if(firework.alpha <= 0) {
                fireworks.splice(index, 1);
            }
        });
        requestAnimationFrame(loop);
    }

    function launchFirework() {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const targetX = Math.random() * canvas.width;
        const targetY = Math.random() * canvas.height / 2;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        fireworks.push(new Firework(x, y, targetX, targetY, color));

        setTimeout(launchFirework, 400);
    }

    launchFirework();
    loop();
});
