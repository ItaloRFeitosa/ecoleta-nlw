import React from 'react';

import Select, {OptionsType, ValueType} from 'react-select';

interface SelectProps {
  options: OptionsType<{label:string, value:string}>;
  value: ValueType<{label: string, value: string}>;
  onChange(selected?: ValueType<{label:string, value:string}> | null): void;
}

const SelectField: React.FC<SelectProps> = ({options, value, onChange, ...props}) => {

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      {...props}
      styles={
        {
          control: (provided, state) => ({
            ...provided

          }),
          valueContainer: (provided, state) => ({
            ...provided,
            padding: '14px 24px'
          })
        }
      }>

    </Select>
  );
}

export default SelectField;
