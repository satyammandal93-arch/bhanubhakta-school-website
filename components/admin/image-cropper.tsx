"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Check, Crop, ImagePlus, RotateCcw, X } from "lucide-react";

type ImageCropperProps = { aspect: number; onCropped: (file: File) => void };

export function ImageCropper({ aspect, onCropped }: ImageCropperProps) {
  const [source, setSource] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image.jpg");
  const [zoom, setZoom] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 4, height: 3 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => () => { if (source) URL.revokeObjectURL(source); }, [source]);
  function selectFile(event: ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (!file) return; if (source) URL.revokeObjectURL(source); setSource(URL.createObjectURL(file)); setFileName(file.name); setZoom(1); setPositionX(0); setPositionY(0); }
  function clear() { if (source) URL.revokeObjectURL(source); setSource(null); }
  const cropWidth = Math.min(imageSize.width / zoom, (imageSize.height / zoom) * aspect);
  const cropHeight = cropWidth / aspect;
  const cropWidthPercent = (cropWidth / imageSize.width) * 100;
  const cropHeightPercent = (cropHeight / imageSize.height) * 100;
  const cropLeftPercent = ((100 - cropWidthPercent) * (positionX + 1)) / 2;
  const cropTopPercent = ((100 - cropHeightPercent) * (positionY + 1)) / 2;

  function crop() {
    const image = imageRef.current; if (!image || !source) return;
    const imageWidth = image.naturalWidth; const imageHeight = image.naturalHeight;
    let cropWidth = imageWidth / zoom; let cropHeight = cropWidth / aspect;
    if (cropHeight > imageHeight / zoom) { cropHeight = imageHeight / zoom; cropWidth = cropHeight * aspect; }
    const sourceX = (imageWidth - cropWidth) * ((positionX + 1) / 2);
    const sourceY = (imageHeight - cropHeight) * ((positionY + 1) / 2);
    const canvas = document.createElement("canvas"); canvas.width = 1600; canvas.height = Math.round(1600 / aspect);
    const context = canvas.getContext("2d"); if (!context) return;
    context.drawImage(image, sourceX, sourceY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => { if (!blob) return; const output = new File([blob], fileName.replace(/\.[^.]+$/, "") + "-cropped.jpg", { type: "image/jpeg" }); onCropped(output); clear(); }, "image/jpeg", .9);
  }
  return <div className="image-cropper"><label className="crop-select"><ImagePlus size={16}/><span>{source ? "Choose another image" : "Choose image to crop"}</span><input type="file" accept="image/*" onChange={selectFile}/></label>{source && <div className="crop-workspace"><div><span className="crop-stage-label">Full image — move the outlined area to choose what will be kept</span><div className="crop-preview crop-full-image" style={{ aspectRatio: `${imageSize.width} / ${imageSize.height}` }}><img ref={imageRef} src={source} alt="Select the area to crop" onLoad={(event) => setImageSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}/><span className="crop-frame" style={{ width: `${cropWidthPercent}%`, height: `${cropHeightPercent}%`, left: `${cropLeftPercent}%`, top: `${cropTopPercent}%` }}><i/><b>Selected area</b></span></div></div><div className="crop-controls"><label>Zoom<input type="range" min="1" max="3" step="0.05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))}/></label><label>Move left / right<input type="range" min="-1" max="1" step="0.05" value={positionX} onChange={(event) => setPositionX(Number(event.target.value))}/></label><label>Move up / down<input type="range" min="-1" max="1" step="0.05" value={positionY} onChange={(event) => setPositionY(Number(event.target.value))}/></label></div><div className="crop-actions"><button type="button" className="outline-button" onClick={() => { setZoom(1); setPositionX(0); setPositionY(0); }}><RotateCcw size={14}/>Reset</button><button type="button" className="outline-button" onClick={clear}><X size={14}/>Cancel</button><button type="button" className="btn" onClick={crop}><Crop size={15}/>Crop & use image</button></div></div>}</div>;
}
