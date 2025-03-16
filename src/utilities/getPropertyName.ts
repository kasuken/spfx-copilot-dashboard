
/**
 * Retrieves the name of a property from a given object type.
 *
 * @template T - The type of the object containing the property.
 * @param {keyof T} property - The property whose name is to be retrieved.
 * @returns {string} The name of the property as a string.
 */
export default function getPropertyName<T>(property: keyof T): string {
  return property as string;
}