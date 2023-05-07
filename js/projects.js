function createProjectElement(imgSrc, title, date) {
    const projectElement = document.createElement("li");
    const imgElement = document.createElement("img");
    const titleElement = document.createElement("h3");
    const dateElement = document.createElement("span");

    imgElement.src = imgSrc;

    titleElement.innerText = title;

    dateElement.classList.add("generic");
    dateElement.innerText = date;

    projectElement.append(imgElement, titleElement, dateElement);
    return projectElement;
}

const projectsElement = document.querySelector("#projects ul");
const projectsAmount = parseInt(projectsElement.dataset.amount);

function generateRandomProject() {
    // width and height must be randomized because of browser caching.
    // this way there will be some image randomness.
    const width = 1200 + Math.round(Math.random(80)) + 1;
    const height = 700 + Math.round(Math.random(20)) + 1;
    const url = `https://loremflickr.com/${width}/${height}/dog`;
    return createProjectElement(url, "Project Title", "01/01/2023");
}

for (let projectId = 0; projectId < projectsAmount; projectId++) {
    const projectElement = generateRandomProject();
    projectsElement.append(projectElement);
}
