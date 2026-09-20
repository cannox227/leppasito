const eventDate = new Date('2026-09-26T19:00:00+03:00');
const countdownUnits = [
    ['days', 24 * 60 * 60 * 1000],
    ['hours', 60 * 60 * 1000],
    ['minutes', 60 * 1000],
    ['seconds', 1000]
];

function updateCountdown() {
    const remaining = eventDate - new Date();

    if (remaining <= 0) {
        document.querySelector('.countdown').textContent = 'The fritto misto is happening now.';
        return;
    }

    let timeLeft = remaining;

    countdownUnits.forEach(([unit, milliseconds]) => {
        const value = Math.floor(timeLeft / milliseconds);
        document.getElementById(unit).textContent = String(value).padStart(2, '0');
        timeLeft %= milliseconds;
    });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const originalPartyCopy = document.querySelector('.party-copy').innerHTML;
const originalKicker = document.querySelector('.party-kicker').textContent;
const originalTitle = document.querySelector('.party-page h1').textContent;
const originalEventDate = document.querySelector('.event-date').textContent;

const languageTitles = {
    it: 'Poste Italiane Translation Department',
    fr: 'French Pronunciation Emergency',
    es: 'The Siesta Translation Bureau',
    fi: 'Ministry of Finnish Silence',
    hu: 'Paprika Translation Authority',
    de: 'Department of Unnecessary Organisation'
};

const languageJokes = {
    it: 'You clicked the Italian flag expecting a translation, but the translator is still queuing at Poste Italiane while the desk staff remain on an indefinite pausa caffè.',
    fr: 'You clicked the French flag expecting a translation, but three people tried to speak French, got upset about each other’s pronunciation, and the translator quietly left.',
    es: 'You clicked the Spanish flag expecting a translation, but the translator is taking a siesta until further notice, probably tomorrow.',
    fi: 'You clicked the Finnish flag expecting a translation, but the translator made eye contact, whispered “no”, and returned to the forest.',
    hu: 'You clicked the Hungarian flag expecting a translation, but the translator entered a paprika-induced fugue state and left only a note reading “more paprika”.',
    de: 'You clicked the German flag expecting a translation, but it is waiting for approval from the committee that regulates spontaneous sentences.'
};

function setLanguage(language) {
    const partyCopy = document.querySelector('.party-copy');
    const kicker = document.querySelector('.party-kicker');
    const title = document.querySelector('.party-page h1');
    const eventDateElement = document.querySelector('.event-date');
    const showPartyInformation = language === 'en';

    kicker.hidden = !showPartyInformation;
    title.hidden = false;
    eventDateElement.hidden = !showPartyInformation;

    if (showPartyInformation) {
        kicker.textContent = originalKicker;
        title.textContent = originalTitle;
        eventDateElement.textContent = originalEventDate;
        partyCopy.innerHTML = originalPartyCopy;
    } else {
        title.textContent = languageTitles[language];
        partyCopy.innerHTML = `<p class="closing">${languageJokes[language]}</p>`;
    }

    document.querySelectorAll('.language-buttons button').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
}

document.querySelectorAll('.language-buttons button').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
});
