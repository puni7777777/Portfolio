"use client";

import StandaloneCadViewer from "./StandaloneCadViewer";

/**
 * Portable 3D CAD Viewer Modal Dialog Component
 * 
 * Props:
 * - isOpen (boolean): Controls modal visibility
 * - onClose (function): Callback when modal close button is clicked
 * - modelUrl (string): Direct URL to .stl, .step, .sldprt, .obj, .gltf file
 * - modelName (string): Display title of the model (e.g. "V6 Engine Block")
 */
export default function CadViewerModal({
  isOpen,
  onClose,
  modelUrl = "",
  modelName = "3D CAD Model",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#121215] border border-zinc-800 shadow-2xl overflow-hidden space-y-4 p-6 font-mono text-xs">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📦</span>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {modelName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800 text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 3D CAD Viewport */}
        <StandaloneCadViewer
          modelUrl={modelUrl}
          modelName={modelName}
          height="550px"
        />
      </div>
    </div>
  );
}
