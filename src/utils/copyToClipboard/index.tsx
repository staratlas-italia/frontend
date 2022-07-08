export const copyTextToClipboard = (text: string) => {
  if ("clipboard" in navigator) {
    return navigator.clipboard.writeText(text);
  } else {
    document.execCommand("copy", true, text);
    return Promise.resolve();
  }
};
