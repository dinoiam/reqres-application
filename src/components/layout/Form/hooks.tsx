import { Input } from '@src/components/dumb/Input';
import { everythingPattern } from '@src/utils/regExpPattern';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormElement, FormProps, FormViewProps } from './types';

export const getInputsValue = <T extends string>(
  elements: FormElement<T>
): { [key in T]: string } => {
  return elements.reduce(
    (acc, { id, defaultValue }) => ({ ...acc, [id]: defaultValue ?? '' }),
    {} as { [key in T]: string }
  );
};

export const matchString = (
  stringToCheck: string,
  pattern: RegExp = everythingPattern
): boolean => {
  return !!stringToCheck.match(pattern);
};

export const useForm = <T extends string>({
  formElements,
  buttonLabel,
  onClickButton,
  buttonId = 'form-button'
}: FormProps<T>): FormViewProps => {
  const [inputsValue, setInputsValue] = useState(getInputsValue(formElements));
  const isButtonDisabled = useIsButtonDisabled(formElements, inputsValue);
  const onClick = useCallback(() => onClickButton(inputsValue), [inputsValue, onClickButton]);
  const elements = useInputRender(inputsValue, setInputsValue, formElements);

  useEffect(() => {
    setInputsValue(getInputsValue(formElements));
  }, [formElements]);

  return {
    buttonLabel,
    isButtonDisabled,
    elements,
    buttonId,
    onClick
  };
};

export const useIsButtonDisabled = <T extends string>(
  formElements: FormElement<T>,
  inputsValue: { [key: string]: string }
): boolean => {
  return useMemo(
    () => formElements.some(({ id, pattern }) => !matchString(inputsValue[id], pattern)),
    [formElements, inputsValue]
  );
};

export const useInputRender = <T extends string>(
  inputsValue: { [key in T]: string },
  setInputsValue: (arg: { [key in T]: string }) => void,
  formElements: FormElement<T>
): Array<JSX.Element> => {
  return formElements.map(({ type, placeholder, id, errorMessage, pattern }) => {
    return (
      <Input
        isOnError={!matchString(inputsValue[id], pattern)}
        key={id}
        type={type}
        onChange={(e) => setInputsValue({ ...inputsValue, [id]: e.target.value })}
        placeholder={placeholder}
        value={inputsValue[id]}
        errorMessage={errorMessage}
        data-testid={id}
      ></Input>
    );
  });
};
