const settingsStorage = {
  view: "main",
  currentCategoryId: undefined,
  mode: undefined,
  volume: 100,
  isEnded: false,
  isVolumeOn: false,
  time: localStorage.time || 10,
  isGameOnTime: localStorage.isGameOnTime || false,
  categoriesModeArtists: {
    0: {
      score: -1,
      isActive: false,
    },
    1: {
      score: -1,
      isActive: false,
    },
    2: {
      score: -1,
      isActive: false,
    },
    3: {
      score: -1,
      isActive: false,
    },
    4: {
      score: -1,
      isActive: false,
    },
    5: {
      score: -1,
      isActive: false,
    },
    6: {
      score: -1,
      isActive: false,
    },
    7: {
      score: -1,
      isActive: false,
    },
    8: {
      score: -1,
      isActive: false,
    },
    9: {
      score: -1,
      isActive: false,
    },
    10: {
      score: -1,
      isActive: false,
    },
    11: {
      score: -1,
      isActive: false,
    },
  },
  categoriesModePictures: {
    0: {
      score: -1,
      isActive: false,
    },
    1: {
      score: -1,
      isActive: false,
    },
    2: {
      score: -1,
      isActive: false,
    },
    3: {
      score: -1,
      isActive: false,
    },
    4: {
      score: -1,
      isActive: false,
    },
    5: {
      score: -1,
      isActive: false,
    },
    6: {
      score: -1,
      isActive: false,
    },
    7: {
      score: -1,
      isActive: false,
    },
    8: {
      score: -1,
      isActive: false,
    },
    9: {
      score: -1,
      isActive: false,
    },
    10: {
      score: -1,
      isActive: false,
    },
    11: {
      score: -1,
      isActive: false,
    },
  },
};
class Settings {
  constructor() {
    this.volumeRange = document.querySelector("[name=volume]");
    this.volumeToggle = document.querySelector("[name=volume-toggle]");
    this.timeRange = document.querySelector("[name=time]");
    this.timeToggle = document.querySelector("[name=time-toggle]");
    this.settings = settingsStorage;
    // console.log("Настройки: ", this.settings);
    document
      .querySelector("[name=volume-toggle]")
      .addEventListener("click", (e) => {
        this.muteVolume(e);
      });
    document.querySelector("[name=volume]").addEventListener("input", (e) => {
      this.changeVolume(e);
    });
    document
      .querySelector("[name=time-toggle]")
      .addEventListener("click", (e) => {
        this.toggleTimeMode(e);
      });
    document.querySelector("[name=time]").addEventListener("input", (e) => {
      this.changeTime(e);
    });
  }

  muteVolume(e) {
    settingsStorage.isVolumeOn = !settingsStorage.isVolumeOn;
    this.volumeRange.disabled = !this.volumeRange.disabled;
    this.volumeRange.value = settingsStorage.volume;
    console.log("Включен звук: ", settingsStorage.volume);
  }

  changeVolume(e) {
    const curVolume = parseInt(e.target.value);
    settingsStorage.volume = curVolume;
    if (curVolume == 0) {
      this.muteVolume();
      this.volumeToggle.checked = false;
    }
  }

  toggleTimeMode(e) {
    settingsStorage.isGameOnTime = !settingsStorage.isGameOnTime;
    this.timeRange.disabled = !this.timeRange.disabled;
    this.timeRange.value = settingsStorage.volume;
    console.log("Включен звук: ", settingsStorage.isGameOnTime);
  }

  changeTime(e) {
    console.log("Время: ", e.target.value);
    const curTime = parseInt(e.target.value);
    settingsStorage.time = curTime;
  }
}

export { settingsStorage, Settings };
