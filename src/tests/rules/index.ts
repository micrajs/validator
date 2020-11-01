import { ValidationContext, ValidationRule } from '../../types';

export const makeMockRule = <DTO extends Record<string, any> = Record<string, any>>(): ValidationRule<DTO> => ({
  check: jest.fn(),
  message: jest.fn(),
})

export const required: ValidationRule = {
  check({ value }) {
    if (typeof value === 'string') {
      return value.replace(/\s+/g, '').trim() !== '';
    }

    return value != null;
  },
  message: () => 'This is required',
};

export const isString: ValidationRule = {
  check({ value }) {
    return typeof value === 'string' || value instanceof String;
  },
  message: () => 'Field should be a string',
};

export const optional = (rules: ValidationRule[] = [], fallback?: any) => ({
  dto,
  field,
  data,
}: ValidationContext) => {
  if (Object.keys(data).includes(field as string)) {
    return rules;
  }

  if (fallback) {
    dto[field as string] = fallback;
  }

  return [];
};
