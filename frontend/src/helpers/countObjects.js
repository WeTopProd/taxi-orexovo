export function countByField(array, field, value) {
  let count = 0;

  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][field] === value) {
        count++;
      }
    }
  }

  return count;
}
