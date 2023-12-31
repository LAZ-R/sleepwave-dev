// IMPORTS --------------------------------------------------------------------
import { getFilterStringForHexValue, getRandomIntegerBetween } from "./utils/utils.js";

// CONSTANTES -----------------------------------------------------------------
const AUDIOS = [
    {
        id: 1,
        name: "Rain",
        audio: new Audio(`./medias/audio/rain.mp3`),
    },
    {
        id: 2,
        name: "Wind",
        audio: new Audio(`./medias/audio/wind.mp3`),
    },
    {
        id: 3,
        name: "Police",
        audio: new Audio(`./medias/audio/gyro.mp3`),
    },
    {
        id: 4,
        name: "Crickets",
        audio: new Audio(`./medias/audio/crickets.mp3`),
    },
    {
        id: 5,
        name: "Ships",
        audio: new Audio(`./medias/audio/spaceships.mp3`),
    },
    {
        id: 6,
        name: "City speaker",
        audio: new Audio(`./medias/audio/japan.mp3`),
    },
    {
        id: 7,
        name: "Neon",
        audio: new Audio(`./medias/audio/neon.mp3`),
    },
    {
        id: 8,
        name: "City life",
        audio: new Audio(`./medias/audio/people.mp3`),
    }, 
]  

// MÉTHODES -------------------------------------------------------------------

const STORAGE = localStorage;
const appShortName = `sleepwave06`;

if (STORAGE.getItem(`${appShortName}FirstTime`) === null) {
    STORAGE.setItem(`${appShortName}FirstTime`, '0');
    let userTMP = {
        sounds: [
            {
                id: 1,
                vol: 0.5,
                muted: false,
                locked: false,
            },
            {
                id: 2,
                vol: 0.5,
                muted: false,
                locked: false,
            },
            {
                id: 3,
                vol: 0.5,
                muted: false,
                locked: false,
            },
            {
                id: 4,
                vol: 0.5,
                muted: false,
                locked: false,
            },
            {
                id: 5,
                vol: 0.5, 
                muted: false,
                locked: false,
            },
            {
                id: 6,
                vol: 0.5,
                muted: false,
                locked: false,
            },  
            {
                id: 7,
                vol: 0.5,
                muted: false,
                locked: false,
            },
            {
                id: 8,
                vol: 0.5,
                muted: false,
                locked: false,
            },
        ],  
    };
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(userTMP));
}
// STORAGE ---------------------------------------------------------------------

const getUser = () => {
    return JSON.parse(STORAGE.getItem(`${appShortName}User`));
}
const setUser = (user) => {
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(user));
}

// USER INTERACTIONS -----------------------------------------------------------

const onMuteClick = (soundId) => {
    let user = getUser();
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == soundId) {
            const muteArea = document.getElementById(`muteArea${soundId}`);
            const slider = document.getElementById(`soundSlider${soundId}`);
            let muted = soundSetting.muted;
            if (muted) {
                muteArea.classList.replace('muted', 'unmuted');
                slider.classList.replace('muted-slider', 'unmuted-slider');
                AUDIOS.forEach(sound => {
                    if (sound.id == soundId) {
                        sound.audio.play();
                    }
                });
            } else {
                muteArea.classList.replace('unmuted', 'muted');
                slider.classList.replace('unmuted-slider', 'muted-slider');
                AUDIOS.forEach(sound => {
                    if (sound.id == soundId) {
                        sound.audio.pause();
                    }
                });
            }
            muted = !muted;
            muteArea.innerHTML = `${getMuteIcon(muted)}`;
            soundSetting.muted = !soundSetting.muted;
        }
    });
    setUser(user);
}
window.onMuteClick = onMuteClick;

const onLockClick = (soundId) => {
    let user = getUser();
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == soundId) {
            const muteArea = document.getElementById(`muteArea${soundId}`);
            const slider = document.getElementById(`soundSlider${soundId}`);
            const lockArea = document.getElementById(`lockArea${soundId}`);
            let locked = soundSetting.locked;
            if (locked) {
                muteArea.removeAttribute('disabled');
                muteArea.classList.replace('locked-mute', 'unlocked-mute');
                slider.removeAttribute('disabled');
                slider.classList.replace('locked-slider', 'unlocked-slider');
                lockArea.classList.replace('locked', 'unlocked');
            } else {
                muteArea.setAttribute('disabled', true);
                muteArea.classList.replace('unlocked-mute', 'locked-mute');
                slider.setAttribute('disabled', true);
                slider.classList.replace('unlocked-slider', 'locked-slider');
                lockArea.classList.replace('unlocked', 'locked');
            }
            locked = !locked;
            lockArea.innerHTML = `${getLockIcon(locked)}`;
            soundSetting.locked = !soundSetting.locked;
        }
    });
    setUser(user);
}
window.onLockClick = onLockClick;

const onSliderInput = (soundId) => {
    let user = getUser();
    const slider = document.getElementById(`soundSlider${soundId}`);
    const vol = slider.value;
    const soundVol = document.getElementById(`soundVol${soundId}`);
    AUDIOS.forEach(sound => {
        if (sound.id == soundId) {
            sound.audio.volume = vol / 100;
            soundVol.innerHTML = `${Math.round(vol)}%`;
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

// DOM GENERATION --------------------------------------------------------------

const getMuteIcon = (muted) => {
    return `
        <img 
            class="mute-icon" 
            src="./medias/images/font-awsome/ban-solid.svg" 
            style="filter: ${getFilterStringForHexValue('#ffffff')}; opacity: ${muted ? 1 : .25}"
        />`;
    }

const getMuteArea = (soundId) => {
    const user = getUser();
    let muted = false;
    let locked = false;
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == soundId) {
            muted = soundSetting.muted;
            locked = soundSetting.locked;
        }
    });
    return `
        <button id="muteArea${soundId}" class="mute-icon-container ${muted ? 'muted' : 'unmuted'} ${locked ? 'locked-mute' : 'unlocked-mute'}" ${locked ? 'disabled' : ''} onclick="onMuteClick(${soundId})">
            ${getMuteIcon(muted)}
        </button>`;
}

const getLockIcon = (locked) => {
    return `
        <img 
            class="lock-icon" 
            src="./medias/images/font-awsome/lock-solid.svg" 
            style="filter: ${getFilterStringForHexValue(locked ? '#f29746' : '#ffffff')}; opacity: ${locked ? 1 : .25}"
        />`;
    }

const getLockArea = (soundId) => {
    const user = getUser();
    let locked = false;
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == soundId) {
            locked = soundSetting.locked;
        }
    });
    return `
        <div id="lockArea${soundId}" class="lock-icon-container ${locked ? 'locked' : 'unlocked'}" onclick="onLockClick(${soundId})">
            ${getLockIcon(locked)}
        </div>`;
}

const getSoundTile = (sound) => {
    const user = getUser();
    let vol = 0;
    let locked = false;
    let muted = false;
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == sound.id) {
            vol = soundSetting.vol * 100;
            locked = soundSetting.locked;
            muted = soundSetting.muted;
        }
    });
    return `
        <div class="sound-tile">
            <div class="sound-tile-top-part">
                <span class="sound-name">${sound.name}</span>
                <span class="sound-volume" id="soundVol${sound.id}">${Math.round(vol)}%</span>  
            </div>
            <div class="sound-tile-bottom-part">
                ${getMuteArea(sound.id)}
                <div class="slider-area">
                    <img 
                        class="audio-volume-icon" 
                        src="./medias/images/font-awsome/volume-off-solid.svg" 
                        style="filter: ${getFilterStringForHexValue('#ffffff')};"
                    />
                    <div class="slider-container">
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value="${vol}" 
                            class="sound-slider ${locked ? 'locked-slider' : 'unlocked-slider'} ${muted ? 'muted-slider' : 'unmuted-slider'}" 
                            id="soundSlider${sound.id}" 
                            oninput="onSliderInput(${sound.id})"
                            ${locked ? 'disabled' : ''}
                        >
                    </div>
                    <img 
                        class="audio-volume-icon" 
                        src="./medias/images/font-awsome/volume-high-solid.svg" 
                        style="filter: ${getFilterStringForHexValue('#ffffff')};"
                    />
                </div>
                ${getLockArea(sound.id)}
            </div>
        </div>
    `;
}

const getSoundsTiles = () => {
    let innerHTML = '';
    AUDIOS.forEach(sound => {
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
main.innerHTML = `
    <div class="app-title-container">
        <img class="app-title-icon" src="./medias/images/logo.png" />
    </div>
    ${getSoundsTiles()}
`;

AUDIOS.forEach(sound => {
    const user = getUser();
    let vol = 0;
    let muted = false;
    user.sounds.forEach(soundSetting => {
        if (soundSetting.id == sound.id) {
            vol = soundSetting.vol;
            muted = soundSetting.muted;
        } 
    });
    sound.audio.volume = vol;
    sound.audio.loop = true;
    sound.audio.currentTime = getRandomIntegerBetween(10, 240);
    sound.audio.addEventListener("canplaythrough", (event) => {
        //console.log(sound.name);
        if (!muted) {
            //sound.audio.currentTime = 10; // BUG DE OUF JSP PK
            sound.audio.play();
        }
    });
});  