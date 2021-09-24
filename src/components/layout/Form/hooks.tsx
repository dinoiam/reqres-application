import { Input } from '@src/components/dumb/Input';
import { everythingPattern } from '@src/utils/regExpPattern';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormElement, UseFormProps, FormViewProps } from './types';

export const getInputsValue = (elements: FormElement): { [key: string]: string } => {
  return elements.reduce((acc, { id, defaultValue }) => ({ ...acc, [id]: defaultValue ?? '' }), {});
};

export const matchString = (
  stringToCheck: string,
  pattern: RegExp = everythingPattern
): boolean => {
  return !!stringToCheck.match(pattern);
};

export const useForm = ({
  formElements,
  buttonLabel,
  onClickButton,
  buttonId = 'form-button'
}: UseFormProps): FormViewProps => {
  const [inputsValue, setInputsValue] = useState<{ [key: string]: string }>(
    getInputsValue(formElements)
  );
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

export const useIsButtonDisabled = (
  formElements: FormElement,
  inputsValue: { [key: string]: string }
): boolean => {
  return useMemo(
    () => formElements.some(({ id, pattern }) => !matchString(inputsValue[id], pattern)),
    [formElements, inputsValue]
  );
};

export const useInputRender = (
  inputsValue: { [key: string]: string },
  setInputsValue: (arg: { [key: string]: string }) => void,
  formElements: FormElement
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
