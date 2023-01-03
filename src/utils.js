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
  const stringAsArray = string ? string.split(',') : []
  const index = stringAsArray.indexOf(value);
  if (index > -1) {
    stringAsArray.splice(index, 1)
  } else {
    stringAsArray.push(value)
  }
  stringAsArray.sort()
  return stringAsArray.length ? stringAsArray.join(',') : ''
}

export const formatLargeTransmission = (value = '') => {
  const val = String(value).toLowerCase()
  if (val.includes('aut')
    || val === 'steptronic'
    || val === 'dsg'
    || val === 's tronic'
    || val === 'pdk'
    || val === 'edc'
    || val === 'twinami'
    || val === 'tct'
    || val === 'powershift'
    || val === 'cvt'
  ) {
    return 'Automatic'
  }
  if (val.includes('man')) {
    return 'Manual'
  }
  return null
}
