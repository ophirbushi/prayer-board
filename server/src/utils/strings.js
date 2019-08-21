/** parse comma seperated string arrays
* @example
* parseStringArray('abc,one') // ['abc', 'one']
*/
const parseStringArray = (str) => {
  if (typeof str !== 'string') return null;
  return str.split(',')
    .filter((seg) => !!seg)
    .map((seg) => seg.trim());
};

module.exports = {
  parseStringArray
};
