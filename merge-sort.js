export default function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const left = mergeSort(arr.length % 2 === 0 ? arr.slice(0, arr.length / 2)
    : arr.slice(0, arr.length / 2 + 1));
  const right = mergeSort(arr.length % 2 === 0 ? arr.slice(arr.length / 2, arr.length)
    : arr.slice(arr.length / 2 + 1, arr.length));
  const sortedLength = left.length + right.length;
  const sorted = [];
  while (sorted.length < sortedLength) {
    let min = left.length > 0 ? left[0] : right[0];
    let minPos = left.length > 0 ? ['left', 0] : ['right', 0];

    if (left.length > 0) {
      for (let i = 0; i < left.length; i += 1) {
        if (left[i] < min) {
          min = left[i];
          minPos = ['left', i];
        }
      }
    }

    if (right.length > 0) {
      for (let i = 0; i < right.length; i += 1) {
        if (right[i] < min) {
          min = right[i];
          minPos = ['right', i];
        }
      }
    }

    if (minPos[0] === 'left') {
      sorted.push(left[minPos[1]]);
      left.splice(minPos[1], 1);
    } else {
      sorted.push(right[minPos[1]]);
      right.splice(minPos[1], 1);
    }
  }

  return sorted;
}
