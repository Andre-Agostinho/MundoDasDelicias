
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("foodCarousel");
  const progressBar = carousel.querySelector(".carousel-progress-bar");

  // Reset progress bar when slide changes
  carousel.addEventListener("slide.bs.carousel", function () {
    progressBar.style.animation = "none";
    void progressBar.offsetWidth; // Trigger reflow
    progressBar.style.animation = "progress-animation 4s linear infinite";
  });
});


function searchRecipe(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) return;

    // Mapa de receitas e suas páginas
    const recipePages = {
        // Entradas
        'entradas': '/MundoDasDelicias/Pages/Entradas.html',
        'bruschetta': '/MundoDasDelicias/Pages/Entradas.html#Bruschetta Italiana',
        'pasteis de bacalhau': '/MundoDasDelicias/Pages/Entradas.html#Pastéis de Bacalhau',
        
        // Sopas
        'sopas': '/MundoDasDelicias/Pages/Sopas.html',
        'caldo verde': '/MundoDasDelicias/Pages/Sopas.html#Caldo Verde',
        'sopa de legumes': '/MundoDasDelicias/Pages/Sopas.html#Sopa de Legumes',
        'creme de abobora': '/MundoDasDelicias/Pages/Sopas.html#Creme de Abóbora',
        
        // Pratos Principais
        'pratos principais': '/MundoDasDelicias/Pages/Pratos_Principais.html',
        'frango assado': '/MundoDasDelicias/Pages/Pratos_Principais.html#Frango Assado',
        'bacalhau com natas': '/MundoDasDelicias/Pages/Pratos_Principais.html#Bacalhau com Natas',
        'feijoada à portuguesa': '/MundoDasDelicias/Pages/Pratos_Principais.html#Feijoada à Portuguesa',

        // Sobremesas
        'sobremesas': '/MundoDasDelicias/Pages/Sobremesas.html',
        'mousse de chocolate': '/MundoDasDelicias/Pages/Sobremesas.html#Mousse de Chocolate',
        'pudim de leite': '/MundoDasDelicias/Pages/Sobremesas.html#Pudim de Leite',
        'pastel de nata': '/MundoDasDelicias/Pages/Sobremesas.html#Pastel de Nata',
        'azevias de batata doce': '/MundoDasDelicias/Pages/Sobremesas.html#Azevias de Batata Doce',
        // Adicione mais receitas conforme necessário
    };
    

    const recipeRegexes = {
     // Entradas
     'entradas': /entrada/i,
     'bruschetta': /bruschetta|bruscheta/i, // Case-insensitive match
     'pasteis de bacalhau': /pasteis.*bacalhau|pastel.*bacalhau/i, // Matches "pasteis de bacalhau" or "pasteis with bacalhau"

     //Sopas
     'sopas': /sopas/i,
     'caldo verde': /caldo.*verde/i,
     'sopa de legumes': /sopa de legume|sopa.*legume/i,
     'creme de abobora': /creme.*abobora/i,

    // Pratos Principais
    // 'pratos principais': /prato.*principal|prato.*principais/i,
    'frango assado': /frango.*assado|frango.*forno/i,
    'bacalhau com natas': /bacalhau.*nata/i,
    'feijoada à portuguesa': /feijoada.*portuguesa|feijoada/i,

     // Sobremesas
    'sobremesas': /sobremesa/i,
    'pastel de nata': /(pastel de nata|nata)/i,
    'mousse de chocolate': /(mousse|mouse|mousse.*chocolate|chocolate)/i,
    'azevias de batata doce': /(azevias|azevias.*batata|batata.*doce)/i,
    'pudim de leite': /pudim.*leite/i,
    }

    // Procura pela receita no mapa
    let found = false;
     for (const recipeKey in recipeRegexes) {
        if (recipeRegexes[recipeKey].test(searchTerm)) { // Use regex.test()
            window.location.href = recipePages[recipeKey]; //Assumes you have a recipePages object as well
            found = true;
            break;
        }
    }


    // Mostra mensagem se nenhum resultado for encontrado
    if (!found) {
        let noResultsMsg = document.getElementById('no-results-message');
        if (!noResultsMsg) {
            noResultsMsg = createNoResultsMessage();
        }
        noResultsMsg.style.display = 'block';
    }
}

function createNoResultsMessage() {
    const msg = document.createElement('div');
    msg.id = 'no-results-message';
    msg.className = 'dropdown-message'; // Add a class for styling
    msg.innerHTML = `Nenhuma receita encontrada.
     <button class="close-btn" aria-label="Close">&times;</button>`;

    const searchBar = document.querySelector('.search-bar');
    
    // Remove any existing message before adding a new one
    const existingMsg = document.getElementById('no-results-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    // Insert the message after the search bar
    searchBar.parentNode.insertBefore(msg, searchBar.nextSibling);

    // Add event listener to the close button
    const closeButton = msg.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
        msg.remove(); // Remove the message when the button is clicked
    });

    return msg;
}

// Add event listener for "Enter" key
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        searchRecipe(event)
        // handleSearch();
    }
});



function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const searchBar = document.querySelector('.search-bar');
    navLinks.classList.toggle('burguerNav');
    searchBar.classList.toggle('search-barActive');
}
