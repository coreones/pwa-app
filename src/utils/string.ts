export const stringArray = (value: string, splitter: string = "-") => {
  let array = value.trim().toString().split(splitter);
  if (array.length == 0) {
    array = ["", ""];
  } else if (array.length == 1) {
    array = [array[0].trim(), ""];
  } else if (array.length == 2) {
    array = [array[0].trim(), array[1].trim()];
  } else if (array.length == 3) {
    array = [array[0].trim(), array[1].trim(), array[2].trim()];
  } else if (array.length > 3) {
    array = [
      array[0].trim(),
      array[1].trim(),
      array[2].trim(),
      array[3].trim(),
    ];
  }
  return array;
};
