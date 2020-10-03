import type {
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
