export function validatePassword(password: string): boolean {
    const errors: string[] = [];
    const minLength = 8;

    if (password.length < minLength) {
        console.error(`Senha deve ter pelo menos ${minLength} caracteres.`);
        errors.push(`Senha deve ter pelo menos ${minLength} caracteres.`);
        return false;
    }
        return true;
    }