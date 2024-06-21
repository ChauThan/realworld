export class StorageService {
    get(key: string): any {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    update(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}