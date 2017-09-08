export function nows(strings: TemplateStringsArray) {
  return strings.raw[0].replace(/\s+/g, ' ').trim();
}

export type Messages = { [key: string]: string };

export function addMissingMessagesFrom(translation: Messages,
                                       ...fallbackTranslations: Messages[]): Messages {
  return Object.assign({}, translation, ...fallbackTranslations.map(fallbackTranslation =>
    Object.keys(fallbackTranslation).reduce(
      (missingMessages: Messages, messageId: string) => {
        if (!translation.hasOwnProperty(messageId)) {
          missingMessages[messageId] = fallbackTranslation[messageId];
        }

        return missingMessages;
      },
      {}
    )
  ));
}
