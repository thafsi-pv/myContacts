import { toast } from "react-hot-toast";

export const copyToClipboard = (textareaRef, text) => {
  if (!textareaRef.current) return;
  try {
    textareaRef.current.value = text;
    textareaRef.current.select();
    document.execCommand("copy");
    console.log("Text copied to clipboard:", text);
    textareaRef.current.blur();
    toast.success("No coppied");
  } catch (error) {
    console.error("Failed to copy text:", error);
  }
};

export const changeKeyInArray = (array, keyChanges) => {
  return array.map((item) => {
    const newItem = { ...item };
    Object.keys(keyChanges).forEach((oldKey) => {
      const newKey = keyChanges[oldKey];
      if (newKey != oldKey) {
        newItem[newKey] = newItem[oldKey];
        delete newItem[oldKey];
      }
    });
    return newItem;
  });
};

export const formatNo = (no) => {
  const formattedPhoneNumber = no
    .toString()
    .replace(/^(\d{2})(\d{4})(\d{3})(\d{3})$/, "+$1 $2 $3 $4");
  return formattedPhoneNumber;
};

export function getRandomColorCode() {
  // Generate random values for red, green, and blue channels
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  // Convert the decimal values to hexadecimal strings
  var redHex = red.toString(16).padStart(2, "0");
  var greenHex = green.toString(16).padStart(2, "0");
  var blueHex = blue.toString(16).padStart(2, "0");

  // Combine the hexadecimal values into a color code
  var colorCode = "#" + redHex + greenHex + blueHex;

  return colorCode;
}

export const getInitialLetters = (str) => {
  const words = str.split(" ");
  let result = "";
  for (
    let index = 0;
    index < words.length && words[index] != "undefined";
    index++
  ) {
    result += words[index].charAt(0).toUpperCase();
  }
  return result;
};

export const convertFirstLetterToCapital = (word) => {
  let upper = word.charAt(0).toUpperCase();
  let result = upper + word.slice(1);
  return result;
};
