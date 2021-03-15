import { ErrorReport } from './types';

export class ValidationError<T = any> extends Error {
  public status = 422;
  public fields: (keyof T)[];
  public errors: Record<keyof T, ErrorReport[]>;

  get message() {
    return JSON.stringify(
      this.fields.reduce((message, field) => {
        if (this.has(field)) {
          message[field] = this.errors[field];
        }

        return message;
      }, {} as Record<keyof T, ErrorReport[]>),
    );
  }

  constructor(fields: (keyof T)[]) {
    super();
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.fields = fields;
    this.errors = fields.reduce((errors, field) => {
      errors[field] = [];

      return errors;
    }, {} as Record<keyof T, ErrorReport[]>);
  }

  has(field: keyof T) {
    if (field && this.errors[field]) {
      return this.errors[field].length > 0;
    }

    throw new Error(`Invalid field ${field ? `"${field}"` : ''}`);
  }

  hasAny() {
    return this.fields.some((field) => this.has(field));
  }

  set(field: keyof T, report: ErrorReport) {
    if (this.errors[field]) {
      this.errors[field].push(report);
    }
  }

  get(field: keyof T) {
    if (field && this.errors[field]) {
      return this.errors[field];
    }

    throw new Error(`Invalid field${field ? ` "${field}"` : ''}`);
  }
}
