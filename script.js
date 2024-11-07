// Updated script.js to handle translations using embedded JSON data for improved compatibility without CORS issues.

// Embedded translations data
const translationsData = {
    "en": {
        "courses_title": "Courses",
        "courses_subtitle": "Step-by-step paths to mastery",
        "nav_links_courses": "Courses",
        "nav_links_aufgaben": "Tasks",
        "organic_chemistry_title": "Organic Chemistry",
        "organic_chemistry_description": "Master problem-solving essentials in organic chemistry",
        "continue_button": "Continue",
        "level_1": "Level 1",
        "level_1_description": "Introduction to Organic Chemistry",
        "level_2": "Level 2",
        "level_2_description": "Hydrocarbons",
        "level_3": "Level 3",
        "level_3_description": "Functional Groups",
        "level_4": "Level 4",
        "level_4_description": "Isomerism",
        "level_5": "Level 5",
        "level_5_description": "Intermolecular Forces"
    },
    "de": {
        "courses_title": "Kurse",
        "courses_subtitle": "Schritt-für-Schritt Pfade zur Meisterschaft",
        "nav_links_courses": "Kurse",
        "nav_links_aufgaben": "Aufgaben",
        "organic_chemistry_title": "Organische Chemie",
        "organic_chemistry_description": "Meistere die essenziellen Problemlösungsfähigkeiten in der organischen Chemie",
        "continue_button": "Fortsetzen",
        "level_1": "Level 1",
        "level_1_description": "Einführung in die Organische Chemie",
        "level_2": "Level 2",
        "level_2_description": "Kohlenwasserstoffe",
        "level_3": "Level 3",
        "level_3_description": "Funktionelle Gruppen",
        "level_4": "Level 4",
        "level_4_description": "Isomerie",
        "level_5": "Level 5",
        "level_5_description": "Zwischenmolekulare Kräfte"
    }
};

// Load and set language from embedded JSON data
function setLanguage(lang) {
    try {
        if (translationsData[lang]) {
            updateContent(translationsData[lang]);
        }
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Update the page content based on the selected language
function updateContent(translations) {
    document.getElementById('courses-title').textContent = translations['courses_title'];
    document.getElementById('courses-subtitle').textContent = translations['courses_subtitle'];
    document.getElementById('nav-links-courses').innerHTML = `<i class="fas fa-book"></i> ${translations['nav_links_courses']}`;
    document.getElementById('nav-links-aufgaben').innerHTML = `<i class="fas fa-tasks"></i> ${translations['nav_links_aufgaben']}`;

    // Update course cards
    document.getElementById('organic-chemistry-title').textContent = translations['organic_chemistry_title'];
    document.getElementById('organic-chemistry-description').textContent = translations['organic_chemistry_description'];
    document.getElementById('continue-button').textContent = translations['continue_button'];

    // Update levels
    document.getElementById('level-1').textContent = translations['level_1'];
    document.getElementById('level-1-description').textContent = translations['level_1_description'];
    document.getElementById('level-2').textContent = translations['level_2'];
    document.getElementById('level-2-description').textContent = translations['level_2_description'];
    document.getElementById('level-3').textContent = translations['level_3'];
    document.getElementById('level-3-description').textContent = translations['level_3_description'];
    document.getElementById('level-4').textContent = translations['level_4'];
    document.getElementById('level-4-description').textContent = translations['level_4_description'];
    document.getElementById('level-5').textContent = translations['level_5'];
    document.getElementById('level-5-description').textContent = translations['level_5_description'];
}

// Handle language dropdown change
document.addEventListener('DOMContentLoaded', function() {
    const languageDropdown = document.getElementById('language-dropdown');
    
    // Sprache aus Local Storage laden
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        languageDropdown.value = savedLanguage;
        setLanguage(savedLanguage);
    } else {
        setLanguage('en'); // Standardsprache, falls nichts gespeichert ist
    }

    // Ereignis-Listener für Sprachänderung
    languageDropdown.addEventListener('change', function() {
        const selectedLanguage = languageDropdown.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        setLanguage(selectedLanguage);
    });
});

// Navigation to Sub-Topics
function navigateToSubtopic(subTopic) {
    // Hide all sections and show only the selected sub-topic content
    const allSections = document.querySelectorAll('.sub-topic');
    allSections.forEach(section => section.style.display = 'none');

    document.getElementById(subTopic + '-content').style.display = 'block';
}

// Quiz Answer Check
document.querySelectorAll('.answer-button').forEach(button => {
    button.addEventListener('click', () => {
        // Reset all button states
        document.querySelectorAll('.answer-button').forEach(btn => {
            btn.style.border = '2px solid #555';
            btn.classList.remove('correct', 'incorrect');
        });

        // Check if the selected button is correct
        if (button.textContent.includes('C<sub>n</sub>H<sub>2n+2</sub>')) {
            button.classList.add('correct');
            button.style.border = '2px solid #39b54a';
            document.querySelector('.feedback').classList.remove('incorrect');
            document.querySelector('.feedback').classList.add('correct');
            document.querySelector('.feedback').textContent = 'Correct! Well done.';
        } else {
            button.classList.add('incorrect');
            button.style.border = '2px solid #ff4d4f';
            document.querySelector('.feedback').classList.remove('correct');
            document.querySelector('.feedback').classList.add('incorrect');
            document.querySelector('.feedback').textContent = 'Incorrect. Try again or click "Why?" for more information.';
        }

        document.querySelector('.feedback').style.display = 'block';
    });
});

document.querySelector('.why-button').addEventListener('click', () => {
    document.querySelector('.why-popup').style.display = 'block';
});

document.querySelector('.close-why').addEventListener('click', () => {
    document.querySelector('.why-popup').style.display = 'none';
});
