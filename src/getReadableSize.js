function getReadableSize(size) {
  const arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];
  let newSize = size;
  for (const item in arr) {
    if (Object.prototype.hasOwnProperty.call(item, arr)) {
      if (newSize < 1024) {
        return `${newSize} ${arr[item]}`;
      }
      newSize = Math.floor(newSize / 1024);
    }
  }
  return `${newSize} B`;
}

console.log(getReadableSize(2048));
