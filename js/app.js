// IMPORTS --------------------------------------------------------------------
import { SOUNDBANK } from "./data.js";
import { getFilterStringForHexValue, getRandomIntegerBetween } from "./utils/utils.js";

// CONSTANTES -----------------------------------------------------------------
const AUDIOS = [
    {
        audio: new Audio(`./medias/audio/rain.mp3`), 
        id: 1
    },
    {
        audio: new Audio(`./medias/audio/wind.mp3`), 
        id: 2
    },
    {
        audio: new Audio(`./medias/audio/gyro.mp3`), 
        id: 3
    },
    {
        audio: new Audio(`./medias/audio/crickets.mp3`), 
        id: 4
    },
]

// MÉTHODES -------------------------------------------------------------------

const STORAGE = localStorage;
const appShortName = `sleepwave04`;

if (STORAGE.getItem(`${appShortName}FirstTime`) === null) {
    STORAGE.setItem(`${appShortName}FirstTime`, '0');
    let userTMP = {
        sounds: [
            {
                id: 1,
                vol: 0.5
            },
            {
                id: 2,
                vol: 0.5
            },
            {
                id: 3,
                vol: 0.5
            },
            {
                id: 4,
                vol: 0.5
            },
        ],
    };
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(userTMP));
}
/* ------------------------------------------------------------------------- */
const getUser = () => {
    return JSON.parse(STORAGE.getItem(`${appShortName}User`));
}
const setUser = (user) => {
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(user));
}

const onSliderInput = (soundId) => {
    let user = getUser();
    const slider = document.getElementById(`soundSlider${soundId}`);
    AUDIOS.forEach(sound => {
        if (sound.id == soundId) {
            sound.audio.volume = slider.value / 100;
            user.sounds.forEach(soundSetting => {
                if (soundSetting.id == sound.id) {
                    soundSetting.vol = sound.audio.volume;
                }
            });
        }
    });
    setUser(user);
}
window.onSliderInput = onSliderInput;

const getSoundTile = (sound) => {
    const user = getUser();
    let vol = 0;
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == sound.id) {
            vol = soundSetting.vol * 100;
        }
    });
    return `
        <div class="sound-tile">
            <div class="sound-tile-top-part">
                <span class="sound-name">${sound.name}</span>  
            </div>
            <div class="sound-tile-bottom-part">
                <div class="sound-icon-container">
                    <img class="sound-icon" src="./medias/images/sounds-icons/${sound.icon}.png" />
                </div>
                <div class="slider-area">
                    <img class="audio-volume-icon" src="./medias/images/font-awsome/volume-off-solid.svg" style="filter: ${getFilterStringForHexValue('#ffffff')};" />
                    <div class="slider-container">
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value="${vol}" 
                            class="sound-slider" 
                            id="soundSlider${sound.id}" 
                            oninput="onSliderInput(${sound.id})"
                        >
                    </div>
                    <img class="audio-volume-icon" src="./medias/images/font-awsome/volume-high-solid.svg" style="filter: ${getFilterStringForHexValue('#ffffff')};" />
                </div>
                <!-- <div class="lock-icon-container--open">
                    <img class="lock-icon" src="./medias/images/font-awsome/lock-open-solid.svg" />
                </div> -->
            </div>
        </div>
    `;
}

const getSoundsTiles = () => {
    let innerHTML = '';
    SOUNDBANK.forEach(sound => {
        innerHTML += getSoundTile(sound);
    });
    return innerHTML;
}

// Execution ------------------------------------------------------------------

const setDocumentHeight = () => {
    document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', setDocumentHeight);
setDocumentHeight();

const main = document.getElementById('main');
main.innerHTML = `<div class="app-title-container"><img class="app-title-icon" src="./medias/images/logo.png" /></div> ${getSoundsTiles()}`;

AUDIOS.forEach(sound => {
    const user = getUser();
    let vol = 0;
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == sound.id) {
            vol = soundSetting.vol;
        }
    });
    sound.audio.volume = vol;
    sound.audio.loop = true;
    sound.audio.currentTime = getRandomIntegerBetween(10, 1000);
    sound.audio.play();
});