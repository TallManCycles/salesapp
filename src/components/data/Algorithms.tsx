
// Calculates the moving average based on given sales over a period of time
// sales: string[] - the array of sales
// period: number - Integer (0-10), number of periods to use for moving calculation window
// returns: number[] - Numeric array, smoothed output values
function movingAverage(sales: string[], period: number): number[] {

  const averageSales: number[] = [];

  const arrayOfSales = convertToNumberArray(sales);

  for (let i = 0; i < arrayOfSales.length; i++) {

    const startIndex = Math.max(0, i - period + 1);
    const endIndex = i + 1;

    // find the window of sales based on the given period
    const window = arrayOfSales.slice(startIndex, endIndex);

    const sum = window.reduce((a, b) => a + b, 0);

    let average = sum / window.length;

    // ensure average is only two decimal places
    average = Math.round(average * 100) / 100;

    // any outputs that are less than 0 are set to 0
    if (average < 0) {
      average = 0;
    }

    averageSales.push(average);
  }

  return averageSales;
}


// Calculates the single exponential smoothing based on given sales over a period of time
// sales: string[] - the array of sales
// period: number - Integer (0-10), number of periods to use for moving calculation window
// alpha: number - Numeric (0-1), smoothing factor
// returns: number[] - Numeric array, smoothed output values
function singleExponential(sales: string[],period: number, alpha: number): number[] {

  const output = [];

  // convert the string array to a number array
  const salesArray = convertToNumberArray(sales);

  // get the initial window of sales based on the given period
  const initialWindow = salesArray.slice(0, period);

  // calculate the average of the initial window
  const initialAverage = initialWindow.reduce((a, b) => a + b, 0) / initialWindow.length;

  // add the initial average to the output array
  output.push(initialAverage);

  // loop through the sales array and calculate the smoothed value based on alpha value
  for (let i = 1; i < salesArray.length - 1; i++) {

    let smoothed: number = 0;

    smoothed = (salesArray[i] * alpha) + (output[i - 1] * (1 - alpha));

    smoothed = Math.round(smoothed * 100) / 100;

    output.push(smoothed);
  }

  return output;
}

// convert the string array to a number array
function convertToNumberArray(array: string[]): number[] {
  const result: number[] = [];
  for (let i = 0, len = array.length; i < len; i++) {
    result.push(Number(array[i]));
  }
  return result;
}

const exports = {
  movingAverage,
  singleExponential,
};

export default exports;