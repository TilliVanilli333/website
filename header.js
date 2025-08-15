function createHeader() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === 'index.html' || currentPage === '';
    
    // Füge zusätzliche Styles für besseres Header-Layout hinzu
    const headerStyles = `
        <style>
            .header-enhanced {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 90px;
                padding: 25px 40px !important;
            }
            
            .nav-enhanced {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: clamp(10px, 2vw, 40px) !important;
                max-width: min(1100px, 90vw);
                width: 100%;
                margin: 0 auto;
                padding: 0;
            }
            
            .nav-enhanced a {
                font-size: clamp(10px, calc(0.9vw + 9px), 16px) !important;
                padding: 8px clamp(6px, 1.2vw, 18px) !important;
                letter-spacing: clamp(0.3px, 0.08vw, 1.2px) !important;
                white-space: nowrap;
                display: flex;
                align-items: center;
                min-height: 40px;
                flex-shrink: 1;
                min-width: 0;
                flex: 0 1 auto;
            }
            
            @media (max-width: 1200px) {
                .nav-enhanced {
                    gap: clamp(8px, 1.5vw, 25px) !important;
                }
                
                .nav-enhanced a {
                    font-size: clamp(9px, calc(0.7vw + 8px), 15px) !important;
                    padding: 6px clamp(5px, 0.8vw, 12px) !important;
                    letter-spacing: clamp(0.2px, 0.06vw, 0.8px) !important;
                }
            }
            
            @media (max-width: 992px) {
                .nav-enhanced {
                    gap: 8px !important;
                }
                
                .nav-enhanced a {
                    font-size: clamp(8px, calc(0.6vw + 7px), 13px) !important;
                    padding: 5px 6px !important;
                    letter-spacing: 0.3px !important;
                }
            }
            
            @media (max-width: 850px) and (min-width: 769px) {
                .nav-enhanced {
                    gap: 6px !important;
                    max-width: 95vw;
                }
                
                .nav-enhanced a {
                    font-size: 11px !important;
                    padding: 4px 5px !important;
                    letter-spacing: 0 !important;
                }
            }
            
            @media (max-width: 768px) {
                .header-enhanced {
                    padding: 20px 20px !important;
                }
                
                .nav-enhanced.active {
                    position: fixed;
                    top: 90px;
                    right: 0 !important;
                    flex-direction: column;
                    width: 100%;
                    height: calc(100vh - 90px);
                    background: rgba(0, 8, 20, 0.98);
                    backdrop-filter: blur(20px);
                    padding-top: 60px;
                    gap: 30px !important;
                }
                
                .nav-enhanced a {
                    font-size: 20px !important;
                    padding: 15px 30px !important;
                    width: 80%;
                    text-align: center;
                    justify-content: center;
                    border-bottom: 1px solid rgba(79, 172, 254, 0.2);
                }
            }
        </style>
    `;
    
    const headerHTML = `
        ${headerStyles}
        <header class="header header-enhanced">
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav class="nav nav-enhanced">
                ${isHomePage ? 
                    `<a href="#mission">Demokratiebildung</a>
                    <a href="#raumstation">Raumsta<span class="raumstation-ti">ti</span>on</a>
                    <a href="#paedagogik">Kinderperspektive</a>
                    <a href="#team">Team</a>` :
                    `<a href="index.html">Startseite</a>
                    <a href="index.html#mission">Demokratiebildung</a>
                    <a href="index.html#raumstation">Raumsta<span style="color: #4facfe;">ti</span>on</a>
                    <a href="index.html#paedagogik">Kinderperspektive</a>
                    <a href="index.html#team">Team</a>`
                }
            </nav>
        </header>
    `;
    
    return headerHTML;
}

function initializeHeader() {
    // Finde den Container wo der Header eingefügt werden soll
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader();
        
        // Event Listener für Hamburger Menu hinzufügen
        const hamburger = document.getElementById('hamburger');
        const nav = document.querySelector('.nav');
        
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                nav.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
            
            // Schließe das Menü beim Klicken auf einen Link
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    }
}

// Initialisiere den Header sobald das DOM geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeader);
} else {
    initializeHeader();
}
