const joinClasses = (arrayOfClass = []) => {
  return arrayOfClass.filter(Boolean).join(' ');
};

export default joinClasses;
