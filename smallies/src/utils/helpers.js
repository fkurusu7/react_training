export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    console.log(j);
    const tmp = array[i];
    array[i] = array[j];
    array[j] = array[tmp];
  }

  return array;
};

export const shuffleSortArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
