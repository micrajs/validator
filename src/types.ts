/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from './ValidationError';

export type ValidationContext<T = any> = {
  data: Record<string, any>;
  field: keyof T;
  value: any;
  dto: Partial<T>;
  fields: (keyof T)[];
  errors: ValidationError<T>;
};

export interface ErrorReport {
  message: string;
  variables?: Record<string, any>;
}

export type ValidationRule<T = any> = {
  check(context: ValidationContext<T>): boolean;
  shouldRun?(context: ValidationContext<T>): boolean;
  message(context: ValidationContext<T>): ErrorReport | string;
};

export type ValidationRuleGenerator<T = any> = (
  context: ValidationContext<T>,
) => ValidationRule<T>[];

export type ValidationDefinition<T = any> = Record<
  keyof T,
  ValidationRule<T>[] | ValidationRuleGenerator<T>
>;
