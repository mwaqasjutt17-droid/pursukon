class ApiError extends Error {
    statusCode: number;
    errors: unknown[];
    success: boolean;

    constructor(
        statusCode: number,
        message: string = 'Something went wrong',
        errors: unknown[] = [],
        stack: string = ''
    ) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        this.name = 'ApiError';

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
