'use client';

import { useState } from 'react';

export default function BatchUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setCurrentFiles(files);
  };

  const addFiles = () => {
    if (currentFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...currentFiles]);
      setCurrentFiles([]);
      // Clear the input
      const fileInput = document.getElementById('file-input-batch') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadMessage(null);
    setUploadProgress(0);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    const ubuntuServerUrl = process.env.NEXT_PUBLIC_UBUNTU_SERVER_URL || 'http://localhost:3001/batchupload';

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', ubuntuServerUrl + '/batchupload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText);
          setUploadMessage(`Batch upload successful: ${result.filenames.join(', ')}`);
        } else {
          setUploadMessage(`Upload failed: ${xhr.statusText}`);
        }
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.onerror = () => {
        setUploadMessage('Upload failed: Network error');
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.send(formData);
    } catch (error) {
      setUploadMessage('Upload failed: Network error');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mt-3">
        <h1 className="text-3xl mb-3">Batch File Upload</h1>
        <div className="my-3 flex justify-center space-x-4">
          <input
            type="file"
            id="file-input-batch"
            multiple
            onChange={handleFileChange}
            className="bg-black px-4 py-3 outline-none text-white rounded-lg border-2 border-purple-500 transition-all duration-200 border-solid hover:border-purple-700 hover:shadow-lg focus:border-purple-700 focus:shadow-lg active:scale-95 active:shadow-inner cursor-pointer"
          />
          <button
            onClick={addFiles}
            disabled={currentFiles.length === 0}
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            Add Selected Files
          </button>
        </div>
        {selectedFiles.length > 0 && (
          <div className="my-3 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="border-2 p-1 rounded border-purple-500 text-xl hover:bg-purple-500 transition duration-300 ease-in-out disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Files`}
            </button>
          </div>
        )}
        {uploading && (
          <div className="my-3">
            <label htmlFor="upload-progress" className="block mb-1 font-medium text-gray-700">
              Upload Progress: {uploadProgress}%
            </label>
            <progress
              id="upload-progress"
              value={uploadProgress}
              max="100"
              className="w-full h-4 rounded bg-gray-200"
            />
          </div>
        )}
        {uploadMessage && (
          <div className="my-3 text-center">
            <p className="text-lg">{uploadMessage}</p>
          </div>
        )}
        {selectedFiles.length > 0 && (
          <div className="my-3">
            <h2 className="text-xl">Selected Files:</h2>
            <ul className="list-disc list-inside">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex justify-between py-2 items-center">
                  <span>{file.name} ({formatSize(file.size)})</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-4 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
