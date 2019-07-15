export class Middleware {

    code: string;
    type: string;

}

export class MiddlewareVersion {

    number: string;
    editor: string;
    middleware: Middleware;
    endOfSupport: Date;

    constructor(number: string, editor: string, middleware: Middleware, endOfSupport: Date) {
        this.number = number;
        this.editor = editor;
        this.middleware = middleware;
        this.endOfSupport = endOfSupport;
    }
}

export class MiddlewareInstance {

    middlewareVersion: MiddlewareVersion;

    constructor(data: MiddlewareInstance) {
        this.middlewareVersion = new MiddlewareVersion(
            data.middlewareVersion.number,
            data.middlewareVersion.editor,
            data.middlewareVersion.middleware,
            new Date(data.middlewareVersion.endOfSupport),
        );
    }

}
