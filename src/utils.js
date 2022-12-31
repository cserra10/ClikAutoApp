/* eslint-disable import/prefer-default-export,no-param-reassign */
export const titleCaps = (title, lowercaseFirst = true) => {
  if (!title) return ''

  if (lowercaseFirst) {
    title = `${title} `.toLowerCase()
  }
  const sentence = title.split(' ').filter((item) => !!item)
  for (let i = 0; i < sentence.length; i += 1) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }

  return sentence.join(' ')
};

export const toggleValueFromString = (value, string = '') => {
  const stringAsArray = string ? string.split('_') : []
  console.log('stringAsArray', stringAsArray);
  const index = stringAsArray.indexOf(value)
  if (index > -1) {
    stringAsArray.splice(index, 1)
  } else {
    stringAsArray.push(value)
  }
  stringAsArray.sort()
  return stringAsArray.length ? stringAsArray.join('_') : ''
}
