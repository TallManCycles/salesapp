import React from 'react';
import {useState} from 'react';
import './App.css';
import ReactFileReader from 'react-file-reader';
import Algorithms from './components/data/Algorithms';

function App() {

  const [algorithm, SetAlgorithm] = useState('movingaverage');
  const [csvData, SetCsvData] = useState<string[]>([]);
  const [result, SetResult] = useState<number[]>([]);
  const [period, SetPeriod] = useState(3);
  const [alpha, SetAlpha] = useState(0.4);

  // Functions

  // handler for the calculate button
  const calculateValues = () => {

    // if the csvData is empty, this means that the csv data must be in the input, and the user hasn't uploaded a csv file.
    if (csvData.length === 0) {
      readCSVText();
    }

    if (csvData.length > 0) {
      if (algorithm === 'movingaverage') {
        const result = Algorithms.movingAverage(csvData, period);
        SetResult(result);
      } else if (algorithm === 'singleexponentialsmoothing') {
        const result = Algorithms.singleExponential(csvData,period,alpha);
        SetResult(result);
      } else {
        alert('Please select an algorithm');
      }

      console.log(csvData);
    } else {
      alert('Please upload a CSV file or enter CSV data');
    }
  }

  // reads the csv values from the user input
  function readCSVText() {
    const csvText = document.querySelector('textarea')?.value;

    if (csvText) {
      const csvArray = csvText.split(',').map((value) => value.trim());
      SetCsvData(csvArray);
      console.log(csvArray);
    } else {
      alert('Please enter CSV data');
    }
  }

  // Handlers

  // handler for the csv upload
  const handleFiles = (files: FileList): void => {
    const reader = new FileReader();

    // Read file content on file loaded event
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const csvString = e.target?.result as string;
      if (csvString) {
        const csvArray = csvString.split(',').map((value) => value.trim());
        SetCsvData(csvArray);
      } else {
        console.log('No CSV data');
      }
    };

    // Load object as text
    if (files.length > 0){
      reader.readAsText(files[0]);  
    } else {
      alert('No file selected');
    }

  };

  // handler for the algorithm radio buttons
  const handleChange = (e: any) => {
    SetAlgorithm(e.target.value);
  }

  return (
    <div className="App">
      <h1>Sales Data App</h1>

      <textarea rows={4} placeholder={'Enter CSV data'} />

      <ReactFileReader handleFiles={handleFiles} fileTypes='.csv'>
        <button className='btn'>Upload CSV File</button>
      </ReactFileReader>

      <form className='formData'>
        <p>Choose your preffered algorithm:</p>
        <label>
          <input type="radio" name="language" value="movingaverage" checked={algorithm === 'movingaverage'} onChange={handleChange} />
          Moving Average
        </label>
        <label>
          <input type="radio" name="language" value="singleexponentialsmoothing" checked={algorithm === 'singleexponentialsmoothing'} onChange={handleChange} />
          Single Exponential Smoothing
        </label>
        <label>
          Period:
          <input type="number" name="period" value={period} max={10} min={0} onChange={(e) => SetPeriod(Number(e.target.value))} />
        </label>
        <label>
          Alpha:
          <input type="number" name="alpha" value={alpha} disabled={algorithm === 'movingaverage'} onChange={(e) => SetAlpha(Number(e.target.value))} />
        </label>
      </form>

      

      <button className='btn' onClick={calculateValues}>Calculate</button>
      <textarea rows={4} placeholder={'Result'} value={result.toString()} />

    </div>
  );
}

export default App;
