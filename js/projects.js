const projectsElement = $("#projects ul");
const projectsAmount = parseInt(projectsElement.data("amount"));

const PROJECTS_IMGS_FOLDER = "imgs/projects/";

function createProjectElement(imgSrc, type, title, link) {
    const imgElement = $("<img>").attr("src", imgSrc);
    const titleElement = $("<h3>").text(title);
    const typeElement = $("<span>").addClass("generic-text").text(type);
    const linkElement = $("<a>")
        .attr("href", link)
        .attr("target", "_blank")
        .text("Acessar");

    const projectElement = $("<li>")
        .attr("data-type", type.toLowerCase())
        .append(imgElement, titleElement, typeElement, linkElement);

    return projectElement;
}

function extendImageUrl(filename) {
    return PROJECTS_IMGS_FOLDER + filename;
}

const projectsJson = fetch("projects.json")
    .then((response) => response.json())
    .then((data) => handleProjectsJsonData(data))
    .catch((err) => handleProjectsJsonError(err));

function handleProjectsJsonData(data) {
    const amount = isNaN(projectsAmount) ? data.length : projectsAmount;

    for (let i = 0; i < amount; i++) {
        const project = data[i];

        if (typeof project === "undefined") break;

        const { img, title, type, link } = project;

        const projectElement = createProjectElement(
            extendImageUrl(img),
            type,
            title,
            link
        );

        projectsElement.append(projectElement);
    }
}

function handleProjectsJsonError(err) {
    console.error(err);

    const errMsg = $("<p>")
        .css({
            color: "red",
            textAlign: "center",
        })
        .text(
            "Something went wrong while loading the projects. Please check your browser console for more information."
        );

    $(projectsElement.parent()).append(errMsg);
}
