/* ================================================================
   IQCOL 2026 — Shared JS
   Non-home quantum background + Lucide icons
   ================================================================ */

(function () {
    'use strict';

    const path = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = path === 'index.html' || path === '';

    const footerHTML = `
<footer>
    <div class="footer-divider"></div>
    <div class="footer-inner">
        <div class="footer-cols">
            <div class="footer-col">
                <h4>IQCOL: International Quantum Computing Olympiad</h4>
                <div class="footer-icons">
                    <a href="https://2026.iqcol.org/iqcol" target="_blank" rel="noopener"><i data-lucide="globe"></i></a>
                    <a href="https://ee.linkedin.com/company/iqcol-org" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>
                    <a href="https://www.instagram.com/iqcol_org/" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>KBI: Königsberger Bridges Institute</h4>
                <div class="footer-icons">
                    <a href="https://www.kb.institute/" target="_blank" rel="noopener"><i data-lucide="globe"></i></a>
                    <a href="https://www.linkedin.com/company/kbi-eu/" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>
                    <a href="https://www.instagram.com/kbi.eu/" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>
                </div>
            </div>
        </div>
        <p class="footer-copy">© 2026 International Quantum Computing Olympiad (IQCOL Foundation). All Rights Reserved.</p>
    </div>
</footer>`;

    if (!isHome) {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    /* ── Quantum background canvas (non-home pages; home uses bg-canvas-home.js) ── */
    const canvas = document.getElementById('bg-canvas');
    if (canvas && !isHome) {
        const ctx = canvas.getContext('2d');
        const networkCount = 35;
        let networks = [];

        class QuantumNetwork {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * (canvas.height * 2.5);
                this.z = Math.random() * 0.7 + 0.15;
                this.branches = [];
                this.opacity = Math.random() * 0.12 + 0.05;
                this.speed = Math.random() * 0.2 + 0.1;
                this.pulse = Math.random() * Math.PI;
                let currX = 0, currY = 0;
                for (let i = 0; i < 8; i++) {
                    let len = Math.random() * 80 + 30;
                    let horizontal = Math.random() > 0.5;
                    let nextX = horizontal ? currX + (Math.random() > 0.5 ? len : -len) : currX;
                    let nextY = horizontal ? currY : currY + (Math.random() > 0.5 ? len : -len);
                    this.branches.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });
                    currX = nextX; currY = nextY;
                }
            }
            getScreenY(scrollY) {
                return (this.y - scrollY * this.z) % (canvas.height * 1.5);
            }
        }

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            networks = Array.from({ length: networkCount }, () => new QuantumNetwork());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            networks.forEach(n => {
                n.y -= n.speed;
                n.pulse += 0.01;
                if (n.y < -500) n.y = canvas.height * 2.5 + 200;
                const screenY = n.getScreenY(scrollY);
                if (screenY < -500 || screenY > canvas.height + 200) return;
                const glow = n.opacity + Math.sin(n.pulse) * 0.05;
                n.branches.forEach((b, i) => {
                    ctx.strokeStyle = `rgba(179, 136, 255, ${glow})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(n.x + b.x1, b.y1 + screenY);
                    ctx.lineTo(n.x + b.x2, b.y2 + screenY);
                    ctx.stroke();

                    ctx.fillStyle = `rgba(179, 136, 255, ${glow + 0.1})`;
                    ctx.fillRect(n.x + b.x1 - 2, b.y1 + screenY - 2, 4, 4);

                    if (i === 0) {
                        ctx.strokeStyle = `rgba(179, 136, 255, ${glow + 0.1})`;
                        ctx.strokeRect(n.x + b.x1 - 12, b.y1 + screenY - 12, 24, 24);
                        ctx.fillStyle = `rgba(179, 136, 255, 0.03)`;
                        ctx.fillRect(n.x + b.x1 - 12, b.y1 + screenY - 12, 24, 24);
                    } else if (i === 4) {
                        ctx.strokeRect(n.x + b.x1 - 6, b.y1 + screenY - 6, 12, 12);
                    }
                });
            });
            if (!canvas.classList.contains('active')) setTimeout(() => canvas.classList.add('active'), 100);
            requestAnimationFrame(animate);
        }

        initCanvas();
        animate();
        window.addEventListener('resize', initCanvas, { passive: true });
    }

    /* ── Lucide icons ── */
    if (window.lucide) lucide.createIcons();
    else window.addEventListener('load', () => { if (window.lucide) lucide.createIcons(); });
})();
