// Wait for DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded successfully!");

    // DOM Elements
    const searchForm = document.querySelector('form.search-form');
    const searchInput = document.querySelector('form.search-form input[type="text"]');
    const moviesGrid = document.querySelector('.movies-grid');
    const toggleAdvancedBtn = document.querySelector('.toggle-advanced');
    const advancedSearch = document.querySelector('.advanced-search');

    // Sample Movie Data (replace with your complete data)
    const movies = [
        {
            id: 1,
            key: "inception",
            title: "Inception",
            year: 2010,
            rating: 8.8,
            poster: "imgs/inception.jpg",
            banner: "imgs/inception.jpg",
            duration: "148 min",
            genres: ["Action", "Adventure", "Sci-Fi"],
            director: "Christopher Nolan",
            description: "A thief who steals corporate secrets through dream-sharing technology.",
            cast: [
                { name: "Leonardo DiCaprio", role: "Cobb",photo: "imgs/Leonardo-DiCaprio.webp" },
                { name: "Joseph Gordon-Levitt", role: "Arthur" }
            ]
        },
        {
            id: 2,
            key: "shawshank",
            title: "The Shawshank Redemption",
            year: 1994,
            rating: 9.3,
            poster: "imgs/shawshank-redemption.webp",
            banner: "imgs/shawshank-redemption.webp",
            duration: "142 min",
            genres: ["Drama"],
            director: "Frank Darabont",
            description: "Two imprisoned men bond over several years.",
            cast: [
                { name: "Tim Robbins", role: "Andy Dufresne" },
                { name: "Morgan Freeman", role: "Ellis Boyd 'Red' Redding" }
            ]
        },
        // Add your other movies here in the same format
        {
            id: 3,
            key: "darkKnight",
            title: "The Dark Knight",
            year: 2008,
            rating: 9.0,
            poster: "imgs/dark-knight.jpeg", // Hyphen, no space
            // altPoster: "imgs/dark-knight-alt.jpeg",
            banner: "imgs/dark-knight.jpeg", // Separate banner image
            duration: "152 min",
            genres: ["Action", "Crime", "Drama"],
            director: "Christopher Nolan",
            description: "When the Joker wreaks havoc...",
            cast: [
              { 
                name: "Christian Bale", 
                role: "Bruce Wayne", 
                photo: "imgs/actors/bale.jpg" 
              }
            ]
          }
        
    ];
// Initialize the page with all movies
displayMovies(movies);
const movieCasts = {
    inception: [
      { name: "Leonardo DiCaprio", role: "Cobb", img: "imgs/Leonardo-DiCaprio.webp" },
      { name: "Joseph Gordon-Levitt", role: "Arthur", img: "imgs/Joseph-Gordon-Levitt.webp.png" },
      { name: "Elliot Page", role: "Ariadne", img: "imgs/Ellen-page.png" },
      { name: "Tom Hardy", role: "Eames", img: "imgs/Tom-Hardy.png" },
      { name: "Ken Watanabe", role: "Saito", img: "imgs/Ken-Watanabe.png" }
    ],
    shawshank: [
        { name: "Tim Robbins", role: "Andy Dufresne", img: "imgs/Tim-Robbins.png" },
        { name: "Morgan Freeman", role: "Ellis 'Red' Redding", img: "imgs/Morgan-Freeman.png" },
        { name: "Bob Gunton", role: "Warden Norton", img: "imgs/Bob-Gunton.png" },
        { name: "William Sadler", role: "Heywood", img: "imgs/William-Sadler.png" },
        { name: "Clancy Brown", role: "Captain Hadley", img: "imgs/Clancy-Brown.png" }
      ],
    darkKnight: [
        { name: "Christian Bale", role: "Bruce Wayne / Batman", img: "imgs/Christian-Bale.png" },
        { name: "Heath Ledger", role: "Joker", img: "imgs/Heath-Ledger.png" },
        { name: "Aaron Eckhart", role: "Harvey Dent", img: "imgs/Aaron-Eckhart.png" },
        { name: "Michael Caine", role: "Alfred Pennyworth", img: "imgs/Michael-Caine.png" },
        { name: "Gary Oldman", role: "James Gordon", img: "imgs/Gary-Oldman.png" },
        { name: "Maggie Gyllenhaal", role: "Rachel Dawes", img: "imgs/Maggie-Gyllenhaal.png" }
      ]
    

    // Add more movies here
  };
  
  function renderCast(movieKey) {
    const castList = document.getElementById("cast-list");
    castList.innerHTML = ""; // Clear previous cast
  
    movieCasts[movieKey].forEach(actor => {
      castList.innerHTML += `
        <div class="cast-item">
          <img src="${actor.img}" alt="${actor.name}" class="cast-photo">
          <div class="cast-name">${actor.name}</div>
          <div class="cast-role">${actor.role}</div>
        </div>
      `;
    });
  }
  
  // Example: load cast for 'inception'
//   renderCast("inception");
//   renderCast("shawshank");
//   renderCast("darkKnight");


    // Initialize the page with all movies
    displayMovies(movies);

    // Search Form Submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Search form submitted!");
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            displayMovies(movies);
            return;
        }

        const filteredMovies = movies.filter(function(movie) {
            return movie.title.toLowerCase().includes(searchTerm);
        });

        displayMovies(filteredMovies);
    });

    // Toggle Advanced Search
    toggleAdvancedBtn.addEventListener('click', function() {
        advancedSearch.classList.toggle('active');
    });

    // Display Movies Function
    function displayMovies(moviesToDisplay) {
        console.log("Displaying movies:", moviesToDisplay);
        
        moviesGrid.innerHTML = '';
        
        if (moviesToDisplay.length === 0) {
            moviesGrid.innerHTML = '<p class="no-results">No movies found. Try a different search.</p>';
            return;
        }

        moviesToDisplay.forEach(function(movie) {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.year}</span>
                        <span class="movie-rating">${movie.rating}</span>
                    </div>
                </div>
            `;
            movieCard.addEventListener('click', function() {
                openMovieDetails(movie.id);
            });
            moviesGrid.appendChild(movieCard);
        });
    }

    // Open Movie Details Modal
    function openMovieDetails(movieId) {
        const movie = movies.find(function(m) { return m.id === movieId; });
        if (!movie) return;

        const modal = document.getElementById('movie-details-modal');
        const banner = modal.querySelector('.movie-banner');
        const title = modal.querySelector('.movie-banner-title');
        
        // Set movie details
        banner.style.backgroundImage = `url(${movie.banner})`;
        title.textContent = movie.title;
        // poster.src = movie.poster;
        renderCast(movie.key);
        
        // Show the modal
        modal.classList.add('active');
    }

    // Close Modal Functionality
    document.querySelectorAll('.close-modal').forEach(function(button) {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Login/Signup Modal Toggles
    document.getElementById('login-btn').addEventListener('click', function() {
        document.getElementById('login-modal').classList.add('active');
    });

    document.getElementById('signup-btn').addEventListener('click', function() {
        document.getElementById('signup-modal').classList.add('active');
    });
});