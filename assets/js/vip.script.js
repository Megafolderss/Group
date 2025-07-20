// Timer regressivo de 3 minutos
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    
    const countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            display.textContent = "EXPIRED";
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Iniciar timer de 3 minutos
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        startTimer(3 * 60, timerDisplay);
    }

    // Elementos do vídeo
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    
    // Elementos do popup
    const popup = document.getElementById('paymentPopup');
    const closePopupBtn = document.querySelector('.close-popup');
    const vipButton = document.querySelector('.vip-button');
    
    // Contador de visualizações
    const viewerCounter = document.getElementById('viewerCounter');

    // Configuração inicial do vídeo
    if (video) {
        // Aumentar velocidade de reprodução
        video.playbackRate = 1.5;
        
        // Otimizar carregamento
        video.preload = "auto";
        
        // Forçar reprodução
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(function(error) {
                console.log("Erro na reprodução automática:", error);
            });
        }
    }
    
    // Função para abrir o popup
    function openPopup() {
        if (popup) {
            popup.style.display = 'flex';
            setTimeout(() => {
                popup.classList.add('active');
            }, 10);
        }
    }
    
    // Função para fechar o popup
    function closePopup() {
        if (popup) {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    }
    
    // Abrir popup quando o vídeo terminar
    let hasShownPopup = false;
    if (video) {
        video.addEventListener('timeupdate', function() {
            if (video.currentTime >= video.duration - 1 && !hasShownPopup) {
                openPopup();
                hasShownPopup = true;
            }
        });
    }
    
    // Abrir popup ao clicar no botão VIP
    if (vipButton) {
        vipButton.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup();
        });
    }
    
    // Fechar popup ao clicar no X
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }
    
    // Fechar popup ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Controles do vídeo
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    // Controle de áudio
    if (muteBtn) {
        muteBtn.addEventListener('click', function() {
            if (video) {
                video.muted = !video.muted;
                if (video.muted) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else {
                    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    // Forçar reprodução quando desmutar
                    video.play().then(() => {
                        video.volume = 1;
                    }).catch(error => {
                        console.log("Erro ao reproduzir vídeo:", error);
                    });
                }
            }
        });
    }
    
    // Simular contador de visualizações
    let viewerCount = Math.floor(Math.random() * 50) + 50;
    if (viewerCounter) {
        viewerCounter.textContent = viewerCount;
        
        setInterval(() => {
            viewerCount += Math.floor(Math.random() * 3);
            viewerCounter.textContent = viewerCount;
        }, 5000);
    }

    // Controle do modal de confirmação
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    function showConfirmationModal() {
        confirmationModal.classList.add('active');
    }

    function hideConfirmationModal() {
        confirmationModal.classList.remove('active');
    }

    // Event listeners para o modal
    confirmButton.addEventListener('click', () => {
        hideConfirmationModal();
    });

    cancelButton.addEventListener('click', () => {
        hideConfirmationModal();
    });
    
    // Mostrar modal quando o usuário tentar copiar conteúdo
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        showConfirmationModal();
    });

    // Prevenir interações com o vídeo
    if (video) {
        // Prevenir clique direito
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Prevenir arrastar o vídeo
        video.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });

        // Prevenir controles de teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
            }
        });
    }
});
