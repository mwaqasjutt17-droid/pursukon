class ApiResponse<T = unknown> {
    statusCode: number;
    message: string;
    data: T;
    success: boolean;
    name: string;

    constructor(
        statusCode: number,
        data: T,
        message: string = 'Success'
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
        this.name = 'ApiResponse';
    }
}

export default ApiResponse;
