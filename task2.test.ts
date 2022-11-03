import { counter } from "./task2";

describe("counter function", () => {
  it("get values", () => {
    const [getValue, incrementValue] = counter(1);

    expect(getValue()).toEqual(1);
  });

  it("increment value", () => {
    const [getValue, incrementValue] = counter(5);

    incrementValue();

    expect(getValue()).toEqual(6);
  });

  it("default value", () => {
    const [getValue, incrementValue] = counter();

    expect(getValue()).toEqual(0);
  });

  it("test on lack of dependency bettwen two functions", () => {
    const [getFirstValue, incrementFirstValue] = counter(1);
    const [getSecondValue, incrementSecondValue] = counter(100);

    expect(getFirstValue()).toEqual(1);

    incrementFirstValue();

    expect(getFirstValue()).toEqual(2);
    expect(getSecondValue()).toEqual(100);

    incrementSecondValue();

    expect(getSecondValue()).toEqual(101);
  });
});
