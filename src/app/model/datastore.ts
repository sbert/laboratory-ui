export class Datastore {

    type: string;
    name: string;

}

export class DatastoreVersion {

    number: string;
    datastore: Datastore;

}

export class DatastoreInstance {

    datastoreVersion: DatastoreVersion;

}
