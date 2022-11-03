type CounterType = (count?: number) => [() => number, () => void];

export const counter: CounterType = (count) => {
  let state: number = count ? count : 0;

  const getCount = () => {
    return state;
  };

  const increment = () => {
    state++;
  };

  return [getCount, increment];
};
