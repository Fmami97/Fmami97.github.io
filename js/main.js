import { loadTranslations, applyTranslations } from './translations.js';


async function setLanguage(lang) {
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
    document.getElementById('lang-en').classList.toggle('selectedLanguage', lang === 'en');
    document.getElementById('lang-fr').classList.toggle('selectedLanguage', lang === 'fr');
    document.getElementById('lang-it').classList.toggle('selectedLanguage', lang === 'it');
}


//function to reset the text of the icons AND the article selectors
function resetText(selectedId, list) {
    list.forEach(item => {
        let currentId = item.getAttribute('data-text');
        if (currentId == selectedId) {
            item.classList.add("active");
            document.getElementById(selectedId).style.display = 'block';
        }
        else {
            document.getElementById(currentId).style.display = 'none';
            item.classList.remove("active");
        }
    });
}


function togglePicture(e) {
    let imgSrc = e.target.src;
    if (imgSrc.includes("2024.jpg")) {
        e.target.src = "resources/profile/profile_2023.png";
    } else if (imgSrc.includes("2023.png")) {
        e.target.src = "resources/profile/profile_2024.jpg";
    }
}


const icons = document.querySelectorAll('.icon');
// Set the default selected icon and article
let selectedIcon = icons[0].getAttribute('data-text');

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        const id = icon.getAttribute('data-text');
        // Check if the clicked icon is different from the currently selected one
        if (selectedIcon != id) {
            resetText(id, icons);
            selectedIcon = id;
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const buttons = document.querySelectorAll('.btn-colors');
let selectedButton = buttons[0].id;
buttons.forEach(button => {

    //sets the active colors of the website when clicking on the button
    button.addEventListener('click', (e) => {
        if (selectedButton != e.target.id) {
            document.getElementById(selectedButton).classList.remove("active");
            document.getElementById(e.target.id).classList.add("active");
            selectedButton = e.target.id;
            const computedStyle = getComputedStyle(e.target);
            const primary = computedStyle.backgroundColor;
            const secondary = computedStyle.borderColor;
            const highlight = computedStyle.color;

            document.documentElement.style.setProperty('--primary-color', primary);
            document.documentElement.style.setProperty('--secondary-color', secondary);
            document.documentElement.style.setProperty('--highlighted-color', highlight);
        }
    });
    //adds a preview of the new color of the website when hovering over the button
    button.addEventListener('mouseover', (e) => {
        if (selectedButton != e.target.id) {
            const computedStyle = getComputedStyle(e.target);
            const primary = computedStyle.backgroundColor;
            const secondary = computedStyle.borderColor;
            const highlight = computedStyle.color;
            document.documentElement.style.setProperty('--primary-color', primary);
            document.documentElement.style.setProperty('--secondary-color', secondary);
            document.documentElement.style.setProperty('--highlight-color', highlight);
        }
    });
    //restores to the selected button color when mouseout
    button.addEventListener('mouseout', (e) => {
        if (selectedButton != e.target.id) {
            const computedStyle = getComputedStyle(document.getElementById(selectedButton));
            const primary = computedStyle.backgroundColor;
            const secondary = computedStyle.borderColor;
            const highlight = computedStyle.color;

            document.documentElement.style.setProperty('--primary-color', primary);
            document.documentElement.style.setProperty('--secondary-color', secondary);
            document.documentElement.style.setProperty('--highlight-color', highlight);
        }
    });

}
)


//set the default selected icon and article
resetText(selectedIcon, icons);

// default language is french
setLanguage("fr");
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-fr').addEventListener('click', () => setLanguage('fr'));
document.getElementById('lang-it').addEventListener('click', () => setLanguage('it'));
document.getElementById('main-image').addEventListener('click', (e) => togglePicture(e));
