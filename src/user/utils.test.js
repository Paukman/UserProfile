import MockDate from "mockdate";
import {
    formatBirthday,
    invertColor,
    swapCurrentAndPreviousState,
    checkIfBirthdayIsToday
  } from "./utils";
  
  describe("Testing formatBirthday", () => {
    it("should properly format birthday", () => {
      let res = formatBirthday("2020/04/11");
      expect(res).toEqual("Apr 11, 2020");
      res = formatBirthday(
        "Mon Apr 19 2021 17:47:04 GMT-0600 (Mountain Daylight Time)"
      );
      expect(res).toEqual("Apr 19, 2021");
    });
  });
  
  describe("Testing invertColor", () => {
    it("should properly invert color", () => {
      let res = invertColor("#000000");
      expect(res).toEqual("#ffffff");
      res = invertColor("#000");
      expect(res).toEqual("#ffffff");
      res = invertColor("#98a66b");
      expect(res).toEqual("#675994");
      res = invertColor("#98a66b", 1);
      expect(res).toEqual("#FFFFFF");
  
      res = invertColor("#6666", 1);
      expect(res).toEqual(null);
    });
  });
  
  describe("Testing swapCurrentAndPreviousState", () => {
    const currentState = { a: 1, b: 2 };
    const previousState = { a: 5, b: 5 };
  
    it("should properly invert color", () => {
      const res = swapCurrentAndPreviousState(currentState, previousState);
      const { newCurrentState, newPreviousState } = res;
      expect(newCurrentState).toMatchObject(previousState);
      expect(newPreviousState).toMatchObject(currentState);
    });
  });

  describe("Testing checkIfBirthdayIsToday", () => {
    beforeEach(() => {
        MockDate.set("2019-01-30T10:20:30Z");
      });
    
      afterEach(() => {
        MockDate.reset();
      });
    it("should return proper value", () => {
      let res = checkIfBirthdayIsToday("2019-01-30");
      expect(res).toEqual(true);
      res = checkIfBirthdayIsToday("2019-01-29");
      expect(res).toEqual(false);
    });
  });
  