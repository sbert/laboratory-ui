export class Middleware {

    code: string;
    name: string;

}

export class MiddlewareVersion {

    number: string;
    editor: string;
    middleware: Middleware;

}

export class MiddlewareInstance {

    middlewareVersion: MiddlewareVersion;

}
