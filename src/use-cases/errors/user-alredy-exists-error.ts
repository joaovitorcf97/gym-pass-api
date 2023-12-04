export class UserAlredyExistsError extends Error {
  constructor() {
    super('E-mail already exists');
  }
}
