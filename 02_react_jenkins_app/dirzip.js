import fs from 'fs';
import archiver from 'archiver';
import path from 'path';
import { fileURLToPath } from 'url';

// The path and url modules are used to get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The output file path
const output = fs.createWriteStream(path.join(__dirname, 'dist.zip'));
const archive = archiver('zip', {
zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
console.log(archive.pointer() + ' total bytes');
console.log('Archiver has been finalized and the output file descriptor has closed.');
});

// Handle errors
archive.on('error', function(err) {
throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append the entire 'build' directory
archive.directory('build/', false);

// Finalize the archive (this will close the output stream)
archive.finalize();
