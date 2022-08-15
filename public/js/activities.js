//front end
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', (event) => {
    //TODO SANITIZE USER INPUT!
    const searchTerm = document.getElementById("search_term").value;
    event.preventDefault();
    location.href = '/search/'+ searchTerm;
});