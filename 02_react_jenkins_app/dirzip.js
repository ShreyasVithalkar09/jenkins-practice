import fs from 'fs';
import archiver from 'archiver';
import path from 'path';
import { fileURLToPath } from 'url';

// The path and url modules are used to get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createZipArchive() {
    return new Promise((resolve, reject) => {
    // The output file path
    const output = fs.createWriteStream(path.join(__dirname, 'dist.zip'));
    const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
    });

        // Listen for all archive data to be written
        output.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('Archiver has been finalized and the output file descriptor has closed.');
            resolve();
        });

        // Handle errors
        archive.on('error', function(err) {
            reject(err);
        });

        // Pipe archive data to the file
        archive.pipe(output);

        // Append the entire 'build' directory
        archive.directory('build/', false);

        // Finalize the archive (this will close the output stream)
        archive.finalize();
    });

}

// Run the async function
createZipArchive()
.then(() => {
console.log("Zip file created successfully. Exiting now.");
process.exit(0);
})
.catch((err) => {
console.error("Error creating zip file:", err);
process.exit(1);
});