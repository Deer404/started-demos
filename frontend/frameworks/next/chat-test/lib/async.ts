export function awaitwrap<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, any]> {
  return promise
    .then<[T, null]>((data) => [data, null])
    .catch<[null, any]>((error) => [null, error]);
}
