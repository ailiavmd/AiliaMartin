export interface Toast {
    id: number;
    type: 'success' | 'error' | 'loading',
    message: string;
}
