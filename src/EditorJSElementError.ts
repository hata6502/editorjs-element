class EditorJSElementError extends Error {
  constructor(...args: any[]) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EditorJSElementError);
    }

    this.name = 'EditorJSElementError';
  }
}

export default EditorJSElementError;
