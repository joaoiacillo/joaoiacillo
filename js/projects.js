const projectsElement = $("#projects ul");
const projectsAmount = parseInt(projectsElement.data("amount"));

const PROJECTS_IMGS_FOLDER = "imgs/projects/";

function createProjectElement(imgSrc, title, link) {
    const imgElement = $("<img>").attr("src", imgSrc);
    const titleElement = $("<h3>").text(title);
    const linkElement = $("<a>").attr("href", link).text("Acessar");

    const projectElement = $("<li>").append(
        imgElement,
        titleElement,
        linkElement
    );

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
    for (let i = 0; i < projectsAmount; i++) {
        const project = data[i];

        if (typeof project === "undefined") break;

        const { img, title, link } = project;

        const projectElement = createProjectElement(
            extendImageUrl(img),
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
