let DEBUG = true;

export const setDebug = (value) => { DEBUG = value; };

export const STYLE = {
    GROUP_TITLE : 'font-weight: bold; ',
    DEFAULT     : 'color: #4C6B75; ',
    WARN        : 'color: #EE6124; ',
    ERROR       : 'color: #A8193E; ',
    FATAL       : 'color: #FFFFFF; background-color: #A8193E; ',
    API         : 'color: #2EB88F; font-weight: bold; ',
    SOCKET      : 'color: #A37EF2; ',
};

export const log = (message, style = STYLE.DEFAULT, ...subMessages) => {
    logMessage(toStr(message), style, ...subMessages);
};

export const warn = (message, ...messages) => {
    logMessage('[WARN] ' + toStr(message), STYLE.WARN, ...messages);
};

export const error = (message, ...messages) => {
    logMessage('[ERROR] ' + toStr(message), STYLE.ERROR, ...messages);
};

export const fatal = (message, ...messages) => {
    logMessage('[FATAL] ' + toStr(message), STYLE.FATAL, ...messages);
};

const logMessage = (message, style = STYLE.DEFAULT, ...subMessages) => {
    if (!window.console || !DEBUG) return;
    // Log single or group
    if (!subMessages.length) {
        console.log('%c' + message, style);
    } else {
        console.group('%c' + message, style + STYLE.GROUP_TITLE);
        for (let subMessage of subMessages) {
            console.log('%c' + toStr(subMessage), style);
        }
        console.groupEnd();
    }
};

const toStr = (str) => {
    return (typeof str === 'object' || typeof str === 'array') ? JSON.stringify(str) : str;
};