import AIFileObject from "../../../models/AIFileObject";

export function buildFileUrl(file?: AIFileObject): string {
  if (!file) {
      return '';
  }

  const regex = /sharepoint.com((\/.*)\/(.*))/i;
  const match = file.DefaultEncodingUrl.match(regex);
  if(!match) return '';

  const url = new URL(file.ParentLink);
  url.searchParams.append('id', match[1].replace('.', '%2E'));
  url.searchParams.append('parent', match[2]);

  const sanitizedUrl = decodeURIComponent(url.toString());
  return sanitizedUrl;
}
