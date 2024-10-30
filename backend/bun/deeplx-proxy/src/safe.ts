/**
 * 安全执行异步函数或Promise，并返回结果或错误
 * @param fn 要执行的异步函数或Promise
 * @returns 返回一个元组，包含错误（如果有）、结果（如果成功）和一个布尔值表示是否成功
 */
export async function safe<Result, Error = unknown>(
  fn: Promise<Result> | (() => Promise<Result>)
): Promise<[Error, undefined, false] | [undefined, Result, true]> {
  try {
    // 执行函数或等待Promise完成
    const result = await (typeof fn === "function" ? fn() : fn);
    // 如果成功，返回结果和成功标志
    return [undefined, result, true];
  } catch (error) {
    // 如果出错，返回错误和失败标志
    return [error as Error, undefined, false];
  }
}
