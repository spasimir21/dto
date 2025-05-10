import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { RangeProperties, WithRange } from '../mixins/range';
import { deriveDTO } from '../DTO';

interface DateProperties
  extends ValidatorProperties<Date, DateProperties>,
    RangeProperties<'time'>,
    RangeProperties<'year'>,
    RangeProperties<'month'>,
    RangeProperties<'date'>,
    RangeProperties<'day'>,
    RangeProperties<'hour'>,
    RangeProperties<'minute'>,
    RangeProperties<'second'>,
    RangeProperties<'millis'> {}

class DateDTO extends deriveDTO(
  WithValidators,
  WithRange<'time', DateDTO>('time'),
  WithRange<'year', DateDTO>('year'),
  WithRange<'month', DateDTO>('month'),
  WithRange<'date', DateDTO>('date'),
  WithRange<'day', DateDTO>('day'),
  WithRange<'hour', DateDTO>('hour'),
  WithRange<'minute', DateDTO>('minute'),
  WithRange<'second', DateDTO>('second'),
  WithRange<'millis', DateDTO>('millis')
)<Date, DateProperties> {
  stringify(): string {
    return 'date';
  }

  export() {
    return {
      $$type: 'date',
      time: this.properties.time,
      year: this.properties.year,
      month: this.properties.month,
      date: this.properties.date,
      day: this.properties.day,
      hour: this.properties.hour,
      minute: this.properties.minute,
      second: this.properties.second,
      millis: this.properties.millis
    } as const;
  }
}

const date = (props: DateProperties = {}) => new DateDTO(props);

export { DateProperties, DateDTO, date };
