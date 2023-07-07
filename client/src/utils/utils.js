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
