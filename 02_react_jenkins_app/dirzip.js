import path from "path";
import { exec } from "child_process";

const directoryPathToZip = 'dist'; // Replace with the actual directory to zip
const zipFileName = 'dist.zip'; // Desired name for the zip file

// Construct the command to zip the directory recursively
// The '-r' flag ensures recursive zipping of the directory's contents
const command = `zip -r ${zipFileName} ${directoryPathToZip}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error zipping directory: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Directory "${directoryPathToZip}" successfully zipped to "${zipFileName}".`);
});
