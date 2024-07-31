export class Person implements IPerson {

    constructor(
        public document_id: string,
        public name: string,
        public lastname: string,
        public profession: string,
        public imageUrl: string,
        public description: string
    ) { }

    toString(): string {
        return 'document_id: ' + this.document_id + '\n' +
            'name: ' + this.name + '\n' +
            'lastname: ' + this.lastname + '\n' +
            'profession: ' + this.profession + '\n' +
            'imageUrl: ' + this.imageUrl + '\n' +
            'description: '+this.description + '\n';
    }
}

export interface IPerson {
    document_id: string;
    name: string;
    lastname: string;
    profession: string;
    imageUrl: string;
    description: string
}