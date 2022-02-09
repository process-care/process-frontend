export type UnsafeEntity<T> = {
  id?: string | null | undefined;
  attributes?: T | null | undefined;
};

export type SafeEntity<T> = { id: string; attributes: T };

/**
 * Check if an entity has `id` and `attributes` properties.
 * This function allows to safe guard the entity type.
 * @param o 
 * @returns 
 */
export function hasAttributes<T>(o: UnsafeEntity<T> | null | undefined): o is SafeEntity<T> {
  return Boolean(o?.id) && Boolean(o?.attributes);
}

/**
 * Give an array of entities, returns an array containing only the entities
 * with `attributes` and `id (aka 'safe entities').
 * @param entities 
 * @returns 
 */
export function sanitizeEntities<T>(
  entities: UnsafeEntity<T>[] | undefined
): SafeEntity<T>[] {
  if (!entities) return [];

  const sanitized = entities.reduce((acc, e) => {
    if (hasAttributes(e)) acc.push(e);
    return acc;
  }, [] as SafeEntity<T>[]);

  return sanitized;
}

/**
 * Return the given entity as a 'safe entity' (with `id` & `attributes`), to safe guard its type.
 * Returns undefined if the entity lacks any.
 * @param entity 
 * @returns 
 */
export function sanitizeEntity<T>(entity: UnsafeEntity<T> | null | undefined): SafeEntity<T> {
  if (!hasAttributes(entity)) return { id: "", attributes: {} as T };
  return {
    id: entity.id,
    attributes: entity.attributes,
  };
}
