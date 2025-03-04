export default function getPropertyName<T>(property: keyof T): string {
  return property as string;
}