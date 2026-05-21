
const SOUND_URLS = {
  // Using more reliable CDN links for mechanical/interface sounds
  startup: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Glitch.wav",
  click: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Menu_Unselect.wav",
  vintage_click: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Click1.wav", 
  open: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Button1.wav",
  close: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Close1.wav",
  error: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Error.wav",
  notify: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Message1.wav",
  typing: "https://rpg.hamsterrepublic.com/ohrrpgce/sounds/Select1.wav",
};

class SoundService {
  private sounds: Record<string, HTMLAudioElement> = {};
  private isEnabled: boolean = true;
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      try {
        const audio = new Audio();
        audio.src = url;
        audio.preload = "auto";
        audio.crossOrigin = "anonymous";
        this.sounds[key] = audio;
      } catch (e) {
        console.error(`Failed to load sound: ${key}`, e);
      }
    });

    const unlock = () => {
      this.isUnlocked = true;
      // Force test play on unlock to ensure browser registers interaction
      this.play("click", 0.1); 
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);
  }

  play(soundName: keyof typeof SOUND_URLS, volume: number = 0.4) {
    if (!this.isEnabled || !this.sounds[soundName]) return;
    
    const sound = this.sounds[soundName];
    
    // Create a clone to allow rapid overlapping sounds (like fast typing)
    try {
      const playInstance = sound.cloneNode() as HTMLAudioElement;
      playInstance.volume = volume;
      playInstance.play().catch(e => {
        // Only log if it's not a standard interaction block
        if (e.name !== 'NotAllowedError') {
          console.warn(`Audio play failed for ${soundName}:`, e);
        }
      });
    } catch (e) {
      // Fallback to original if cloning fails
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }
  }

  stop(soundName: keyof typeof SOUND_URLS) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  get status() {
    return this.isEnabled;
  }
}

export const soundManager = new SoundService();
