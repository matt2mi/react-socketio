import { Request, Response } from 'express';

export class BaseRoute {

    protected title: string;

    private scripts: string[];

    constructor() {
        // initialize variables
        this.title = 'Tour of Heros';
        this.scripts = [];
    }

    /**
     * Add a JS external file to the request.
     */
    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }

    /**
     * Render a page.
     */
    public render(req: Request, res: Response, filePath: string, options?: Object) {
        // add constants
        res.locals.BASE_URL = '/';

        // add scripts
        res.locals.scripts = this.scripts;

        // add title
        res.locals.title = this.title;

        // render view
        res.sendFile(filePath);
    }
}