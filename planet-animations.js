// Universal Planet Animations - Simplified foolproof version

class UniversalPlanet {
    constructor(containerId, type = 'simple', colorTheme = 'blue') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.type = type; // 'simple', 'ring', 'solar'
        this.colorTheme = colorTheme; // 'blue', 'purple', 'green', 'orange'
        
        this.init();
    }
    
    init() {
        // Clear container
        this.container.innerHTML = '';
        this.container.style.cssText = 'width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; position: relative;';
        
        switch(this.type) {
            case 'ring':
                this.createRingedPlanet();
                break;
            case 'solar':
                this.createSolarSystem();
                break;
            default:
                this.createSimplePlanet();
        }
    }
    
    createSimplePlanet() {
        // Create planet directly - no wrapper
        const planet = document.createElement('div');
        planet.style.cssText = `
            width: 140px;
            height: 140px;
            border-radius: 50%;
            position: relative;
            animation: rotate2d 20s linear infinite;
            box-shadow: inset -25px -25px 40px rgba(0,0,0,0.5), 
                        inset 5px 5px 15px rgba(255,255,255,0.2);
        `;
        
        // Apply color based on theme
        const colors = this.getGradientColors();
        planet.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
        
        // Add simple highlight for 3D effect
        const highlight = document.createElement('div');
        highlight.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(ellipse at 35% 35%, 
                        rgba(255,255,255,0.4) 0%, 
                        rgba(255,255,255,0.2) 15%, 
                        transparent 40%);
            pointer-events: none;
        `;
        planet.appendChild(highlight);
        
        // Add shadow layer
        const shadow = document.createElement('div');
        shadow.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(90deg, 
                        transparent 0%, 
                        transparent 40%, 
                        rgba(0,0,0,0.4) 100%);
            pointer-events: none;
        `;
        planet.appendChild(shadow);
        
        // Add surface details based on type
        if (this.colorTheme === 'orange' || this.colorTheme === 'green') {
            // Rocky planets - add subtle craters
            for (let i = 0; i < 3; i++) {
                const crater = document.createElement('div');
                const size = 10 + Math.random() * 15;
                const top = 20 + Math.random() * 60;
                const left = 20 + Math.random() * 60;
                crater.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    top: ${top}%;
                    left: ${left}%;
                    background: radial-gradient(circle, rgba(0,0,0,0.2) 0%, transparent 70%);
                `;
                planet.appendChild(crater);
            }
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotate2d {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        if (!document.querySelector('style[data-planet-animations]')) {
            style.setAttribute('data-planet-animations', 'true');
            document.head.appendChild(style);
        }
        
        this.container.appendChild(planet);
    }
    
    createRingedPlanet() {
        // Create a container for proper layering
        const container = document.createElement('div');
        container.style.cssText = 'position: relative; width: 220px; height: 220px;';
        
        // Create BACK rings (behind planet)
        const backRingContainer = document.createElement('div');
        backRingContainer.style.cssText = `
            position: absolute;
            width: 220px;
            height: 60px;
            top: 80px;
            left: 0;
            overflow: hidden;
            z-index: 1;
        `;
        
        // Back ring ellipses
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            const width = 160 + i * 20;
            const height = 40 + i * 5;
            const thickness = 3 - i * 0.5;
            ring.style.cssText = `
                position: absolute;
                width: ${width}px;
                height: ${height}px;
                border: ${thickness}px solid;
                border-radius: 50%;
                top: ${30 - height/2}px;
                left: ${110 - width/2}px;
                opacity: ${0.3 - i * 0.08};
                clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
            `;
            const ringColor = this.getRingColor();
            ring.style.borderColor = ringColor;
            backRingContainer.appendChild(ring);
        }
        
        // Create the planet
        const planet = document.createElement('div');
        planet.style.cssText = `
            width: 120px;
            height: 120px;
            border-radius: 50%;
            position: absolute;
            top: 50px;
            left: 50px;
            z-index: 2;
            animation: rotate2d 20s linear infinite;
            box-shadow: inset -20px -20px 35px rgba(0,0,0,0.5), 
                        inset 5px 5px 12px rgba(255,255,255,0.2);
        `;
        
        // Apply color
        const colors = this.getGradientColors();
        planet.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
        
        // Add highlight
        const highlight = document.createElement('div');
        highlight.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(ellipse at 35% 35%, 
                        rgba(255,255,255,0.4) 0%, 
                        rgba(255,255,255,0.2) 15%, 
                        transparent 40%);
        `;
        planet.appendChild(highlight);
        
        // Create FRONT rings (in front of planet)
        const frontRingContainer = document.createElement('div');
        frontRingContainer.style.cssText = `
            position: absolute;
            width: 220px;
            height: 60px;
            top: 80px;
            left: 0;
            overflow: hidden;
            z-index: 3;
        `;
        
        // Front ring ellipses
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            const width = 160 + i * 20;
            const height = 40 + i * 5;
            const thickness = 3 - i * 0.5;
            ring.style.cssText = `
                position: absolute;
                width: ${width}px;
                height: ${height}px;
                border: ${thickness}px solid;
                border-radius: 50%;
                top: ${30 - height/2}px;
                left: ${110 - width/2}px;
                opacity: ${0.5 - i * 0.1};
                clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
            `;
            const ringColor = this.getRingColor();
            ring.style.borderColor = ringColor;
            frontRingContainer.appendChild(ring);
        }
        
        // Add components in correct order
        container.appendChild(backRingContainer);
        container.appendChild(planet);
        container.appendChild(frontRingContainer);
        
        this.container.appendChild(container);
    }
    
    createSolarSystem() {
        const solarSystem = document.createElement('div');
        solarSystem.style.cssText = 'width: 220px; height: 220px; position: relative;';
        
        // Central planet
        const centralPlanet = document.createElement('div');
        centralPlanet.style.cssText = `
            width: 80px;
            height: 80px;
            border-radius: 50%;
            position: absolute;
            top: 70px;
            left: 70px;
            z-index: 2;
            animation: rotate2d 15s linear infinite;
            box-shadow: inset -15px -15px 30px rgba(0,0,0,0.5),
                        inset 3px 3px 10px rgba(255,255,255,0.2);
        `;
        
        const colors = this.getGradientColors();
        centralPlanet.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
        
        // Add highlight to central planet
        const highlight = document.createElement('div');
        highlight.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(ellipse at 35% 35%, 
                        rgba(255,255,255,0.3) 0%, 
                        transparent 40%);
        `;
        centralPlanet.appendChild(highlight);
        
        solarSystem.appendChild(centralPlanet);
        
        // Create orbits with moons
        const orbits = [
            { radius: 75, duration: '10s', moonColor: '#e0e0e0' },
            { radius: 95, duration: '15s', moonColor: '#ffeb3b', reverse: true }
        ];
        
        orbits.forEach((orbitData, index) => {
            const orbit = document.createElement('div');
            orbit.style.cssText = `
                position: absolute;
                width: ${orbitData.radius * 2}px;
                height: ${orbitData.radius * 2}px;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 50%;
                top: ${110 - orbitData.radius}px;
                left: ${110 - orbitData.radius}px;
                animation: rotate2d ${orbitData.duration} linear infinite${orbitData.reverse ? ' reverse' : ''};
            `;
            
            const moon = document.createElement('div');
            moon.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                top: -10px;
                left: calc(50% - 10px);
                background: linear-gradient(135deg, ${orbitData.moonColor} 0%, ${orbitData.moonColor}dd 100%);
                box-shadow: inset -3px -3px 5px rgba(0,0,0,0.5);
            `;
            
            orbit.appendChild(moon);
            solarSystem.appendChild(orbit);
        });
        
        this.container.appendChild(solarSystem);
    }
    
    getGradientColors() {
        const themes = {
            'blue': ['#4facfe', '#00f2fe', '#1a5490'],
            'purple': ['#667eea', '#764ba2', '#3a1c71'],
            'green': ['#56ab2f', '#a8e063', '#2a5a1c'],
            'orange': ['#ff6b35', '#f7931e', '#c73e1d']
        };
        return themes[this.colorTheme] || themes['blue'];
    }
    
    getRingColor() {
        const colors = {
            'blue': 'rgba(79, 172, 254, 0.6)',
            'purple': 'rgba(102, 126, 234, 0.6)',
            'green': 'rgba(86, 171, 47, 0.6)',
            'orange': 'rgba(255, 107, 53, 0.6)'
        };
        return colors[this.colorTheme] || 'rgba(255, 255, 255, 0.5)';
    }
}

// Initialize all planets on page load
document.addEventListener('DOMContentLoaded', function() {
    // Simple planets
    if (document.getElementById('blue-simple')) {
        new UniversalPlanet('blue-simple', 'simple', 'blue');
    }
    if (document.getElementById('purple-simple')) {
        new UniversalPlanet('purple-simple', 'simple', 'purple');
    }
    if (document.getElementById('green-simple')) {
        new UniversalPlanet('green-simple', 'simple', 'green');
    }
    if (document.getElementById('orange-simple')) {
        new UniversalPlanet('orange-simple', 'simple', 'orange');
    }
    
    // Ringed planets
    if (document.getElementById('blue-ring')) {
        new UniversalPlanet('blue-ring', 'ring', 'blue');
    }
    if (document.getElementById('purple-ring')) {
        new UniversalPlanet('purple-ring', 'ring', 'purple');
    }
    if (document.getElementById('green-ring')) {
        new UniversalPlanet('green-ring', 'ring', 'green');
    }
    if (document.getElementById('orange-ring')) {
        new UniversalPlanet('orange-ring', 'ring', 'orange');
    }
    
    // Solar system planets
    if (document.getElementById('blue-solar')) {
        new UniversalPlanet('blue-solar', 'solar', 'blue');
    }
    if (document.getElementById('purple-solar')) {
        new UniversalPlanet('purple-solar', 'solar', 'purple');
    }
    if (document.getElementById('green-solar')) {
        new UniversalPlanet('green-solar', 'solar', 'green');
    }
    if (document.getElementById('orange-solar')) {
        new UniversalPlanet('orange-solar', 'solar', 'orange');
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalPlanet;
}