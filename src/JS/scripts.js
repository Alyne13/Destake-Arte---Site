let slideIndex = 1;
let slideshowInterval;

// Função para exibir slides
function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");

    // Ajusta o índice do slide
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // Esconde todos os slides
    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
    });

    // Remove a classe "active" de todos os pontos
    Array.from(dots).forEach(dot => {
        dot.className = dot.className.replace(" active", "");
    });

    // Exibe o slide atual e marca o ponto correspondente
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Função para avançar slides automaticamente
function nextSlide() {
    showSlides(slideIndex += 1);
}

// Inicia o slideshow automático
function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 5000); // 5 segundos
}

// Reseta o slideshow quando o usuário interage
function resetSlideshow() {
    clearInterval(slideshowInterval);
    startSlideshow();
}

// Função para ir para um slide específico
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetSlideshow();
}

// Função para alternar o tema
function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById('themeButton');
    const logo = document.getElementById('logo');

    // Alterna entre os modos claro e escuro
    if (body.classList.toggle('dark-mode')) {
        body.classList.remove('light-mode');
        themeButton.textContent = '☀️ Modo Claro';
        logo.src = 'src/imagens/logo-dark.png';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        themeButton.textContent = '🌙 Modo Escuro';
        logo.src = 'src/imagens/logo-light.png';
        localStorage.setItem('theme', 'light');
    }
}

// Função para carregar o tema salvo
function loadTheme() {
    const body = document.body;
    const themeButton = document.getElementById('themeButton');
    const logo = document.getElementById('logo');
    const savedTheme = localStorage.getItem('theme') || 'light'; // Define 'light' como padrão

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeButton.textContent = '☀️ Modo Claro';
        logo.src = 'src/imagens/logo-dark.png';
    } else {
        body.classList.add('light-mode');
        themeButton.textContent = '🌙 Modo Escuro';
        logo.src = 'src/imagens/logo-light.png';
    }
}

// Executa quando o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', function () {
    loadTheme(); // Carrega o tema salvo ou define o padrão
    showSlides(slideIndex); // Exibe o primeiro slide e inicia o slideshow
    startSlideshow();

    // Adiciona eventos de clique aos dots para navegação manual
    const dots = document.getElementsByClassName("dot");
    Array.from(dots).forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide(index + 1); // Slide index começa em 1
        });
    });

    // Manipulação do formulário "Fale Conosco"
    const faleConoscoForm = document.getElementById('faleConoscoForm');
    if (faleConoscoForm) {
        faleConoscoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Sua mensagem foi enviada com sucesso!');
            this.reset();
        });
    }

    // Manipulação do formulário "Orçamento"
    const orcamentoForm = document.getElementById('orcamentoForm');
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Solicitação de orçamento enviada com sucesso!');
            this.reset();
        });
    }

    // Adiciona evento de clique ao botão de tema
    const themeButton = document.getElementById('themeButton');
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
    }
});
