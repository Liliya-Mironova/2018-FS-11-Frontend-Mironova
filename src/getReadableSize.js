function getReadableSize(size) {
  const arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];
  let newSize = size;
  for (const item in arr) {
      if (newSize < 1024) {
        return `${Math.ceil(newSize)} ${arr[item]}`;
      }
      newSize /= 1024;
  }
  return `${Math.ceil(newSize)} B`;
}

console.log(getReadableSize(2048));
