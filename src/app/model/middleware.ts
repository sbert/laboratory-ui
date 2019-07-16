import { ArtifactInstance } from './artifact';

export class Middleware {

    type: string;
    name: string;
    versions: MiddlewareVersion[];

}

export class MiddlewareVersion {

    number: string;
    editor: string;
    middleware: Middleware;
    endOfSupport: Date;
    instances: MiddlewareInstance[];

    constructor(number: string, editor: string, middleware: Middleware, endOfSupport: Date) {
        this.number = number;
        this.editor = editor;
        this.middleware = middleware;
        this.endOfSupport = endOfSupport;
    }
}

export class MiddlewareInstance {

    middlewareVersion: MiddlewareVersion;
    artifactInstances: ArtifactInstance[];

    constructor(data: MiddlewareInstance) {
        this.middlewareVersion = new MiddlewareVersion(
            data.middlewareVersion.number,
            data.middlewareVersion.editor,
            data.middlewareVersion.middleware,
            new Date(data.middlewareVersion.endOfSupport)
        );
        this.artifactInstances = data.artifactInstances;
    }

}
