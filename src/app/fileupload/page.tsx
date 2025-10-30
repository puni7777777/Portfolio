'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [labelText, setLabelText] = useState('Choose File');

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setLabelText(file.name);
      setFileContent(null);
      setImageSrc(null);
      setVideoSrc(null);
      setUploadMessage(null);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        setVideoSrc(URL.createObjectURL(file));
      } else if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileContent(e.target?.result as string);
        };
        reader.readAsText(file);
      } else {
        setFileContent(`File selected: ${file.name} (${file.size} bytes)`);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadMessage(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadMessage(`Upload successful: ${result.filename}`);
      } else {
        setUploadMessage(`Upload failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setUploadMessage('Upload failed: Network error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const resetFileInput = () => {
    setSelectedFile(null);
    setLabelText('Choose File');
    setFileContent(null);
    setImageSrc(null);
    setVideoSrc(null);
    setUploadMessage(null);
    const fileInput = document.getElementById('file-input') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mt-3">
        <h1 className="text-3xl mb-3">File Upload</h1>
        <div className="my-3 flex justify-center">
          <Link href="/batchupload">
            <button className="bg-black px-4 py-3 outline-none text-white rounded-lg border-2 border-purple-500 transition-all duration-200 border-solid hover:border-purple-700 hover:shadow-lg focus:border-purple-700 focus:shadow-lg active:scale-95 active:shadow-inner cursor-pointer">
              Go to Batch Upload
            </button>
          </Link>
        </div>
        <div className="my-3 flex justify-center space-x-4">
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-input"
            className="bg-black px-4 py-3 outline-none text-white rounded-lg border-2 border-purple-500 transition-all duration-200 border-solid hover:border-purple-700 hover:shadow-lg focus:border-purple-700 focus:shadow-lg active:scale-95 active:shadow-inner cursor-pointer"
          >
            {labelText}
          </label>
          {selectedFile && (
            <button
              onClick={resetFileInput}
              className="border-2 border-red-700 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Reset
            </button>
          )}
        </div>
        {selectedFile && (
          <div className="my-3 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="border-2 p-1 rounded border-purple-500 text-xl hover:bg-purple-500 transition duration-300 ease-in-out disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
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
        {selectedFile && (
          <div className="my-3">
            <h2 className="text-xl">File Info:</h2>
            <p>Name: {selectedFile.name}</p>
            <p>Size: {formatSize(selectedFile.size)}</p>
            <p>Type: {selectedFile.type}</p>
          </div>
        )}
        {imageSrc && (
          <div className="my-3">
            <h2 className="text-xl">Image Preview:</h2>
            <img src={imageSrc} alt="Uploaded" className="max-w-full h-auto" />
          </div>
        )}
        {videoSrc && (
          <div className="my-3">
            <h2 className="text-xl">Video Preview:</h2>
            <video src={videoSrc} controls className="max-w-full h-auto" />
          </div>
        )}
        {fileContent && (
          <div className="my-3">
            <h2 className="text-xl">File Content:</h2>
            <textarea
              value={fileContent}
              readOnly
              className="w-3/4 my-3 bg-black px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-purple-500 border-gray-700"
              rows={10}
            />
          </div>
        )}
      </div>
    </div>
  );
}
