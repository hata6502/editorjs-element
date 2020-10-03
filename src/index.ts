import debounce from 'debounce';
import EditorJS from '@editorjs/editorjs';
import type {OutputData} from '@editorjs/editorjs';

/*import type IframeWindow from './IframeWindow';
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

export default EditorJSInlineElement;*/

/*import type {
  InlineTool,
} from '@editorjs/editorjs';
import EditorJSInlineElement from './EditorJSInlineElement';
import type MessageData from './MessageData';
import type { MutatedMessageData, SavedMessageData } from './MessageData';

class EditorJSInline implements InlineTool {
  render() {
    setTimeout(() => {
      document.addEventListener('pointerdown', () => {
        codexEditor
          .querySelectorAll('editorjs-inline')
          .forEach((element) =>
            (element as EditorJSInlineElement).closeToolbars()
          );
      });

      window.addEventListener(
        'message',
        (event) => {
          const messageData: MessageData = event.data;

          if (
            typeof messageData !== 'object' ||
            !('editorJSInline' in messageData)
          ) {
            return;
          }

          const editorJSInline = codexEditor.querySelector(
            `editorjs-inline[data-id="${messageData.id}"]`
          ) as EditorJSInlineElement | null;

          const action = {
            mutated: () => {
              if (!editorJSInline) {
                return;
              }

              const { scrollHeight } = messageData as MutatedMessageData;

              editorJSInline.setHeight({ height: `${scrollHeight}px` });
            },
            pointerdown: () => {
              codexEditor
                .querySelectorAll(
                  `editorjs-inline:not([data-id="${messageData.id}"])`
                )
                .forEach((element) =>
                  (element as EditorJSInlineElement).closeToolbars()
                );
            },
            saved: () => {
              if (!editorJSInline) {
                return;
              }

              const { outputData } = messageData as SavedMessageData;

              editorJSInline.dataset.output = JSON.stringify(outputData);
            },
          }[messageData.type];

          typeof action === 'function' && action(); // lgtm [js/unvalidated-dynamic-method-call]
        },
        false
      );
    });

    return button;
  }
}
*/
interface IframeWindow extends Window {
  editorJSElement: {
    closeToolbars: () => void;
    load: (arg: {
      id: string;
    }) => void;
  };
}

declare const window: IframeWindow;

interface EditorJSElementMessageData {
  editorJSElement: true;
  id: string;
}

interface MutatedMessageData extends EditorJSElementMessageData {
  type: 'mutated';
  scrollHeight: number;
}

interface PointerdownMessageData extends EditorJSElementMessageData {
  type: 'pointerdown';
}

interface SavedMessageData extends EditorJSElementMessageData {
  type: 'saved';
  outputData: OutputData;
}

type MessageData =
  | MutatedMessageData
  | PointerdownMessageData
  | SavedMessageData
  | object
  | undefined;

let editorJS: EditorJS;

window.editorJSElement = {
  closeToolbars: () => {
    editorJS.inlineToolbar.close();
    editorJS.toolbar.close();
  },
  load: ({ id }) => {
    const holder = document.createElement('div');

    document.body.appendChild(holder);

    editorJS = new EditorJS({
      holder,
      onChange: async () => {
        const outputData = await editorJS.save();
        const savedMessageData: SavedMessageData = {
          editorJSElement: true,
          id,
          type: 'saved',
          outputData,
        };

        window.parent.postMessage(savedMessageData, '*');
      },
    });

    const mutationObserver = new MutationObserver(
      debounce(() => {
        const lefts: number[] = [];
        const tops: number[] = [];

        document.body.querySelectorAll('*').forEach((element) => {
          const rect = element.getBoundingClientRect();

          lefts.push(rect.left);
          tops.push(rect.top);
        });

        const minLeft = Math.min(0, ...lefts);

        document.body.style.marginLeft = `${-minLeft}px`;
        document.body.style.marginTop = `${-Math.min(0, ...tops)}px`;

        if (minLeft >= 0) {
          document.body.style.marginLeft = `${
            document.body.offsetWidth - document.body.scrollWidth
          }px`;
        }

        const mutatedMessageData: MutatedMessageData = {
          editorJSElement: true,
          id,
          type: 'mutated',
          scrollHeight: document.body.scrollHeight,
        };

        window.parent.postMessage(mutatedMessageData, '*');
      })
    );

    mutationObserver.observe(holder, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });

    document.addEventListener('pointerdown', () => {
      const pointerdownMessageData: PointerdownMessageData = {
        editorJSElement: true,
        id,
        type: 'pointerdown',
      };

      window.parent.postMessage(pointerdownMessageData, '*');
    });
  },
};

export type {IframeWindow, MessageData, MutatedMessageData, PointerdownMessageData, SavedMessageData};
