/**
 *
 * @param text - Represent text to copy
 */
export const copyTextToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    return await navigator.clipboard.writeText(text)
  }
  //TODO: Define fallback for versions of chrome that don't support navigator.clipboard
}
