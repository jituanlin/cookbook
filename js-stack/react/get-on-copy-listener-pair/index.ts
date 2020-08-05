/**
 * Following code is used to get the react listeners of copy event.
 * */
const commandKey = 'Meta' as const;
const controlKey = 'Control' as const;
const cKey = 'c' as const;

const getIsCopyKeyCodeSequence = (keys: string[]) =>
  (keys[0] === commandKey || keys[0] === controlKey) && keys[1] === cKey;

type CopyListenerPair = {
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
};

const getOnCopyListenerPair = (action: () => any): CopyListenerPair => {
  let currentKeydownKeys: string[] = [];

  return {
    onKeyDown: (event: KeyboardEvent) => {
      if ([commandKey, controlKey, cKey].includes(event.key as any)) {
        if (!currentKeydownKeys.includes(event.key)) {
          currentKeydownKeys.push(event.key);
        }
      }
    },
    onKeyUp: (event: KeyboardEvent) => {
      if (getIsCopyKeyCodeSequence(currentKeydownKeys)) {
        action();
        currentKeydownKeys = [];
      }
    },
  };
};

export default getOnCopyListenerPair;
