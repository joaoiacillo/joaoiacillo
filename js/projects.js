function createProjectElement(imgSrc, title, date) {
    const imgElement = $("<img>").attr("src", imgSrc);
    const titleElement = $("<h3>").text(title);
    const dateElement = $("<span>").addClass("generic").text(date);

    const projectElement = $("<li>").append(
        imgElement,
        titleElement,
        dateElement
    );

    return projectElement;
}

const projectsElement = $("#projects ul");

const projectsAmount = parseInt(projectsElement.data("amount"));

const placeholderUrl = `https://placehold.co/1280x720`;

function generateRandomProject() {
    return createProjectElement(placeholderUrl, "Project Title", "01/01/2023");
}

for (let projectId = 0; projectId < projectsAmount; projectId++) {
    const projectElement = generateRandomProject();
    projectsElement.append(projectElement);
}

// const projectsJson = fetch("projects.json")
//     .then((response) => response.json())
//     .then((data) => handleProjectsJsonData(data))
//     .catch((err) => handleProjectsJsonError(err));

// function handleProjectsJsonData(data) {
//     $("#open").click(function () {
//         const id = this.dataset.id;
//         if (!(id in data)) {
//             return alert("Invalid id: " + id);
//         }

//         const project = data[id];

//         $("#project img").attr("src", project.img);
//         $("#project h3").text(project.title);
//         $("#project a").text(project.link).attr("href", project.link);
//     });
// }

// function handleProjectsJsonError(err) {
//     console.error(err);

//     const errMsg = $("<p>")
//         .css({
//             color: "red",
//             textAlign: "center",
//         })
//         .text(
//             "Something went wrong while loading the projects. Please check your browser console for more information."
//         );

//     $(projectsElement.parent()).append(errMsg);
// }
