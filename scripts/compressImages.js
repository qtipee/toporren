const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');

// List of directories to apply compression on their images
const DIRECTORIES_TO_COMPRESS = [
    './public/images',
    './public/images/archives',
    './public/images/brochure',
    './public/images/news',
    './public/images/support',
];

// List of directories to resize their images
const DIRECTORIES_TO_RESIZE = {
    './public/images/archives': { width: 150, height: 200 },
    './public/images/news': { width: 425, height: 340 },
    './public/images/support': { width: 110, height: 70 },
};

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
            } catch (err) {
                console.error(`Error processing ${filePath}:`, err);
            }
        }
    }
};

/**
 * Resize the images in the directory.
 * @param {string} dir 
 * @param {number} width 
 * @param {number} height 
 */
const resizeImages = async (dir, width, height) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        // Resize formats: .jpg, .jpeg or .png
        if (/\.(jpe?g|png)$/i.test(file)) {
            console.log(`Checking dimensions for: ${filePath}`);
            try {
                const sharpInstance = sharp(filePath);
                const metadata = await sharpInstance.metadata();

                if (metadata.width !== width || metadata.height !== height) {
                    console.log(`Resizing ${filePath} to ${width}x${height}`);

                    // Generate a temporary file path
                    const tempFilePath = path.join(
                        os.tmpdir(),
                        `temp-${Date.now()}-${file}`
                    );

                    // Resize and save to the temporary file
                    await sharpInstance
                        .resize(width, height)
                        .toFile(tempFilePath);

                    // Replace the original file with the resized image
                    fs.renameSync(tempFilePath, filePath);
                } else {
                    console.log(`Skipping resize for ${filePath} (already ${width}x${height})`);
                }
            } catch (err) {
                console.error(`Error processing ${filePath}:`, err);
            }
        }
    }
};

/**
 * Script main entry.
 * Resize the images in each of the directory
 * from the DIRECTORIES_TO_RESIZE list and
 * compress the images in each of the directory
 * from the DIRECTORIES_TO_COMPRESS list and
 */
async function main() {
    try {
        // Resize images
        console.log('Start resizing images...');
        for (const [dir, size] of Object.entries(DIRECTORIES_TO_RESIZE)) {
            await resizeImages(dir, size.width, size.height);
        }
        console.log('Images were resized!');

        // Compress images
        console.log('Start compressing images...');
        for (const dir of DIRECTORIES_TO_COMPRESS) {
            await compressImages(dir);
        }
        console.log('Images were compressed!');
    } catch (err) {
        console.log(`An error occurred: ${err}`);
    }
}

main();
