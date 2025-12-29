export function createError(message, details = {}) {
    return {
        message,
        details,
        timestamp: Date.now(),
    };
}

export function logError(error) {
    console.error(
        `%c[APP ERROR] ${error.message}`,
        "color: red; font-weight: bold;",
        error.details
    );
}

export function handleError(message, details = {}) {
    const error = createError(message, details);
    logError(error);
    return error;
}