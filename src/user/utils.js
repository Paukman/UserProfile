import _ from "lodash";

export const formatBirthday = date => {
  const birthday = new Date(date);
  const month = birthday.toLocaleString("default", { month: "short" });
  const day = birthday.getDate();
  const year = birthday.getFullYear();
  const formattedBirthday = `${month} ${day}, ${year}`;
  return formattedBirthday;
};

export const invertColor = (hex, bw) => {
  let tempHex = hex;
  if (tempHex.indexOf("#") === 0) {
    tempHex = tempHex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (tempHex.length === 3) {
    tempHex =
      tempHex[0] +
      tempHex[0] +
      tempHex[1] +
      tempHex[1] +
      tempHex[2] +
      tempHex[2];
  }
  if (tempHex.length !== 6) {
    return null;
  }
  let r = parseInt(tempHex.slice(0, 2), 16);
  let g = parseInt(tempHex.slice(2, 4), 16);
  let b = parseInt(tempHex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return `#${r.padStart(2, "0")}${g.padStart(2, "0")}${b.padStart(2, "0")}`;
};

export const swapCurrentAndPreviousState = (currentState, previousState) => {
  const tempState = _.cloneDeep(currentState);
  const newCurrentState = _.cloneDeep(previousState);
  const newPreviousState = _.cloneDeep(tempState);
  return { newCurrentState, newPreviousState };
};

export const checkIfBirthdayIsToday = birthday => {
  const today = new Date();
    const isBirthdayToday =
      today.getDate() === birthday.getDate() &&
      today.getMonth() === birthday.getMonth();
  return isBirthdayToday;
}
