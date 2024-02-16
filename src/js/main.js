(function () {
    const MAX_GH_DISPLAY = 3;
    const MAX_BLOG_DISPLAY = 6;

    document
        .querySelectorAll("[data-jshide=true]")
        .forEach((el) => el.remove());

    function descendSortBy(array, key) {
        return array.sort((a, b) => new Date(a[key]) + new Date(b[key]));
    }

    function RemoteList({
        listId,
        fetchURL,
        maxDisplayAmount,
        itemBuilder,
        sortKey,
        sortFunction = descendSortBy,
    }) {
        const list = document.getElementById(listId);

        function add(entity) {
            const item = itemBuilder(entity);
            list.append(item);
        }

        async function loadDOM() {
            const entities = await fetchData();
            if (entities.error === true) {
                error(entities);
                return;
            }
            entities.slice(0, maxDisplayAmount).forEach(add);
        }

        function error(response) {
            console.error(response);

            const error = document.createElement("strong");
            const code = document.createElement("kbd");

            code.innerText = response.statusCode;
            error.append(
                "Um erro de código ",
                code,
                " ocorreu e não foi possível completar a requisição."
            );

            list.append(error, "Verifique o console para mais informações.");
        }

        async function fetchData() {
            const response = await fetch(fetchURL);

            const json = await response.json();

            if (response.status !== 200) {
                return {
                    error: true,
                    statusCode: response.status,
                    body: json,
                };
            }

            return sortFunction(json, sortKey);
        }

        return {
            loadDOM,
        };
    }

    function GitHubRepoBuilder(repo) {
        const li = document.createElement("li");
        const name = document.createElement("strong");
        const link = document.createElement("a");
        let description = repo.description;

        name.innerText = repo.name;
        link.href = repo.html_url;
        link.target = "_blank";
        link.append(name);

        if (!description) {
            description = document.createElement("em");
            description.innerText = "Nenhuma descrição encontrada.";
        }

        li.append(link, ` (${repo.language}) – `, description);
        return li;
    }

    const GitHub = RemoteList({
        listId: "github-repos-list",
        // TODO: Change MOCK URL to https://api.github.com/users/joaoiacillo/repos
        fetchURL: "/src/mock/repos.json",
        maxDisplayAmount: MAX_GH_DISPLAY,
        itemBuilder: GitHubRepoBuilder,
        sortKey: "updated_at",
    });

    function BlogPostBuilder(post) {
        const li = document.createElement("li");
        const title = document.createElement("strong");
        const link = document.createElement("a");

        const blockquote = document.createElement("blockquote");
        const thumbnail = document.createElement("img");
        const published = document.createElement("em");

        thumbnail.src = post.cover_image;
        thumbnail.width = "300";
        published.innerText = `Publicado em: ${new Date(
            post.published_at
        ).toLocaleString()}`;
        blockquote.append(thumbnail, document.createElement("br"), published);

        title.innerText = post.title;
        link.href = post.url;
        link.target = "_blank";
        link.append(title);

        li.append(link, blockquote);
        return li;
    }

    const Blog = RemoteList({
        listId: "blog-list",
        // TODO: Change MOCK URL to https://dev.to/api/articles?username=joaoiacillo
        fetchURL: "/src/mock/posts.json",
        maxDisplayAmount: MAX_BLOG_DISPLAY,
        itemBuilder: BlogPostBuilder,
        sortKey: "published_at",
    });

    GitHub.loadDOM();
    Blog.loadDOM();
})();
