export default interface ValidationResult {
    type: string,
    title: string,
    status: number,
    errors: { [key: string]: string }
}