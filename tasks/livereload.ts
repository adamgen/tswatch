import livereload, { livereloadServer } from 'livereload';

let server: livereloadServer;

export const createServer = function createLiveReloadServer() {
    server = livereload.createServer();
}

export const refresh = function refreshLiveReload() {
    if (!server) {
        return;
    }
    server.refresh('index.html')
}
