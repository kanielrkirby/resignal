export type Attachment = {
  contentType: string;
  size: number;
  flags: number;
  width: number;
  height: number;
  blurHash: string;
  uploadTimestamp: number;
  cdnNumber: number;
  cdnKey: string;
  path: string;
  thumbnail: {
    path: string;
    contentType: string;
    width: number;
    height: number;
  };
  url?: string;
}
