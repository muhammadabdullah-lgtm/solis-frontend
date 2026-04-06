export class ApiError extends Error {
  readonly errors: string[];
  readonly status: number;

  constructor(message: string, errors: string[], status: number) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    this.status = status;
  }
}
