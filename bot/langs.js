export const LANGS = {
  ru: 'Русский',
  en: 'English',
  jp: '日本語'
}

export const getLang = lang => Object.keys(LANGS).includes(lang) ? lang : 'en'

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
    }
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
    }
  },
  jp: {
    menu: {
      en: '英語',
      jp: '日本語',
      title: {
        firstLevel: '学習する言語を選択してください：',
        secondLevel: 'トピックを選択してください:',
        thirstLevel: '難易度を選択してください:',
      }
    },
    topics: {
      words: '言葉',
      katakana: 'カタカナ',
      hiragana: 'ひらがな'
    },
    levels: {
      easy: 'かんたん'
    }
  }
}
