export const selectLocalImage = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        resolve(file);
      } else {
        reject("No file selected");
      }
    };

    input.onerror = () => {
      reject("File selection failed");
    };
  });
};
