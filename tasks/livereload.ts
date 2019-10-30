import livereload, { livereloadServer } from 'livereload';

let server: livereloadServer;

export const createServer = function createLiveReloadServer() {
    server = livereload.createServer();
}

function refreshLiveReload() {
    if (!server) {
        return;
    }
    server.refresh('index.html')
}

export const refresh = refreshLiveReload;
