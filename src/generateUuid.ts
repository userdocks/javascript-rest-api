// https://stackoverflow.com/a/8809472/1190853
export const generateUuid = () => {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && performance.now() * 1000) || 0;

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;

    if (d > 0) {
      // eslint-disable-next-line no-bitwise
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // eslint-disable-next-line no-bitwise
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }

    // eslint-disable-next-line no-bitwise
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16); // eslint-disable-line eqeqeq
  });
};
