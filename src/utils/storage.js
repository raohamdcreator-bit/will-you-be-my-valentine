export const saveNames = (from, to) => {
  localStorage.setItem('valentine_from', from);
  localStorage.setItem('valentine_to', to);
};

export const getNames = () => {
  return {
    from: localStorage.getItem('valentine_from'),
    to: localStorage.getItem('valentine_to')
  };
};

export const clearNames = () => {
  localStorage.removeItem('valentine_from');
  localStorage.removeItem('valentine_to');
};
