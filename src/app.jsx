import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useLocalStorage } from "./hooks";
import { createRecognizer, createTranslator, noop } from "./utils";

export default function App() {
  const [subscriptionKey, setSubscriptionKey] = useLocalStorage("subscriptionKey");
  const [serviceRegion, setServiceRegion] = useLocalStorage("serviceRegion");
  const [fromLanguage, setFromLanguage] = useLocalStorage("fromLanguage", "ar-EG");
  const [toLanguage, setToLanguage] = useLocalStorage("toLanguage", "en");
  const [translate, setTranslate] = useLocalStorage("translate", "false");
  const [isRecording, setIsRecording] = React.useState(false);
  const [stopRecognizing, setStopRecognizing] = React.useState(() => noop);
  const [currentLine, setCurrentLine] = React.useState("");
  const [lines, setLines] = React.useState([]);

  const handleSubscriptionKeyChange = evt => !isRecording && setSubscriptionKey(evt.target.value);
  const handleServiceRegionChange = evt => !isRecording && setServiceRegion(evt.target.value);
  const handleFromLanguageChange = evt => !isRecording && setFromLanguage(evt.target.value);
  const handleToLanguageChange = evt => !isRecording && setToLanguage(evt.target.value);
  const handleTranslationChange = () => !isRecording && setTranslate(current => current === "true" ? "false" : "true");

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!isRecording) {
      setIsRecording(true);
      const recognizer = translate === "true"
      ? createTranslator(
          subscriptionKey,
          serviceRegion,
          fromLanguage,
          toLanguage,
          (text, translation) => {
            setCurrentLine(translation);
          },
          (text, translation) => {
            setLines(curr => [translation].concat(curr));
            setCurrentLine("");
          }
        )
      : createRecognizer(
        subscriptionKey,
        serviceRegion,
        fromLanguage,
        text => {
          setCurrentLine(text);
        },
        text => {
          setLines(curr => [text].concat(curr));
          setCurrentLine("");
        }
      )

      recognizer.startContinuousRecognitionAsync();

      // HACK
      setStopRecognizing(() => () => {
        recognizer.stopContinuousRecognitionAsync();
        recognizer.close();
      });
    } else {
      stopRecognizing();
      setIsRecording(false);
      setStopRecognizing(() => noop);
    }
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Form onSubmit={handleSubmit} isRecording={isRecording}>
        <label>
          Azure Key
          <input
            type="text"
            name="key"
            placeholder="Key"
            value={subscriptionKey}
            onChange={handleSubscriptionKeyChange}
            disabled={isRecording}
          />
        </label>
        <label>
          Azure Region
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={serviceRegion}
            onChange={handleServiceRegionChange}
            disabled={isRecording}
          />
        </label>
        <label>
          From Language
          <select value={fromLanguage} onChange={handleFromLanguageChange} disabled={isRecording}>
            <option value="ar-EG">Arabic (Egypt), modern standard</option>
            <option value="ar-SA">Arabic (Saudi Arabia)</option>
            <option value="ar-AE">Arabic (UAE)</option>
            <option value="ar-KW">Arabic (Kuwait)</option>
            <option value="ar-QA">Arabic (Qatar)</option>
            <option value="ca-ES">Catalan</option>
            <option value="da-DK">Danish (Denmark)</option>
            <option value="de-DE">German (Germany)</option>
            <option value="en-AU">English (Australia)</option>
            <option value="en-CA">English (Canada)</option>
            <option value="en-GB">English (United Kingdom)</option>
            <option value="en-IN">English (India)</option>
            <option value="en-NZ">English (New Zealand)</option>
            <option value="en-US">English (United States)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="es-MX">Spanish (Mexico)</option>
            <option value="fi-FI">Finnish (Finland)</option>
            <option value="fr-CA">French (Canada)</option>
            <option value="fr-FR">French (France)</option>
            <option value="gu-IN">Gujarati (Indian)</option>
            <option value="hi-IN">Hindi (India)</option>
            <option value="it-IT">Italian (Italy)</option>
            <option value="ja-JP">Japanese (Japan)</option>
            <option value="ko-KR">Korean (Korea)</option>
            <option value="mr-IN">Marathi (India)</option>
            <option value="nb-NO">Norwegian (Bokmål) (Norway)</option>
            <option value="nl-NL">Dutch (Netherlands)</option>
            <option value="pl-PL">Polish (Poland)</option>
            <option value="pt-BR">Portuguese (Brazil)</option>
            <option value="pt-PT">Portuguese (Portugal)</option>
            <option value="ru-RU">Russian (Russia)</option>
            <option value="sv-SE">Swedish (Sweden)</option>
            <option value="ta-IN">Tamil (India)</option>
            <option value="te-IN">Telugu (India)</option>
            <option value="zh-CN">Chinese (Mandarin, simplified)</option>
            <option value="zh-HK">Chinese (Cantonese, Traditional)</option>
            <option value="zh-TW">Chinese (Taiwanese Mandarin)</option>
            <option value="th-TH">Thai (Thailand)</option>
            <option value="tr-TR">Turke</option>
          </select>
        </label>
        <label>
          Translate
          <input
            type="checkbox"
            checked={translate === "true"}
            onChange={handleTranslationChange}
            value="translate"
            disabled={isRecording}
          />
        </label>
        {translate === "true" && <label>
          To Language
          <select value={toLanguage} onChange={handleToLanguageChange} disabled={isRecording}>
            <option value="af">Afrikaans</option>
            <option value="ar">Arabic</option>
            <option value="bn">Bangla</option>
            <option value="bs">Bosnian (Latin)</option>
            <option value="bg">Bulgarian</option>
            <option value="yue">Cantonese (Traditional)</option>
            <option value="ca">Catalan</option>
            <option value="zh-Hans">Chinese Simplified</option>
            <option value="zh-Hant">Chinese Traditional</option>
            <option value="hr">Croatian</option>
            <option value="cs">Czech</option>
            <option value="da">Danish</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="et">Estonian</option>
            <option value="fj">Fijian</option>
            <option value="fil">Filipino</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="ht">Haitian Creole</option>
            <option value="he">Hebrew</option>
            <option value="hi">Hindi</option>
            <option value="mww">Hmong Daw</option>
            <option value="hu">Hungarian</option>
            <option value="id">Indonesian</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="sw">Kiswahili</option>
            <option value="tlh">Klingon</option>
            <option value="tlh-Qaak">Klingon (plqaD)</option>
            <option value="ko">Korean</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="mg">Malagasy</option>
            <option value="ms">Malay</option>
            <option value="mt">Maltese</option>
            <option value="nb">Norwegian</option>
            <option value="fa">Persian</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="otq">Queretaro Otomi</option>
            <option value="ro">Romanian</option>
            <option value="ru">Russian</option>
            <option value="sm">Samoan</option>
            <option value="sr-Cyrl">Serbian (Cyrillic)</option>
            <option value="sr-Latn">Serbian (Latin)</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="es">Spanish</option>
            <option value="sv">Swedish</option>
            <option value="ty">Tahitian</option>
            <option value="ta">Tamil</option>
            <option value="th">Thai</option>
            <option value="to">Tongan</option>
            <option value="tr">Turkish</option>
            <option value="uk">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="vi">Vietnamese</option>
            <option value="cy">Welsh</option>
            <option value="yua">Yucatec May</option>
          </select>
        </label>}
        <button>{isRecording ? "Stopp" : "Start"}</button>
      </Form>

      <CurrentLine>{currentLine}</CurrentLine>
      <div>{lines.map((line, index) => <p key={index}>{line}</p>)}</div>
    </React.Fragment>
  );
}

const CurrentLine = styled.p`
  font-weight: bold;
  padding: 0.5em;
  min-height: 10em;
  border: 1px solid gray;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 0.8rem;

    input {
      font-size: 1rem;
    }

    select {
      font-size: 1rem;
    }
  }

  button {
    font-size: 1rem;
    background-color: ${props => props.isRecording ? "#bd2626" : "#179632"};
    border: none;
    color: white;
    padding: 1rem;
    cursor: pointer;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
  };
`;