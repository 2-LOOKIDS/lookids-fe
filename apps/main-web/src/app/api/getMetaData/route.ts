'use server';

export const GET = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const exif = require('exif-js');
      if (e.target) {
        const data = exif.readFromBinaryFile(e.target.result);
        resolve(data);
      }
    };
    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsArrayBuffer(file);
    console.log('reader', reader);
  });
};
