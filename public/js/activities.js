//front end functionality for homepage
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', (event) => {
    const searchTerm = document.getElementById("search_term").value;
    event.preventDefault();
    location.href = '/search/' + searchTerm;
});
