export class ContentTypeHelper {
    public static innerTypes: string[] = [
        'Odstavec',
        'Pododstavec',
        'Bod'
    ];

    public static isInnerType(type?: string): boolean {
        return this.innerTypes.includes(type || '');
    }
}
