document.addEventListener("DOMContentLoaded", () => {
    const localButton = document.getElementById("load-local");
    const remoteButton = document.getElementById("load-remote");
    const container = document.querySelector(".projects-container");

    // ensuring the container exists before adding event listeners
    if (localButton) localButton.addEventListener("click", () => loadProjects("local"));
    if (remoteButton) remoteButton.addEventListener("click", () => loadProjects("remote"));
});

// project data for local storage
const localProjects = [
    {
        title: "Project 1",
        image: "project1.png",
        alt: "Screenshot of a scratch program imitating a soccer game!",
        description: "A scratch program that uses arrow keys to play soccer and score goals.",
        link: "https://scratch.mit.edu/projects/973784653"
    },
    {
        title: "Project 2",
        image: "project2.png",
        alt: "Screenshot of a scratch program imitating an apple basket game!",
        description: "An apple basket game using arrow keys to catch the falling apples.",
        link: "https://scratch.mit.edu/projects/974513408"
    },
    {
        title: "Project 3",
        image: "project3.png",
        alt: "Screenshot of a scratch program imitating animal noises!",
        description: "An animal noise-making game by pressing on specific animals.",
        link: "https://scratch.mit.edu/projects/953847155"
    }
];

// storing local projects in localStorage if they aren't already stored
if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

//creating and returning a project-card element
function createProjectCard(projectData) {
    const projectCard = document.createElement("project-card");

    // Set attributes dynamically based on project data
    Object.entries(projectData).forEach(([key, value]) => {
        projectCard.setAttribute(key, value);
    });

    return projectCard;
}

// load projects dynamically based on (local or remote)
function loadProjects(source) {
    const container = document.querySelector(".projects-container");
    if (!container) {
        console.error("Error: .projects-container not found!");
        return;
    }

    container.innerHTML = ""; // clear existing projects

    if (source === "local") {
        console.log("Loading projects from localStorage...");
        const storedData = JSON.parse(localStorage.getItem("projects"));

        if (storedData && Array.isArray(storedData)) {
            storedData.forEach(project => {
                container.appendChild(createProjectCard(project));
            });
        } else {
            console.warn("No valid project data found in localStorage.");
        }
    } else if (source === "remote") {
        console.log("Fetching remote project data...");
        
        fetch("https://my-json-server.typicode.com/vesalcido/cse134bHW5/projects") 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Remote data received:", data);
                
                if (Array.isArray(data)) {
                    data.forEach(project => {
                        container.appendChild(createProjectCard(project));
                    });
                } else {
                    console.warn("Unexpected data format from remote server.");
                }
            })
            .catch(error => console.error("Error loading remote projects:", error));
    }
}
