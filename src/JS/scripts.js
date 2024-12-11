let slideIndex = 1;
let slideshowInterval;

// Função para exibir slides
function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
    });

    Array.from(dots).forEach(dot => {
        dot.className = dot.className.replace(" active", "");
    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Função para avançar slides automaticamente
function nextSlide() {
    showSlides(slideIndex += 1);
}

// Inicia o slideshow automático
function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 5000);
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
    const logo = document.getElementById('logo');
    const themeButton = document.getElementById('themeButton');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        logo.src = 'src/imagens/logo-light.png';
        themeButton.textContent = '🌙 Modo Escuro';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        logo.src = 'src/imagens/logo-dark.png';
        themeButton.textContent = '☀️ Modo Claro';
        localStorage.setItem('theme', 'dark');
    }
}

// Função para carregar o tema salvo no localStorage
function loadTheme() {
    const body = document.body;
    const themeButton = document.getElementById('themeButton');
    const logo = document.getElementById('logo');
    const savedTheme = localStorage.getItem('theme') || 'light'; // Define 'light' como padrão

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        logo.src = 'src/imagens/logo-dark.png';
        themeButton.textContent = '☀️ Modo Claro';
    } else {
        body.classList.add('light-mode');
        logo.src = 'src/imagens/logo-light.png';
        themeButton.textContent = '🌙 Modo Escuro';
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
            currentSlide(index + 1);
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

    // Função para carregar as imagens automaticamente
    function loadImages() {
        const images = [
            "Produto1.jpg",
            "Produto2.jpg",
            "Produto3.jpg",
            "Produto4.jpg",
            "Produto5.jpg"
        ];

        const gallery = document.getElementById('image-gallery');
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `src/imagens/${image}`;
            imgElement.alt = image;
            imgElement.classList.add('gallery-image');
            gallery.appendChild(imgElement);
        });
    }

    // Carrega as imagens
    loadImages();
});
