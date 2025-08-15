# DISKURS Niederrhein Website - Dokumentation

## 🌐 Website-Übersicht

Die Website von **DISKURS Niederrhein** ist eine moderne, interaktive Plattform für Demokratie- und Medienbildung mit Fokus auf Kinderrechte und partizipative Pädagogik. Die Website nutzt fortschrittliche Web-Technologien für ein immersives Benutzererlebnis.

## 📁 Dateistruktur

```
website-main/
├── index.html              # Hauptseite mit allen Inhalten
├── datenschutz.html        # Datenschutzerklärung
├── impressum.html          # Impressum
├── header.js               # Dynamischer Header-Generator
├── assets/
│   └── fonts/              # Lokale Schriftarten (Exo 2, Orbitron)
├── js/
│   └── three.min.js        # Three.js Bibliothek (lokal)
├── images/                 # 15 animierte GIF-Dateien
└── nrwanimation/           # Interaktive NRW-Bildungsdaten
    ├── index.html
    ├── base64_texture.js   # Silhouetten-Texturen
    └── assets/             # Charaktere für Animation
```

## 🎨 Design & Technologie

### Visuelles Konzept
- **Weltraum-Thema**: Dunkler Hintergrund mit animiertem Sternenhimmel
- **3D-Planeten**: Verschiedene Planetentypen (einfach, mit Ringen, Sonnensystem) in vier Farbthemen
- **Responsive Design**: Optimiert für alle Geräte (Mobile-First-Ansatz)
- **Barrierefreiheit**: CSS-Fallbacks für Geräte ohne WebGL-Unterstützung

### Farbschema
- **Blau** (#4facfe): Demokratiebildung & Vision
- **Lila** (#667eea): Raumstation-Pädagogik
- **Grün** (#56ab2f): Wünschestadt & Kinderperspektive
- **Orange** (#ff6b35): Team & Kompetenzen

### Technische Features
1. **Three.js Integration**
   - Animierter 3D-Sternenhimmel mit Parallax-Scrolling
   - 12 verschiedene 3D-Planeten (3 Typen × 4 Farben)
   - Kosmischer Staub und Partikeleffekte
   - Performance-Optimierung für Mobile

2. **Responsive Navigation**
   - Dynamischer Header mit Hamburger-Menü
   - Smooth-Scrolling zu Sektionen
   - Adaptive Schriftgrößen mit CSS clamp()

3. **Easter Eggs**
   - "NIEKE" Buchstaben-Animation (360-550px Viewport)
   - Glühende "ti" in "Raumstation"

## 📝 Inhaltliche Struktur

### Hauptsektionen

#### 1. **Demokratiebildung** (Blau)
- Vier wichtige Dinge für Bildung und Demokratie
- NRW-Bildungsdaten Animation (interaktiv)
- Projekte: Kinder gestalten Gesellschaft
- Vision: Bildung neu denken

#### 2. **Raumstation** (Lila)
- Was: Raumstation-Projekte im Kreis Kleve
- Wie: Raumstation-Pädagogik Methodik
- Warum: Ziele und Wirkung

#### 3. **Wünschestadt** (Grün)
- Demokratisches Beteiligungsprojekt
- Stadtplanung aus Kinderperspektive
- Analog-digitale Methoden
- Stadtplan aus Kindersicht

#### 4. **Team** (Orange)
- Kinderrechte als Fundament
- Forschung trifft Praxis
- Methodenvielfalt mit Medienkompetenz

## 🖼️ Medien-Inventar

### Animierte GIFs (15 Dateien)
1. **demokratie1.gif** - Pädagogische Pflicht
2. **demokratie2.gif** - Vision
3. **demokratie3.gif** - Methodische Vielfalt
4. **stuhl.gif** - Raumstation-Projekte
5. **stuhl2.gif** - Alternative Raumstation-Visual
6. **interviews.gif** - Pädagogische Prinzipien
7. **WünschestadtGif1.gif** - Stadtbegehung
8. **WünschestadtGif2.gif** - Wünschestadt Impressionen
9. **Greenscreen.gif** - Analog-Digital Verbindung
10. **gifemmerichpan.gif** - Stadtplan Kinderperspektive
11. **crowd.gif** - Team Raumstation
12. **galaxieraum.gif** - Pädagogische Expertise
13. **november24.gif** - Beratungsexpertise
14. **november2024.gif** - Praxisexpertise
15. **GifKinderrechteausstellung.gif** - Kinderrechte-Ausstellung

## 🔧 Technische Spezifikationen

### JavaScript-Komponenten
- **header.js**: Generiert dynamischen Header basierend auf aktueller Seite
- **Three.js Planeten**: 4 Farbthemen × 3 Planetentypen = 12 Instanzen
- **Sternfeld**: 4900+ animierte Sterne in 7 Schichten
- **Kosmischer Staub**: 4 animierte Staubschichten

### NRW-Animation Features
- WebGL-basierte interaktive Visualisierung
- 4 Charaktere repräsentieren Kompetenzstufen
- Responsive Skalierung und Positionierung
- Base64-kodierte Texturen für schnelles Laden

### Performance-Optimierungen
- Lazy Loading für Iframes
- WebGL-Fallback zu CSS-Animationen
- Mobile-optimierte Partikelanzahl
- Lokale Assets (keine externen CDNs)

## 🍪 Datenschutz
- **Keine Cookies**: Website verzichtet auf Tracking
- **Keine externen Dienste**: Alle Ressourcen lokal gehostet
- **Privacy-First**: Informatives Cookie-Banner (Auto-Dismiss nach 8s)

## 📱 Responsive Breakpoints
- **Mobile**: < 768px (Hamburger-Menü)
- **Tablet**: 768px - 992px
- **Desktop**: > 992px
- **Spezial**: 360px - 550px (Easter Egg aktiv)

## 🎯 Zielgruppe
- Bildungseinrichtungen (Kitas, Schulen)
- Kommunen und Stadtplaner
- Pädagogische Fachkräfte
- Eltern und Familien
- Kinder und Jugendliche

## 🚀 Besondere Features
1. **Immersive 3D-Umgebung** mit Weltraum-Thematik
2. **Interaktive Datenvisualisierung** (NRW-Bildungsdaten)
3. **Barrierefreie Fallbacks** für alle Geräte
4. **Performance-optimiert** für mobile Nutzung
5. **Datenschutzfreundlich** ohne Tracking

## 📊 Inhaltliche Schwerpunkte
- **Demokratiebildung**: Förderung politischen Wissens
- **Kinderrechte**: Verankerung im Grundgesetz
- **Partizipation**: Beteiligung auf allen Ebenen
- **Medienkompetenz**: Verbindung analog-digital
- **Raumstation-Pädagogik**: Sichere Räume für Entwicklung

## 🔗 Kontakt
- **E-Mail**: desk@diskurs-niederrhein.de
- **Region**: Kreis Kleve, Niederrhein

## 📅 Updates

### Januar 2025 - Migration von Three.js zu universellen Animationen
- **Komplette Entfernung von Three.js/WebGL**: Alle 3D-Animationen wurden durch universell kompatible Canvas 2D/CSS-Lösungen ersetzt
- **Neue Planet-Animationen**: 
  - Vereinfachte, zuverlässige Implementierung ohne externe Bibliotheken
  - Saturn-Ringe mit korrekter 3D-Simulation (vorne/hinten getrennt)
  - Reine CSS/JavaScript-Lösung für maximale Kompatibilität
- **Optimiertes Sternenfeld**:
  - Reduzierte Sternanzahl (max. 60 Canvas-Sterne, 15+3 CSS-Sterne)
  - Entfernung des Maus-Parallax-Effekts für ruhigere Darstellung
  - Keine Sternschnuppen mehr für professionelleres Erscheinungsbild
  - Nur noch 2 Staub-Partikel statt 4
- **NRW-Animation**: 
  - Größere, schärfere Darstellung mit Device-Pixel-Ratio-Unterstützung
  - Verbesserte Ausrichtung mit umgebendem Text
  - Canvas 2D statt WebGL für universelle Kompatibilität
- **Code-Bereinigung**:
  - Gemeinsame Starfield-Dateien (starfield.js/css) für alle Seiten
  - Entfernung aller Three.js-Abhängigkeiten
  - Beseitigung von doppeltem Code in datenschutz.html und impressum.html
- **Datenschutz-Verbesserungen**:
  - Keine externen APIs oder CDNs mehr
  - Alle Ressourcen werden lokal gehostet
  - Vollständig Cookie-frei, kein Tracking

---

*Diese README dient als Referenz für zukünftige Entwicklung und Wartung der DISKURS Niederrhein Website.*