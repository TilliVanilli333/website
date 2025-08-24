const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

// Extract all script content
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptContent = '';
let lineOffset = 0;
const lineOffsets = [];

while ((match = scriptRegex.exec(html)) !== null) {
    const beforeScript = html.substring(0, match.index);
    lineOffset = beforeScript.split('\n').length;
    lineOffsets.push(lineOffset);
    scriptContent += match[1] + '\n';
}

// Try to parse the JavaScript
try {
    new Function(scriptContent);
    console.log('✅ No syntax errors found in JavaScript');
} catch (error) {
    console.error('❌ Syntax error found:');
    console.error(error.message);
    
    // Try to find the approximate line
    const errorMatch = error.message.match(/at position (\d+)/);
    if (errorMatch) {
        const position = parseInt(errorMatch[1]);
        const lines = scriptContent.substring(0, position).split('\n');
        console.error(`Approximate line in combined script: ${lines.length}`);
    }
}