export interface CustomResponse<T = unknown> {
    success: boolean;
    data?: T | Record<string, unknown>;
    message?: string
}