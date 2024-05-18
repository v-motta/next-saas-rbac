export class UnauthorizationError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unauthorized.')
  }
}
