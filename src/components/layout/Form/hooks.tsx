import { Input } from '@src/components/dumb/Input';
import React, { useCallback, useEffect, useState } from 'react';
import { FormElement, UseFormProps, UseFormReturnType } from './types';

const DEFAULT_MATCHER = /.*/;

export const getInputsValue = (elements: FormElement): { [key: string]: string } => {
  return elements.reduce(
    (acc, element) => ({ ...acc, [element.id]: element.defaultValue ?? '' }),
    {}
  );
};

export const matchString = (stringToCheck: string, pattern: RegExp = DEFAULT_MATCHER): boolean => {
  return !!stringToCheck.match(pattern);
};

export const useForm = ({
  formElements,
  buttonLabel,
  onClickButton
}: UseFormProps): UseFormReturnType => {
  const [inputsValue, setInputsValue] = useState<{ [key: string]: string }>(
    getInputsValue(formElements)
  );
  const isButtonDisabled = formElements.some(
    ({ id, pattern }) => !matchString(inputsValue[id], pattern)
  );
  const onClick = useCallback(() => onClickButton(inputsValue), [inputsValue, onClickButton]);
  const elements = formElements.map(({ type, placeholder, pattern, id, errorMessage }) => {
    return (
      <Input
        isOnError={!matchString(inputsValue[id], pattern)}
        key={id}
        type={type}
        onChange={(e) => {
          setInputsValue({ ...inputsValue, [id]: e.target.value });
        }}
        placeholder={placeholder}
        value={inputsValue[id]}
        errorMessage={errorMessage}
      ></Input>
    );
  });

  useEffect(() => {
    setInputsValue(getInputsValue(formElements));
  }, [formElements]);

  return {
    buttonLabel,
    isButtonDisabled,
    elements,
    onClick
  };
};
