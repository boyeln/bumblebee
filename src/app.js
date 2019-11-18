import React from "react";
import { useLocalStorage } from "./hooks";

export default function App() {
  const [azureKey, setAzureKey] = useLocalStorage("azureKey");
  const [azureRegion, setAzureRegion] = useLocalStorage("azureRegion");
  const [isRecording, setIsRecording] = React.useState(false);

  const handleAzureKeyChange = evt => setAzureKey(evt.target.value);
  const handleAzureRegionChange = evt => setAzureRegion(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!isRecording) {
      setIsRecording(true);
      // Start recording
    } else {
      // Stop recording
      setIsRecording(false);
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Azure Key
          <input
            type="text"
            name="key"
            placeholder="Key"
            value={azureKey}
            onChange={handleAzureKeyChange}
          />
        </label>
        <label>
          Azure Region
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={azureRegion}
            onChange={handleAzureRegionChange}
          />
        </label>
        <button>{isRecording ? "Stopp" : "Start"}</button>
      </form>

      <pre></pre>
    </React.Fragment>
  );
}