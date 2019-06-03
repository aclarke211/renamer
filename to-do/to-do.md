# To-Do [Renamer]

## Steps

- Rename files seems to rename the folder aswell?

- Set max numberof files to be processed at **100**.

- Radio buttons for file type in options container
  (default to video option for now as they are the only file types supported).

- Confirm option when clicking **revert button**

- Style.

## Nice to Have

- Update **Modal** to have CreateModal(), UpdateModal()/AddToModal() methods etc.

- Update method in **main.js** to use Async function from CodePen example I wrote last week.

- Small Icon for multi files container, when hovered show **help tool-top** to identify how to
  copy files in from Excel.

- Refactor server method to take a **payload object** which can contain multiple types of data.

- Generate video thumbnail (.gif) for found files.

  - Thumbnails will be stored in a directory within the app.
  - This directory will need to be cleaned on each run to remove old/unneeded thumbnails.

## Bugs

- If a folder name as a quote mark in the word, i.e. Word's, then the folder name is calculated as just 'Word' as it is being trimmed to between the first and second occurances of the " **'** " <sup>(single quote)</sup> mark.

- When reverting files, the message saying 'Revert Complete' (in modal), appears before all files
  have actually been reverted.

- Possibly, still not always deleting parent folder (on Mac) after reverting.
