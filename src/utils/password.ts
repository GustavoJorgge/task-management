import { PasswordValidationResult } from './password.validator';

const MIN_LENGTH = 8;

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];
  
  if (password.length < MIN_LENGTH) {
    errors.push(`A senha deve ter pelo menos ${MIN_LENGTH} caracteres.`);
    return { isValid: false, errors };
  }

  return { isValid: true, errors };
}