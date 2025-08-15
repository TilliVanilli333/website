// Universal Starfield Animation - Works on all browsers
// No WebGL required - uses Canvas 2D and CSS animations

class UniversalStarfield {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.stars = [];
        this.shootingStars = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        // Create main container
        const starfieldDiv = document.createElement('div');
        starfieldDiv.className = 'universal-starfield';
        
        // Try Canvas 2D first
        if (this.supportsCanvas()) {
            this.initCanvasStarfield(starfieldDiv);
        }
        
        // Always add CSS stars as enhancement or fallback
        this.initCSSStars(starfieldDiv);
        
        // Add cosmic dust
        this.initCosmicDust(starfieldDiv);
        
        // Add nebula effect
        this.initNebula(starfieldDiv);
        
        this.container.appendChild(starfieldDiv);
        
        // Mouse parallax removed for better performance
    }
    
    supportsCanvas() {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
    }
    
    initCanvasStarfield(container) {
        const canvas = document.createElement('canvas');
        canvas.className = 'starfield-canvas';
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.generateCanvasStars(canvas.width, canvas.height);
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        container.appendChild(canvas);
        
        // Animate canvas stars
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width / 2
            );
            gradient.addColorStop(0, 'rgba(0, 8, 20, 0.2)');
            gradient.addColorStop(0.4, 'rgba(0, 29, 61, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw stars
            this.stars.forEach(star => {
                // Parallax effect
                star.x -= star.speed;
                if (star.x < -10) {
                    star.x = canvas.width + 10;
                    star.y = Math.random() * canvas.height;
                }
                
                // Twinkling effect
                star.opacity = Math.sin(Date.now() * 0.001 * star.twinkleSpeed) * 0.5 + 0.5;
                
                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * star.brightness})`;
                ctx.fill();
                
                // Add glow effect for larger stars
                if (star.size > 1) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    const glowGradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 3
                    );
                    glowGradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.3})`);
                    glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = glowGradient;
                    ctx.fill();
                }
            });
            
            // Draw shooting stars
            this.updateShootingStars(ctx, canvas.width, canvas.height);
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    generateCanvasStars(width, height) {
        this.stars = [];
        const starCount = Math.min(60, Math.floor((width * height) / 15000)); // Noch weniger Sterne
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                brightness: Math.random() * 0.5 + 0.5,
                twinkleSpeed: Math.random() * 2 + 1,
                opacity: 1
            });
        }
    }
    
    updateShootingStars(ctx, width, height) {
        // Keine neuen Sternschnuppen mehr hinzufügen
        // Nur noch existierende abarbeiten
        
        // Update and draw shooting stars
        this.shootingStars = this.shootingStars.filter(star => {
            star.x += Math.cos(star.angle * Math.PI / 180) * star.speed;
            star.y += Math.sin(star.angle * Math.PI / 180) * star.speed;
            star.opacity -= 0.02;
            
            if (star.opacity > 0) {
                // Draw shooting star trail
                const gradient = ctx.createLinearGradient(
                    star.x, star.y,
                    star.x - Math.cos(star.angle * Math.PI / 180) * star.length,
                    star.y - Math.sin(star.angle * Math.PI / 180) * star.length
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(
                    star.x - Math.cos(star.angle * Math.PI / 180) * star.length,
                    star.y - Math.sin(star.angle * Math.PI / 180) * star.length
                );
                ctx.stroke();
                
                return true;
            }
            return false;
        });
    }
    
    initCSSStars(container) {
        // Create multiple layers for parallax
        for (let layer = 1; layer <= 2; layer++) { // Nur 2 Layer statt 3
            const layerDiv = document.createElement('div');
            layerDiv.className = `css-stars-layer stars-layer-${layer}`;
            
            const starCount = layer === 1 ? 15 : 3; // Layer 1: weniger statische Sterne, Layer 2: sehr wenige bewegende
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                const size = layer === 1 ? 'large' : layer === 2 ? 'medium' : 'small';
                star.className = `star-${size}`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                star.style.animationDuration = `${3 + Math.random() * 4}s`;
                
                layerDiv.appendChild(star);
            }
            
            container.appendChild(layerDiv);
        }
        
        // Keine Sternschnuppen mehr
    }
    
    initCosmicDust(container) {
        const dustContainer = document.createElement('div');
        dustContainer.className = 'cosmic-dust';
        
        for (let i = 1; i <= 2; i++) { // Weniger Staub-Partikel
            const dust = document.createElement('div');
            dust.className = `dust-particle dust-${i}`;
            dust.style.left = `${Math.random() * 100}%`;
            dust.style.top = `${Math.random() * 100}%`;
            dustContainer.appendChild(dust);
        }
        
        container.appendChild(dustContainer);
    }
    
    initNebula(container) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-gradient';
        container.appendChild(nebula);
    }
    
    // Mouse parallax removed - stars stay fixed
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if container exists
    const starfieldContainer = document.querySelector('.main-website-stars');
    if (starfieldContainer) {
        // Give the container an ID if it doesn't have one
        if (!starfieldContainer.id) {
            starfieldContainer.id = 'starfield-container';
        }
        new UniversalStarfield(starfieldContainer.id);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalStarfield;
}