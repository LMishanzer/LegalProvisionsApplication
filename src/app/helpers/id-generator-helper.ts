export class IdGeneratorHelper {
    getIdFromText(text: string): string {
        return this.removeDiacritics(text).trim().replace(' ', '-').toLowerCase();
    }

    private removeDiacritics(text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}
