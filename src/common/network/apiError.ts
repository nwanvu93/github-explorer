export class ApiError extends Error {
  static Types = {
    NETWORK: 'NETWORK',
    DATA: 'DATA',
    UNKNOWN: 'UNKNOWN',
  } as const;

  type: typeof ApiError.Types[keyof typeof ApiError.Types];

  constructor(message: string, type: typeof ApiError.Types[keyof typeof ApiError.Types]) {
    super(message);
    this.type = type;
    this.name = 'ApiError';
  }

  static network(message = 'No network connection!'): ApiError {
    return new ApiError(message, ApiError.Types.NETWORK);
  }

  static data(message = 'Data error occurred'): ApiError {
    return new ApiError(message, ApiError.Types.DATA);
  }

  static unknown(message = 'Unknown error occurred'): ApiError {
    return new ApiError(message, ApiError.Types.UNKNOWN);
  }
}