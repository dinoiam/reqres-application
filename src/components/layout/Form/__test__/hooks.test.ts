import { emailPattern, everythingPattern, notEmptyPattern } from '@src/utils/regExpPattern';
import { renderHook } from '@testing-library/react-hooks';
import {
  matchString,
  getInputsValue,
  useForm,
  useIsButtonDisabled,
  useInputRender
} from '../hooks';
import { FormElement, UseFormProps } from '../types';

const formElements: FormElement = [
  {
    id: 'test_id_1',
    type: 'text',
    defaultValue: 'test_defaultValue_1'
  },
  {
    id: 'test_id_2',
    type: 'text',
    defaultValue: 'test_defaultValue_2'
  },
  {
    id: 'test_id_3',
    type: 'text',
    defaultValue: 'test_defaultValue_3'
  }
];

describe('matchString', () => {
  test('it should not match the strig', () => {
    expect(matchString('test_test', emailPattern)).toBe(false);
    expect(matchString('', notEmptyPattern)).toBe(false);
  });

  test('it should match the strig', () => {
    expect(matchString('email@email.com', emailPattern)).toBe(true);
    expect(matchString('not_empty', notEmptyPattern)).toBe(true);
    expect(matchString('')).toBe(true);
  });
});

describe('getInputsValue', () => {
  test('it should return the right object', () => {
    expect(getInputsValue(formElements)).toEqual({
      test_id_1: 'test_defaultValue_1',
      test_id_2: 'test_defaultValue_2',
      test_id_3: 'test_defaultValue_3'
    });
  });
});

describe('useForm', () => {
  test('it should return the right buttonId, buttonLabel', () => {
    const onClickButton = jest.fn();
    const props: UseFormProps = {
      formElements,
      buttonLabel: 'test_button_label',
      onClickButton: onClickButton
    };
    const { result } = renderHook(() => useForm(props));
    const { buttonId, buttonLabel } = result.current;
    expect(buttonId).toBe('form-button');
    expect(buttonLabel).toBe('test_button_label');
  });

  test('it should call onClickButton with the right object', () => {
    const onClickButton = jest.fn();
    const props: UseFormProps = {
      formElements,
      buttonLabel: 'test_button_label',
      onClickButton: onClickButton
    };
    const { result } = renderHook(() => useForm(props));
    const { onClick } = result.current;

    onClick();

    expect(onClickButton).toHaveBeenCalledWith({
      test_id_1: 'test_defaultValue_1',
      test_id_2: 'test_defaultValue_2',
      test_id_3: 'test_defaultValue_3'
    });
  });
});

describe('useIsButtonDisabled', () => {
  test('it should return false', () => {
    const formElements: FormElement = [
      {
        id: 'test_id_1',
        type: 'text',
        defaultValue: 'test_defaultValue_1',
        pattern: notEmptyPattern
      },
      {
        id: 'test_id_2',
        type: 'text',
        defaultValue: 'test_defaultValue_2'
      },
      {
        id: 'test_id_3',
        type: 'text',
        defaultValue: 'test_defaultValue_3',
        pattern: everythingPattern
      }
    ];

    const inputsValue = {
      test_id_1: 'test_defaultValue_1',
      test_id_2: 'test_defaultValue_2',
      test_id_3: 'test_defaultValue_3'
    };

    const { result } = renderHook(() => useIsButtonDisabled(formElements, inputsValue));
    const isButtonDisabled = result.current;
    expect(isButtonDisabled).toBe(false);
  });

  test('it should return true', () => {
    const formElements: FormElement = [
      {
        id: 'test_id_1',
        type: 'text',
        defaultValue: 'test_defaultValue_1',
        pattern: notEmptyPattern
      },
      {
        id: 'test_id_2',
        type: 'text',
        defaultValue: 'test_defaultValue_2',
        pattern: emailPattern
      },
      {
        id: 'test_id_3',
        type: 'text',
        defaultValue: 'test_defaultValue_3',
        pattern: everythingPattern
      }
    ];

    const inputsValue = {
      test_id_1: 'test_defaultValue_1',
      test_id_2: 'test_defaultValue_2',
      test_id_3: 'test_defaultValue_3'
    };

    const { result } = renderHook(() => useIsButtonDisabled(formElements, inputsValue));
    const isButtonDisabled = result.current;
    expect(isButtonDisabled).toBe(true);
  });
});

describe('useInputRender', () => {
  test('it should return the inputs', () => {
    const formElements: FormElement = [
      {
        id: 'test_id_1',
        type: 'text',
        defaultValue: 'test_defaultValue_1',
        pattern: emailPattern
      },
      {
        id: 'test_id_2',
        type: 'text',
        defaultValue: 'test_defaultValue_2'
      }
    ];
    const inputsValue = {
      test_id_1: 'test_defaultValue_1',
      test_id_2: 'test_defaultValue_2'
    };
    const setInputsValue = jest.fn();
    const { result } = renderHook(() => useInputRender(inputsValue, setInputsValue, formElements));
    const elements = result.current;

    elements[0].props['onChange']({ target: { value: 'test_onChange' } });

    expect(elements[0].props['isOnError']).toBe(true);
    expect(elements[1].props['isOnError']).toBe(false);
    expect(elements[0].props['value']).toBe('test_defaultValue_1');
    expect(elements[1].props['value']).toBe('test_defaultValue_2');
    expect(setInputsValue).toHaveBeenCalledWith({
      test_id_1: 'test_onChange',
      test_id_2: 'test_defaultValue_2'
    });
  });
});
