import type IframeWindow from './IframeWindow';
import EditorJSInlineError from './EditorJSInlineError';

class EditorJSInlineElement extends HTMLElement {
  #iframe?: HTMLIFrameElement;

  closeToolbars() {
    const iframeWorkerWindow = this.#iframe.contentWindow as IframeWindow;

    iframeWorkerWindow.editorJSInline.closeToolbars();
  }

  connectedCallback() {
    this.#iframe.addEventListener('load', () => {
      if (!this.#iframe?.contentWindow) {
        throw new EditorJSInlineError();
      }

      const iframeWorkerWindow = this.#iframe.contentWindow as IframeWindow;

      iframeWorkerWindow.editorJSInline.load({
        id,
      });
    });
  }
}

export default EditorJSInlineElement;
