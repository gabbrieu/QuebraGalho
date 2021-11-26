import InputMask from 'react-input-mask';

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ( {value, onChange, mask, placeholder, minLength} ) => {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        value: onlyNumbers(event.target.value),
      },
    });
  }

  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      minLength={minLength}
      required
    />
  );
};

export default MaskedInput;
