// For the comment section
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("commentForm");
    const commentInput = document.getElementById("comment");
    const commentsList = document.getElementById("commentsList");

    // Load comments from sessionStorage when the page is loaded
    const savedComments = sessionStorage.getItem("comments");
    if (savedComments) {
        const commentsArray = JSON.parse(savedComments);
        commentsArray.forEach((commentText) => {
            const commentDiv = document.createElement("div");
            commentDiv.className = "comment";
            commentDiv.textContent = commentText;
            commentsList.appendChild(commentDiv);
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        // Get the comment value
        const commentText = commentInput.value.trim();

        if (!commentText) {
            alert("Please enter a comment!");
            return;
        }

        // Simulate sending data to a server using fetch (AJAX)
        const response = await fakeServerRequest(commentText);

        if (response.success) {
            // Add the new comment to the comment list
            const commentDiv = document.createElement("div");
            commentDiv.className = "comment";
            commentDiv.textContent = commentText;

            commentsList.appendChild(commentDiv);
            commentInput.value = ""; // Clear the textarea

            // Save the comment to sessionStorage
            let commentsArray = [];
            const storedComments = sessionStorage.getItem("comments");
            if (storedComments) {
                commentsArray = JSON.parse(storedComments);
            }
            commentsArray.push(commentText);
            sessionStorage.setItem("comments", JSON.stringify(commentsArray));
        } else {
            alert("Failed to submit the comment. Try again.");
        }
    });

    // Simulate a server request
    async function fakeServerRequest(comment) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000); // Simulate 1 second server delay
        });
    }
});

// Morocco facts
const moroccoFacts = {
    "facts": [
        "Morocco is home to the world's largest desert, the Sahara Desert.",
        "The official languages of Morocco are Arabic and Berber.",
        "Morocco has a rich history of dynasties, including the Almoravid, Almohad, and Merinid dynasties.",
        "The Atlas Mountains run across Morocco from north to south.",
        "Morocco has a thriving arts and crafts culture, including traditional rug weaving and pottery.",
        "Marrakech, one of Morocco's most famous cities, is known for its ancient medina and vibrant souks.",
        "Morocco is famous for its cuisine, including tagine, couscous, and pastilla.",
        "The city of Fes is known for its ancient walled medina, which is a UNESCO World Heritage site."
    ]
};
function getRandomFact() {
    const facts = moroccoFacts.facts; // Get the facts from the JSON object
    const randomIndex = Math.floor(Math.random() * facts.length); // Generate a random index
    const randomFact = facts[randomIndex]; // Get the random fact
    document.getElementById("factText").textContent = randomFact; // Display the random fact
}
// Api 
// Fetching data about Morocco from the API
fetch('https://restcountries.com/v3.1/name/morocco?fields=name,capital,population,languages,flags,region,subregion')
    .then(response => response.json())
    .then(data => {
        const morocco = data[0]; 

        // Extract the data that i need
        const name = morocco.name.common;
        const capital = morocco.capital ? morocco.capital[0] : 'Not available';
        const population = morocco.population.toLocaleString(); 
        const languages = Object.values(morocco.languages).join(', ');
        const flag = morocco.flags.png;
        const region = morocco.region;
        const subregion = morocco.subregion;

        // Grabbing the container to inject data
        const moroccoInfoContainer = document.getElementById("morocco-info");

        // Creating HTML elements dynamically and injecting the data
        moroccoInfoContainer.innerHTML = `
            <img src="${flag}" alt="Flag of ${name}" />
            <h2>${name}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Subregion:</strong> ${subregion}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        const moroccoInfoContainer = document.getElementById("morocco-info");
        moroccoInfoContainer.innerHTML = `<p>Sorry, we couldn't load information about Morocco. Please try again later.</p>`;
    });
