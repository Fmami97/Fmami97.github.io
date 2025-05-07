export async function loadTranslations(lang) {
    const response = await fetch(`./locales/${lang}.json`);
    if (!response.ok) {
        console.error(`Could not load ${lang} translations.`);
        return {};
    }
    return await response.json();
}


function applyOthersData(other) {

    function createUlFromObject(obj) {
        const ul = document.createElement('ul');
        for (const key in obj) {
            const li = document.createElement('li');
            li.textContent = obj[key];
            ul.appendChild(li);
        }
        return ul;
    }

    function replaceListContent(ulContainerId, newContent) {
        let container = document.getElementById(ulContainerId);
        container.innerHTML = "";
        container.appendChild(newContent);
    }

    // Clear existing content, then replace it with the new translation
    replaceListContent("languagesList", createUlFromObject(other.languages));
    replaceListContent("traits-list", createUlFromObject(other.traits));
    replaceListContent("licenses-list", createUlFromObject(other.licenses));
    replaceListContent("hobbies-list", createUlFromObject(other.hobbies));
    replaceListContent("skills-list", createUlFromObject(other.skills));
    replaceListContent("nationalities-list", createUlFromObject(other.nationalities));

}



export function applyTranslations(translations) {

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        // Clear existing content, then replace it with the new translation
        el.innerHTML = "";
        // within the json file, a semicolon represents a new line
        let text = translations[key];
        if (text.includes(";")) {
            text.split(";").forEach((line) => {
                let p = document.createElement('p');
                p.textContent = line;
                el.appendChild(p);
            });
        }
        else {
            el.textContent = text;
        }

    });

    //sets specific elements that are not directly using data-i18n
    applyOthersData(translations["other"]);

    // set the document title if it exists in translations
    if (translations['title']) {
        document.title = translations['title'];
    }
}