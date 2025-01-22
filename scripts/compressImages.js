const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// List of directories to apply compression on their images
const DIRECTORIES = [
    './public/images',
    './public/images/archives',
    './public/images/brochure',
    './public/images/news',
    './public/images/support',
];

/**
 * Compress the images in the directory.
 * @param {string} dir 
 */
const compressImages = async (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        // Skip files that already start with 'compressed-'
        if (file.startsWith('compressed-')) {
            console.log(`Skipping already compressed file: ${filePath}`);
            continue;
        }
        
        // Compress formats: .jpg, .jpeg or .png
        if (/\.(jpe?g|png)$/i.test(file)) {
            console.log(`Compressing ${filePath}`);
            try {
                const sharpInstance = sharp(filePath);

                /*
                if (resize) {
                    await sharpInstance
                        .resize({ width: 1200 })
                        .toFile(filePath);
                }
                 */
                
                // Compressed file name
                const compressedFilePath = path.join(
                    path.dirname(filePath),
                    `compressed-${path.basename(filePath)}`
                );

                // Compress image
                await sharpInstance
                    .jpeg({ quality: 2 }) // For JPEG, adjust quality (1-100)
                    .png({ compressionLevel: 9 }) // For PNG, adjust compression (0-9)
                    .toFile(compressedFilePath);

                // Compare file sizes
                const originalSize = fs.statSync(filePath).size;
                const compressedSize = fs.statSync(compressedFilePath).size;

                console.log(`Original Size: ${originalSize} bytes`);
                console.log(`Compressed Size: ${compressedSize} bytes`);

                if (compressedSize < originalSize) {
                    // Delete the original file
                    console.log(`Keeping compressed file: ${compressedFilePath}`);
                    fs.unlinkSync(filePath);
                } else {
                    // Rename the original file to include the 'compressed-' prefix
                    const renamedFilePath = path.join(
                        path.dirname(filePath),
                        `compressed-${path.basename(filePath)}`
                    );

                    // Rename the file
                    console.log(`Original file is smaller. Renaming to: ${renamedFilePath}`);
                    fs.renameSync(filePath, renamedFilePath);
                }
            } catch (error) {
                console.error(`Error processing ${filePath}:`, error);
            }
        }
    }
};

/**
 * Script main entry.
 * Compress the images in each of the directory
 * from the DIRECTORIES list.
 */
function main() {
    for (const dir of DIRECTORIES) {
        compressImages(dir)
            .then(() => console.log(`Compressed images in: ${dir}`))
            .catch((err) => console.error(err));
    }
}

main();
