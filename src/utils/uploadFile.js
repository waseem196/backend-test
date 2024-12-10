const fs = require("fs");
const path = require("path");
exports.uploadFile = async (pictures) => {
  const picturePaths = [];

  // Decode and save Base64 images
  if (Array.isArray(pictures)) {
    for (const [index, base64String] of pictures.entries()) {
      // Extract the image format (e.g., png, jpg) from the Base64 string
      const match = base64String.match(/^data:image\/(png|jpg|jpeg);base64,/);
      if (!match) {
        return sendResponse(
          res,
          responseStatusCodes.BAD_REQUEST,
          "Invalid image format",
          false
        );
      }

      const extension = match[1]; // Get the file extension
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, ""); // Remove metadata

      const fileName = `${Date.now()}-${index}.${extension}`;
      const filePath = path.join(__dirname, "../../public/images", fileName);
      const savePath = `images/${fileName}`;

      // Write the file to the uploads directory
      fs.writeFileSync(filePath, base64Data, { encoding: "base64" });

      // Add the file path to the picturePaths array
      picturePaths.push(savePath);
      return picturePaths;
    }
  }
};
