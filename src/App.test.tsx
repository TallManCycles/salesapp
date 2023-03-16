import Algorithms from './data/Algorithms';

// Test algorithm functions

// Test moving average function
test('moving average function', () => {
  const sales = ['50.00','60.00','40.00','30.00','90.00','-5.00','40.00','50.00','30.00','40.00'];
  const period = 3;
  const result = Algorithms.movingAverage(sales, period);
  expect(result).toEqual([50,55,50,43.33,53.33,38.33,41.67,28.33,40,40]);
});

// Test single exponential smoothing function
test('single exponential smoothing function', () => {
  const sales: string[] = ['50','60','40','30','90','-5','40','50','30','40'];
  const period: number = 3;
  const alpha: number = 0.4;
  const result: number[] = Algorithms.singleExponential(sales, period, alpha);
  expect(result).toEqual([50,54,48.4,41.04,60.62,34.37,36.62,41.97,37.18,]);
});


