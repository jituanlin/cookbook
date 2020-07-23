import * as R from 'ramda';

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
      if (R.includes(event.key, [commandKey, controlKey, cKey])) {
        if (!R.includes(event.key, currentKeydownKeys)) {
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
