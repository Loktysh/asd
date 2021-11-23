import { settingsStorage } from "./settings";

const TOTAL_CATEGORIES = 12;
const TOTAL_CARDS = 12;
const TOTAL_QUESTIONS = 10;
const TOTAL_ANSWERS = 4;
const getRandomNum = (min, max, len) => {
  const arr = [];
  while (arr.length < len) {
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!arr.includes(randNum)) {
      arr.push(randNum);
    }
  }
  return arr;
};
const getCategoriesCards = async (mode) => {
  const firstCardIndex = settingsStorage.mode === "artists" ? 0 : 12;
  try {
    const response = await fetch("./assets/images.json");
    const json = await response.json();
    const res = [];
    const modeStats =
      mode === "artists"
        ? settingsStorage.categoriesModeArtists
        : settingsStorage.categoriesModePictures;
    for (let i = 0; i < TOTAL_CARDS; i += 1) {
      //   const { name, author, year, imageNum } = json[i];
      const card = `
      <button class="card 
      ${modeStats[i].score === -1 ? "card-inactive" : "card-active"}" data-category="${i}">
        <div class="card-header">
            <p class="name">${i} Category</p>
            <p class="score">${modeStats[i].score === -1 ? "" : '⭐' + modeStats[i].score}</p>
        </div>
        <img src="./assets/img/${i + firstCardIndex}.webp" alt="">
      </button>\n`;
    
      res.push(card);
    }
    return res.join("");
  } catch (e) {
    console.log("Load json error", e);
  }
};
const getPictureCard = async (id) => {
  try {
    const response = await fetch("./assets/images.json");
    const json = await response.json();
    const { name, author, year, imageNum } = json[id];
    const card = {
      src: `./assets/img/${imageNum}.webp`,
      text: `${author} ${name} (${year})`,
    };
    return card;
  } catch (e) {
    console.log("Load json error", e);
  }
};

const getQuestions = async (mode, category) => {
  const firstIndex = category * 10;
  const lastIndex = firstIndex + 9;
  try {
    const response = await fetch("./assets/images.json");
    const json = await response.json();

    const res = [];
    const createAnswersArray = (author) => {
      const res = json
        .slice(firstIndex, lastIndex)
        .map((e) => e.author)
        .sort(() => 0.5 - Math.random())
        .filter((e) => e !== author)
        .slice(0, TOTAL_ANSWERS - 1);
      res.push(author);
      return res.sort(() => 0.5 - Math.random());
    };
    const createAnswersArrayById = (id) => {
        const res = json
          .slice(firstIndex, lastIndex)
          .map((e) => e.imageNum)
          .sort(() => 0.5 - Math.random())
          .filter((e) => e != id)
          .slice(0, TOTAL_ANSWERS - 1);
        res.push(`${id}`);
        return res.sort(() => 0.5 - Math.random());
      };

    for (let i = firstIndex; i <= lastIndex; i += 1) {
      const { name, author, year, imageNum } = json[i];
      if (mode === "artists") {
        const question = {
          questionId: i,
          question: "Who the author of this picture?",
          answersArr: createAnswersArray(author),
          correctAnswer: author,
          imageId: i,
        };
        res.push(question);
      }
      if (mode === "pictures") {
        const question = {
          questionId: i,
          question: `What picture was ${author} written?`,
          answersArr: createAnswersArrayById(i + firstIndex),
          correctAnswer: i + firstIndex,
          imageId: imageNum,
        };
        res.push(question);
      }
    }
    return res;
  } catch (e) {
    console.log("Load json error", e);
  }
};
export { getCategoriesCards, getQuestions, getPictureCard };
