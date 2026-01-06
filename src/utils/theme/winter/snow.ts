export function initSnow(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = () => window.devicePixelRatio || 1;

    let flakes: {
        x: number;
        y: number;
        r: number;
        speedY: number;
        speedX: number;
        phase: number;
        drift: number;
    }[] = [];

    const FLAKE_COUNT = 220;
    let animationId: number;

    function resizeCanvas() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const r = ratio();

        canvas.width = w * r;
        canvas.height = h * r;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";

        if (ctx) ctx.setTransform(r, 0, 0, r, 0, 0);
    }

    function createFlakes() {
        flakes = [];
        const w = canvas.width / ratio();
        const h = canvas.height / ratio();

        for (let i = 0; i < FLAKE_COUNT; i++) {
            flakes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 0.8 + Math.random() * 2.4,
                speedY: 0.4 + Math.random() * 1.6,
                speedX: -0.35 + Math.random() * 0.7,
                phase: Math.random() * Math.PI * 2,
                drift: 0.2 + Math.random() * 0.35
            });
        }
    }

    function draw() {
        const w = canvas.width / ratio();
        const h = canvas.height / ratio();

        if (!ctx) return;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255, 255, 255, 0.96)";

        for (const f of flakes) {
            f.phase += 0.01;
            f.x += f.speedX + Math.sin(f.phase) * f.drift;
            f.y += f.speedY;

            if (f.y > h + 5) {
                f.y = -10;
                f.x = Math.random() * w;
            }
            if (f.x > w + 5) f.x = -5;
            if (f.x < -5) f.x = w + 5;

            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();
        }

        animationId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    createFlakes();
    draw();

    window.addEventListener("resize", resizeCanvas);

    // ✅ cleanup function (very important)
    return () => {
        window.removeEventListener("resize", resizeCanvas);
        cancelAnimationFrame(animationId);
    };
}
