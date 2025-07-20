// Medidas de segurança básica do site
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
    }
    // Ctrl + Shift + J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
    }
    // Ctrl + U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
    }
    // F12 (DevTools)
    if (e.keyCode === 123) {
        e.preventDefault();
    }
});

// Desabilitar seleção de texto
document.addEventListener('selectstart', (e) => e.preventDefault());

// Desabilitar arrastar imagens
document.addEventListener('dragstart', (e) => e.preventDefault());

// Desabilitar atalhos de impressão
window.addEventListener('keyup', function(e) {
    if (e.ctrlKey && e.keyCode == 80) {
        e.preventDefault();
        return false;
    }
});

// Desabilitar visualização da fonte da página
document.addEventListener('keypress', function(e) {
    if (e.ctrlKey && e.keyCode == 17) {
        e.preventDefault();
        return false;
    }
}); 