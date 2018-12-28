# To-Do [Renamer]

## Steps

- Rename single file in server after being passed all files from client.

- Revert button after renaming:

  - (Option to revert all or select certain files via checkboxes).

- Third accordian to search for files in a directory and sort them into folders based on tags in filenames.
  - Need to use **fs.stat** or similar to get the filetype of each file read.

## Nice to Have

- Generate video thumbnail (.gif) for found files.

  - Thumbnails will be stored in a directory within the app.
  - This directory will need to be cleaned on each run to remove old/unneeded thumbnails.

- Small Icon for multi files container, when hovered show help tool-top to identify how to copy files in from Excel.
