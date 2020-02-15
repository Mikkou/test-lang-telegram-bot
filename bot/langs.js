export const langs = ['ru', 'en']

export const getLang = lang => langs.includes(lang) ? lang : 'en'

export const words = {
  en: {
    menu: {
      en: 'English',
      jp: 'Japanese',
      title: {
        firstLevel: 'Select a language to learn:',
        secondLevel: 'Select a topic:',
        thirstLevel: 'Select difficulty level:',
      }
    },
    topics: {
      words: 'Words',
      katakana: 'Katakana',
      hiragana: 'Hiragana'
    },
    levels: {
      easy: 'Easy'
    },
    welcomeBack: 'Welcome back! Open /menu',
    welcome: 'Welcome! Open /menu'
  },
  ru: {
    menu: {
      en: 'Английский',
      jp: 'Японский',
      title: {
        firstLevel: 'Выберите язык для изучения:',
        secondLevel: 'Выберите тему:',
        thirstLevel: 'Выберите уровень сложности:',
      }
    },
    topics: {
      words: 'Слова',
      katakana: 'Катакана',
      hiragana: 'Хирагана'
    },
    levels: {
      easy: 'Лёгкий'
    },
    welcomeBack: 'С возвращением! Откройте /menu',
    welcome: 'Добро пожаловать! Откройте /menu'
  }
}
