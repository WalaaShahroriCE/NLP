// src/client/js/nameChecker.js

export function checkForURL(inputURL) {
  // Regular expression for validating URLs
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i;
  return urlRegex.test(inputURL);
}
