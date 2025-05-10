import { AnyProperties } from '../../types/any';
import { Serializer } from '../serialization';
import { StringSerializer } from './string';

const AnySerializer: Serializer<any, AnyProperties> = {
  write: (value, props, binary) => StringSerializer.write(JSON.stringify(value), props, binary),
  read: (props, binary) => JSON.parse(StringSerializer.read(props, binary)),
  size: (value, props) => StringSerializer.size(JSON.stringify(value), props)
};

export { AnySerializer };
