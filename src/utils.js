import {
  AudioConfig,
  SpeechConfig,
  SpeechTranslationConfig,
  SpeechRecognizer,
  TranslationRecognizer
} from "microsoft-cognitiveservices-speech-sdk";

export function createRecognizer(token, region, language, recognizing, recognized) {
  const audoConfig = AudioConfig.fromDefaultMicrophoneInput();
  const speechConfig = SpeechConfig.fromSubscription(token, region);
  speechConfig.speechRecognitionLanguage = language;
  
  const recognizer = new SpeechRecognizer(speechConfig, audoConfig);

  recognizer.sessionStarted = (s, e) => {
    console.log("Session started");
  };

  recognizer.sessionStopped = (s, e) => {
    console.log("Session stopped");
  };

  recognizer.speechEndDetected = (s, e) => {
    console.log("End of speech");
  };

  recognizer.canceled = (s, e) => {
    console.log("Canceled.", e);
  }

  recognizer.recognizing = (s, e) => {
    recognizing(e.result.text);
  }

  recognizer.recognized = (s, e) => {
    recognized(e.result.text);
  }

  return recognizer;
}

export function createTranslator(token, region, fromLanguage, toLanguage, recognizing, recognized) {
  const audoConfig = AudioConfig.fromDefaultMicrophoneInput();
  const speechConfig = SpeechTranslationConfig.fromSubscription(token, region);
  speechConfig.speechRecognitionLanguage = fromLanguage;
  speechConfig.addTargetLanguage(toLanguage);

  const recognizer = new TranslationRecognizer(speechConfig, audoConfig);

  recognizer.sessionStarted = (s, e) => {
    console.log("Session started");
  };

  recognizer.sessionStopped = (s, e) => {
    console.log("Session stopped");
  };

  recognizer.speechEndDetected = (s, e) => {
    console.log("End of speech");
  };

  recognizer.canceled = (s, e) => {
    console.log("Canceled.", e);
  }

  recognizer.recognizing = (s, e) => {
    recognizing(e.result.text, e.result.translations.get(toLanguage));
  }

  recognizer.recognized = (s, e) => {
    recognized(e.result.text, e.result.translations.get(toLanguage));
  }

  return recognizer;
}

export function noop() {}


export const availableFromLanguages = [
  { key: "ar-EG", value: "Arabic (Egypt), modern standard" },
  { key: "ar-SA", value: "Arabic (Saudi Arabia)" },
  { key: "ar-AE", value: "Arabic (UAE)" },
  { key: "ar-KW", value: "Arabic (Kuwait)" },
  { key: "ar-QA", value: "Arabic (Qatar)" },
  { key: "ca-ES", value: "Catalan" },
  { key: "da-DK", value: "Danish (Denmark)" },
  { key: "de-DE", value: "German (Germany)" },
  { key: "en-AU", value: "English (Australia)" },
  { key: "en-CA", value: "English (Canada)" },
  { key: "en-GB", value: "English (United Kingdom)" },
  { key: "en-IN", value: "English (India)" },
  { key: "en-NZ", value: "English (New Zealand)" },
  { key: "en-US", value: "English (United States)" },
  { key: "es-ES", value: "Spanish (Spain)" },
  { key: "es-MX", value: "Spanish (Mexico)" },
  { key: "fi-FI", value: "Finnish (Finland)" },
  { key: "fr-CA", value: "French (Canada)" },
  { key: "fr-FR", value: "French (France)" },
  { key: "gu-IN", value: "Gujarati (Indian)" },
  { key: "hi-IN", value: "Hindi (India)" },
  { key: "it-IT", value: "Italian (Italy)" },
  { key: "ja-JP", value: "Japanese (Japan)" },
  { key: "ko-KR", value: "Korean (Korea)" },
  { key: "mr-IN", value: "Marathi (India)" },
  { key: "nb-NO", value: "Norwegian (Bokmål) (Norway)" },
  { key: "nl-NL", value: "Dutch (Netherlands)" },
  { key: "pl-PL", value: "Polish (Poland)" },
  { key: "pt-BR", value: "Portuguese (Brazil)" },
  { key: "pt-PT", value: "Portuguese (Portugal)" },
  { key: "ru-RU", value: "Russian (Russia)" },
  { key: "sv-SE", value: "Swedish (Sweden)" },
  { key: "ta-IN", value: "Tamil (India)" },
  { key: "te-IN", value: "Telugu (India)" },
  { key: "zh-CN", value: "Chinese (Mandarin, simplified)" },
  { key: "zh-HK", value: "Chinese (Cantonese, Traditional)" },
  { key: "zh-TW", value: "Chinese (Taiwanese Mandarin)" },
  { key: "th-TH", value: "Thai (Thailand)" },
  { key: "tr-TR", value: "Turkey" }
];

export const availableToLanguages = [
  { key: "af", value: "Afrikaans" },
  { key: "ar", value: "Arabic" },
  { key: "bn", value: "Bangla" },
  { key: "bs", value: "Bosnian (Latin)" },
  { key: "bg", value: "Bulgarian" },
  { key: "yue", value: "Cantonese (Traditional)" },
  { key: "ca", value: "Catalan" },
  { key: "zh-Hans", value: "Chinese Simplified" },
  { key: "zh-Hant", value: "Chinese Traditional" },
  { key: "hr", value: "Croatian" },
  { key: "cs", value: "Czech" },
  { key: "da", value: "Danish" },
  { key: "nl", value: "Dutch" },
  { key: "en", value: "English" },
  { key: "et", value: "Estonian" },
  { key: "fj", value: "Fijian" },
  { key: "fil", value: "Filipino" },
  { key: "fi", value: "Finnish" },
  { key: "fr", value: "French" },
  { key: "de", value: "German" },
  { key: "el", value: "Greek" },
  { key: "ht", value: "Haitian Creole" },
  { key: "he", value: "Hebrew" },
  { key: "hi", value: "Hindi" },
  { key: "mww", value: "Hmong Daw" },
  { key: "hu", value: "Hungarian" },
  { key: "id", value: "Indonesian" },
  { key: "it", value: "Italian" },
  { key: "ja", value: "Japanese" },
  { key: "sw", value: "Kiswahili" },
  { key: "tlh", value: "Klingon" },
  { key: "tlh-Qaak", value: "Klingon (plqaD)" },
  { key: "ko", value: "Korean" },
  { key: "lv", value: "Latvian" },
  { key: "lt", value: "Lithuanian" },
  { key: "mg", value: "Malagasy" },
  { key: "ms", value: "Malay" },
  { key: "mt", value: "Maltese" },
  { key: "nb", value: "Norwegian" },
  { key: "fa", value: "Persian" },
  { key: "pl", value: "Polish" },
  { key: "pt", value: "Portuguese" },
  { key: "otq", value: "Queretaro Otomi" },
  { key: "ro", value: "Romanian" },
  { key: "ru", value: "Russian" },
  { key: "sm", value: "Samoan" },
  { key: "sr-Cyrl", value: "Serbian (Cyrillic)" },
  { key: "sr-Latn", value: "Serbian (Latin)" },
  { key: "sk", value: "Slovak" },
  { key: "sl", value: "Slovenian" },
  { key: "es", value: "Spanish" },
  { key: "sv", value: "Swedish" },
  { key: "ty", value: "Tahitian" },
  { key: "ta", value: "Tamil" },
  { key: "th", value: "Thai" },
  { key: "to", value: "Tongan" },
  { key: "tr", value: "Turkish" },
  { key: "uk", value: "Ukrainian" },
  { key: "ur", value: "Urdu" },
  { key: "vi", value: "Vietnamese" },
  { key: "cy", value: "Welsh" },
  { key: "yua", value: "Yucatec Maya" }
];