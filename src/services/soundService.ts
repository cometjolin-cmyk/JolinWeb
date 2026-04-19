
const SOUND_URLS = {
  startup: "https://actions.google.com/sounds/v1/science_fiction/glitchy_digital_interface.ogg",
  click: "https://actions.google.com/sounds/v1/ui/click_on_pushed_button.ogg", // Refined later
  vintage_click: "https://actions.google.com/sounds/v1/office/typing_mechanical.ogg", // Will be played shortly
  open: "https://actions.google.com/sounds/v1/ui/pop_up_selection.ogg",
  close: "https://actions.google.com/sounds/v1/ui/select_standard.ogg",
  error: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
  notify: "https://actions.google.com/sounds/v1/ui/notification_glitch.ogg",
  typing: "https://actions.google.com/sounds/v1/office/keyboard_typing_fast.ogg",
};

class SoundService {
  private sounds: Record<string, HTMLAudioElement> = {};
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      Object.entries(SOUND_URLS).forEach(([key, url]) => {
        this.sounds[key] = new Audio(url);
        this.sounds[key].load();
      });
      
      // Fine-tune the vintage click (mechanical keyboard sound)
      // Since typing_mechanical is long, we can use it but stop it early
      // or just use a sharper hit.
    }
  }

  play(soundName: keyof typeof SOUND_URLS, volume: number = 0.5) {
    if (!this.isEnabled || !this.sounds[soundName]) return;
    
    const sound = this.sounds[soundName];
    sound.volume = volume;
    
    if (soundName === 'vintage_click' || soundName === 'click') {
      // For old computer feel, we want a very short sharp sound
      sound.currentTime = 0;
      sound.play().catch(e => console.warn("Audio play blocked:", e));
      // Auto-stop long sounds for key press feel
      if (soundName === 'vintage_click') {
        setTimeout(() => {
          if (!sound.paused) sound.pause();
        }, 100); 
      }
    } else {
      sound.currentTime = 0;
      sound.play().catch(e => console.warn("Audio play blocked:", e));
    }
  }

  stop(soundName: keyof typeof SOUND_URLS) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    }
  }

  toggle(enabled: boolean) {
    this.isEnabled = enabled;
  }
}

export const soundManager = new SoundService();
