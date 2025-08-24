// Development Configuration
// This file controls development mode settings
// To enable dev mode: set DEV_MODE = true
// To disable for production: set DEV_MODE = false

window.DEV_CONFIG = {
    // HAUPTSCHALTER: Auf false setzen für Produktion!
    DEV_MODE: false,
    
    // Auto-load settings for development
    AUTO_LOAD_PROJECT: {
        enabled: true,
        projectName: "Test Emmerich 2024",
        kommune: "Emmerich am Rhein",
        radius: 3,
        centerLat: 51.8353,  // Emmerich am Rhein coordinates
        centerLng: 6.2458,
        zoom: 14
    },
    
    // Skip setup screen in dev mode
    SKIP_SETUP: true,
    
    // Auto-start with demo data
    LOAD_DEMO_DATA: true,
    
    // Show dev tools/info
    SHOW_DEV_INFO: true,
    
    // Console logging level
    LOG_LEVEL: 'debug', // 'debug', 'info', 'warn', 'error'
    
    // Auto-save interval (ms)
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    
    // Mock GPS location for testing (Emmerich am Rhein)
    MOCK_GPS: {
        enabled: false, // Set to true to use mock location
        lat: 51.8353,
        lng: 6.2458,
        accuracy: 10
    }
};

// Development helper functions
window.DevHelper = {
    // Quick toggle dev mode
    toggle: function() {
        window.DEV_CONFIG.DEV_MODE = !window.DEV_CONFIG.DEV_MODE;
        console.log('🔧 Dev Mode:', window.DEV_CONFIG.DEV_MODE ? 'ENABLED' : 'DISABLED');
        localStorage.setItem('dev_mode', window.DEV_CONFIG.DEV_MODE);
        location.reload();
    },
    
    // Reset all data
    resetAll: function() {
        if (confirm('⚠️ Alle lokalen Daten löschen?')) {
            localStorage.clear();
            indexedDB.deleteDatabase('KinderfreundlichDB');
            console.log('🗑️ Alle Daten gelöscht');
            location.reload();
        }
    },
    
    // Quick project switch
    loadProject: function(kommune) {
        window.DEV_CONFIG.AUTO_LOAD_PROJECT.kommune = kommune;
        console.log('📂 Switching to:', kommune);
        location.reload();
    },
    
    // Show current config
    showConfig: function() {
        console.table(window.DEV_CONFIG);
    }
};

// Check localStorage for persistent dev mode setting
const savedDevMode = localStorage.getItem('dev_mode');
if (savedDevMode !== null) {
    window.DEV_CONFIG.DEV_MODE = savedDevMode === 'true';
}

// Console notification
if (window.DEV_CONFIG.DEV_MODE) {
    console.log(`
    🚀 ========================================
    🚀 ENTWICKLUNGSMODUS AKTIV
    🚀 ========================================
    📍 Kommune: ${window.DEV_CONFIG.AUTO_LOAD_PROJECT.kommune}
    📏 Radius: ${window.DEV_CONFIG.AUTO_LOAD_PROJECT.radius}km
    
    Verfügbare Befehle:
    - DevHelper.toggle()     → Dev-Modus umschalten
    - DevHelper.resetAll()   → Alle Daten löschen
    - DevHelper.showConfig() → Config anzeigen
    - DevHelper.loadProject('Stadt') → Stadt wechseln
    
    ⚠️ Für Produktion: DEV_MODE auf false setzen!
    ========================================
    `);
}