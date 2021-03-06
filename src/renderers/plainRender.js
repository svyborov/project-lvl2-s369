import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : value);
const typeActions = {
  unchanged: () => '',
  nested: (data, parent, f) => `${f(data.children, (`${data.key}.`))}`,
  changed: (data, parent) => `${parent}${data.key} was updated. From ${stringify(data.valueBefore)} to ${stringify(data.valueAfter)}`,
  added: (data, parent) => `${parent}${data.key} was added with value: ${stringify(data.valueAfter)}`,
  deleted: (data, parent) => `${parent}${data.key} was removed`,
};

const plainRender = (data, parent = '') => {
  const renderedData = data.reduce((acc, value) => {
    const typeValue = value.type;
    return [...acc, typeActions[typeValue](value, parent, plainRender)];
  }, []).filter(value => value !== '');
  return _.flatten(renderedData).join('\n');
};

export default plainRender;
