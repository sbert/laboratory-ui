import { ArtifactInstance } from './artifact';
import { Server } from './server';

export class Datastore {

    id: number;
    type: string;
    name: string;
    versions: DatastoreVersion[];

}

export class DatastoreVersion {

    id: number;
    number: string;
    datastore: Datastore;
    endOfSupport: Date;
    instances: DatastoreInstance[];

    search: string;

    constructor(id: number, number: string, datastore: Datastore, endOfSupport: Date) {
        this.id = id;
        this.number = number;
        this.datastore = datastore;
        this.endOfSupport = endOfSupport;

    }
}

export class DatastoreInstance {

    datastoreVersion: DatastoreVersion;
    artifactInstances: ArtifactInstance[];
    server: Server;

    constructor(data: DatastoreInstance) {
        this.datastoreVersion = new DatastoreVersion(
            data.datastoreVersion.id,
            data.datastoreVersion.number,
            data.datastoreVersion.datastore,
            new Date(data.datastoreVersion.endOfSupport),
        );
        this.artifactInstances = data.artifactInstances;
    }

}
