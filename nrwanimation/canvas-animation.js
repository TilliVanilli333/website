// Universal NRW Animation - Canvas 2D Version (kein WebGL benötigt!)

class NRWAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId || 'animation-container');
        if (!this.container) {
            this.container = document.body;
        }
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        // Animation state
        this.time = 0;
        this.animationId = null;
        this.images = {};
        this.imagesLoaded = false;
        
        // Data für die Kompetenzstufen
        this.stages = [
            { 
                label: 'Kompetenzstufe A', 
                value: '36%', 
                percent: 36,
                color: '#4facfe',
                imageKey: 'astro',
                scale: 1.2
            },
            { 
                label: 'Kompetenzstufe B', 
                value: '34%', 
                percent: 34,
                color: '#667eea',
                imageKey: 'girl',
                scale: 1.1
            },
            { 
                label: 'Kompetenzstufe C', 
                value: '20%', 
                percent: 20,
                color: '#56ab2f',
                imageKey: 'boy_walk',
                scale: 1.0,
                flip: true
            },
            { 
                label: 'Kompetenzstufe D', 
                value: '10%', 
                percent: 10,
                color: '#ff6b35',
                imageKey: 'boy_lean',
                scale: 0.9,
                flip: true
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.loadImages();
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        // Canvas auf volle Container-Größe setzen
        const rect = this.container.getBoundingClientRect();
        // Höhere Auflösung für Schärfe
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        // CSS-Größe beibehalten
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        // Context skalieren für Retina-Displays
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Skalierung für kleinere Größe
        this.scale = Math.min(rect.width / 800, rect.height / 600) * 0.9;
        
        // Positionen berechnen
        this.calculatePositions();
    }
    
    calculatePositions() {
        // Nutze die tatsächliche Breite/Höhe (nicht die skalierte)
        const rect = this.container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Nutze 60% der verfügbaren Breite für die Animation (wie Text darüber/darunter)
        const usableWidth = width * 0.6;
        const startX = width * 0.2;
        const centerY = height * 0.5;
        
        // Berechne Positionen für jede Stufe
        this.stages.forEach((stage, index) => {
            // X-Position gleichmäßig verteilen
            stage.x = startX + (usableWidth / (this.stages.length - 1)) * index;
            
            // Y-Position basierend auf Prozentsatz (Graph-Effekt)
            const maxHeight = height * 0.35;
            stage.y = centerY - (stage.percent / 100) * maxHeight;
            
            // Figur-Größe berechnen
            stage.figureHeight = 120 * this.scale * stage.scale;
            stage.figureWidth = stage.figureHeight * 0.6; // Aspect ratio
        });
    }
    
    loadImages() {
        // Lade Bilder von base64_texture.js wenn vorhanden
        if (typeof base64Textures !== 'undefined') {
            const loadPromises = [];
            
            Object.keys(base64Textures).forEach(key => {
                const img = new Image();
                const promise = new Promise((resolve) => {
                    img.onload = () => {
                        this.images[key] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Could not load image: ${key}`);
                        resolve();
                    };
                });
                img.src = base64Textures[key];
                loadPromises.push(promise);
            });
            
            Promise.all(loadPromises).then(() => {
                this.imagesLoaded = true;
                this.animate();
            });
        } else {
            // Fallback ohne Bilder
            this.imagesLoaded = false;
            this.animate();
        }
    }
    
    drawBackground() {
        const ctx = this.ctx;
        const rect = this.container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Clear canvas (angepasst für device pixel ratio)
        ctx.clearRect(0, 0, width, height);
        
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(0, 8, 20, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 8, 20, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(79, 172, 254, 0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        
        // Horizontal lines
        for (let i = 0; i <= 10; i++) {
            const y = (height / 10) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Vertical lines
        for (let i = 0; i <= 10; i++) {
            const x = (width / 10) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
    }
    
    drawGraph() {
        const ctx = this.ctx;
        
        // Draw connecting line (Graph)
        ctx.strokeStyle = 'rgba(79, 172, 254, 0.5)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#4facfe';
        
        ctx.beginPath();
        this.stages.forEach((stage, index) => {
            if (index === 0) {
                ctx.moveTo(stage.x, stage.y);
            } else {
                // Smooth curve
                const prevStage = this.stages[index - 1];
                const cp1x = prevStage.x + (stage.x - prevStage.x) / 2;
                const cp1y = prevStage.y;
                const cp2x = prevStage.x + (stage.x - prevStage.x) / 2;
                const cp2y = stage.y;
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, stage.x, stage.y);
            }
        });
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw area under graph
        ctx.fillStyle = 'rgba(79, 172, 254, 0.05)';
        ctx.beginPath();
        ctx.moveTo(this.stages[0].x, this.canvas.height);
        this.stages.forEach(stage => {
            ctx.lineTo(stage.x, stage.y);
        });
        ctx.lineTo(this.stages[this.stages.length - 1].x, this.canvas.height);
        ctx.closePath();
        ctx.fill();
    }
    
    drawStage(stage, index) {
        const ctx = this.ctx;
        const bounceOffset = Math.sin(this.time * 2 + index * 0.5) * 5;
        
        // Draw stronger glow effect
        const glowGradient = ctx.createRadialGradient(
            stage.x, stage.y + bounceOffset, 0,
            stage.x, stage.y + bounceOffset, stage.figureHeight * 0.8
        );
        glowGradient.addColorStop(0, `${stage.color}88`); // Stärkerer Glow
        glowGradient.addColorStop(0.5, `${stage.color}44`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(
            stage.x - stage.figureHeight,
            stage.y + bounceOffset - stage.figureHeight,
            stage.figureHeight * 2,
            stage.figureHeight * 2
        );
        
        // Draw character/figure
        if (this.imagesLoaded && this.images[stage.imageKey]) {
            ctx.save();
            
            // Flip if needed
            if (stage.flip) {
                ctx.scale(-1, 1);
                ctx.drawImage(
                    this.images[stage.imageKey],
                    -stage.x - stage.figureWidth / 2,
                    stage.y + bounceOffset - stage.figureHeight / 2,
                    stage.figureWidth,
                    stage.figureHeight
                );
            } else {
                ctx.drawImage(
                    this.images[stage.imageKey],
                    stage.x - stage.figureWidth / 2,
                    stage.y + bounceOffset - stage.figureHeight / 2,
                    stage.figureWidth,
                    stage.figureHeight
                );
            }
            
            ctx.restore();
        } else {
            // Fallback: Draw stylized figure
            ctx.fillStyle = stage.color;
            ctx.strokeStyle = stage.color;
            ctx.lineWidth = 3;
            
            // Body
            ctx.beginPath();
            ctx.arc(stage.x, stage.y + bounceOffset - 20, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Stick figure body
            ctx.beginPath();
            ctx.moveTo(stage.x, stage.y + bounceOffset - 5);
            ctx.lineTo(stage.x, stage.y + bounceOffset + 30);
            ctx.stroke();
            
            // Arms
            ctx.beginPath();
            ctx.moveTo(stage.x - 15, stage.y + bounceOffset);
            ctx.lineTo(stage.x + 15, stage.y + bounceOffset);
            ctx.stroke();
            
            // Legs
            ctx.beginPath();
            ctx.moveTo(stage.x, stage.y + bounceOffset + 30);
            ctx.lineTo(stage.x - 10, stage.y + bounceOffset + 50);
            ctx.moveTo(stage.x, stage.y + bounceOffset + 30);
            ctx.lineTo(stage.x + 10, stage.y + bounceOffset + 50);
            ctx.stroke();
        }
        
        // Draw point on graph
        ctx.fillStyle = stage.color;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(stage.x, stage.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Draw percentage circle
        const circleY = stage.y + bounceOffset + stage.figureHeight / 2 + 40;
        
        // Background circle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.strokeStyle = stage.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(stage.x, circleY, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Percentage text
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${16 * this.scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(stage.value, stage.x, circleY);
        
        // Label
        ctx.fillStyle = stage.color;
        ctx.font = `${12 * this.scale}px Arial`;
        ctx.fillText(stage.label, stage.x, circleY + 40);
    }
    
    animate() {
        this.time += 0.016; // ~60fps
        
        // Draw everything
        this.drawBackground();
        this.drawGraph();
        
        // Draw stages
        this.stages.forEach((stage, index) => {
            this.drawStage(stage, index);
        });
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NRWAnimation();
    });
} else {
    new NRWAnimation();
}