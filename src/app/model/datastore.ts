export class Datastore {

    type: string;
    name: string;
    versions: DatastoreVersion[];

}

export class DatastoreVersion {

    number: string;
    datastore: Datastore;
    endOfSupport: Date;
    instances: DatastoreInstance;

    constructor(number: string, datastore: Datastore, endOfSupport: Date) {
        this.number = number;
        this.datastore = datastore;
        this.endOfSupport = endOfSupport;

    }
}

export class DatastoreInstance {

    datastoreVersion: DatastoreVersion;

    constructor(data: DatastoreInstance) {
        this.datastoreVersion = new DatastoreVersion(
            data.datastoreVersion.number,
            data.datastoreVersion.datastore,
            new Date(data.datastoreVersion.endOfSupport),
        );
    }

}
