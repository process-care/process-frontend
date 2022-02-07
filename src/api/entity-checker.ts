export type UnsafeEntity<T> = {
  id?: string | null | undefined;
  attributes?: T | null | undefined;
};

export type SafeEntity<T> = { id: string; attributes: T };

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

export function hasAttributes<T>(o: UnsafeEntity<T>): o is SafeEntity<T> {
  return Boolean(o.id) && Boolean(o.attributes);
}

export function sanitizeEntity<T>(entity: UnsafeEntity<T>): SafeEntity<T> {
  if (!hasAttributes(entity)) return { id: "", attributes: {} as T };
  return {
    id: entity.id,
    attributes: entity.attributes,
  };
}
