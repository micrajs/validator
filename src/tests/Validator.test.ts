import { validate } from '../validate';
import { required, isString, makeMockRule, optional } from './rules';

describe('Validator tests', () => {
  interface User {
    id: string;
    name?: string;
  }

  it('should run all rules of a given field', () => {
    const idRule = makeMockRule<User>();
    const nameRule = makeMockRule<User>();

    validate<User>({ id: '123' }, {
      id: [idRule],
      name: [nameRule],
    });

    expect(idRule.check).toHaveBeenCalled();
    expect(nameRule.check).toHaveBeenCalled();
  });

  it('should return the DTO and not contain any errors', () => {
    const data = {
      field: '123',
      a: 123,
    };

    const [DTO, error] = validate<{ field: string }>(data, {
      field: [required, isString],
    });

    expect(error.hasAny()).toBeFalsy();
    expect(DTO.field).toBe(data.field);
    expect((DTO as typeof data).a).toBeUndefined();
  });
});
