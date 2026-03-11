/**
 * Cloudinary Media Storage
 * Phase 12 - Product images, videos, avatars, viral clips
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "jimvio_unsigned";

export type ResourceType = "image" | "video" | "raw";

export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  }
): string {
  if (!CLOUD_NAME) return "";
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  const transforms: string[] = [];
  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.height) transforms.push(`h_${options.height}`);
  if (options?.crop) transforms.push(`c_${options.crop}`);
  if (options?.quality) transforms.push(`q_${options.quality}`);
  if (options?.format) transforms.push(`f_${options.format}`);
  const transformStr = transforms.length ? transforms.join(",") + "/" : "";
  return `${base}/${transformStr}${publicId}`;
}

export async function uploadToCloudinary(
  file: File | Blob,
  folder: string,
  resourceType: ResourceType = "image"
): Promise<{ url: string; publicId: string } | null> {
  if (!CLOUD_NAME) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.error) return null;
    return { url: data.secure_url, publicId: data.public_id };
  } catch {
    return null;
  }
}

export const CLOUDINARY_FOLDERS = {
  products: "jimvio/products",
  avatars: "jimvio/avatars",
  vendors: "jimvio/vendors",
  viralClips: "jimvio/viral-clips",
  communities: "jimvio/communities",
} as const;
