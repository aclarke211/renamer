# To-Do [Renamer]

## Steps

- Set max numberof files to be processed at **100**.

- Confirm option when clicking **revert button**

- Style.

## Nice to Have

- Small Icon for multi files container, when hovered show **help tool-top** to identify how to copy files in from Excel.

- Refactor server method to take a **payload object** which can contain multiple types of data.

- Generate video thumbnail (.gif) for found files.

  - Thumbnails will be stored in a directory within the app.
  - This directory will need to be cleaned on each run to remove old/unneeded thumbnails.

## Bugs

- When a folder is named, if the filename contains " **'** " in a word (i.e. **Renamer's Example**), the returned folder name stops before the quote mark, so the folder name would be set as **Renamer**. <br> ***[ - Has possibly been fixed by escaping the single quote mark when determining a folders name. ]***

- When reverting files, the message saying 'Revert Complete' (in modal), appears before all files have actually been reverted.

- Possibly, still not always deleted parent folder (on Mac) after reverting.

- (Found On: Windows) Folder name sometimes has comma and a space at the end and does not seem to exist, but still shows in Windows Explorer (the file cannot be deleted, as it cannot be found.)

  - i.e.
    ^^Folder Name,
