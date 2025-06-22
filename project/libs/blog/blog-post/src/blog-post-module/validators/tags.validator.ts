import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

const TAG_REGEXP = /^\p{L}.*$/u;

@ValidatorConstraint({ name: 'TagsValidator' })
export class TagsValidator implements ValidatorConstraintInterface {
  validate(values: string[] = []): boolean {
    if (values.length) {
      return values.every((value) => TAG_REGEXP.test(value));
    }
    return false;
  }
}
