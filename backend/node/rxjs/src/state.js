import { BehaviorSubject } from 'rxjs';

/**
 * 创建一个响应式信号
 * @template T
 * @param {T} initialState - 信号的初始值
 * @returns {{
 *   value: T,
 *   subscribe: function(observer: function(value: T): void): import('rxjs').Subscription
 * }}
 */
function createSignal(initialState) {

    // 使用 BehaviorSubject 来保存信号的当前值
    // BehaviorSubject 是 Subject的 变体，需要一个初始值，当有订阅时，会立即发送当前值
    const state$ = new BehaviorSubject(initialState);

    return {
        /**
         * 获取信号当前值
         * @returns {T}
         */
        get value() {
            return state$.getValue();
        },

        /**
         * 设置信号的新值
         * @param {T} newState - 要设置的新值
         */
        set value(newState) {
            state$.next(newState);
        },

        /**
         * 订阅信号值的变化
         * @param {function(T): void} observer - 当值变化时调用的回调函数
         * @returns {import('rxjs').Subscription} 订阅对象，可用于取消订阅
         */
        subscribe: (observer) => state$.subscribe(observer)
    };
}

// 使用示例
const count = createSignal(0);

console.log(count.value); // 0

// 订阅值的变化
count.subscribe(value => console.log('Count changed:', value));

// 修改值
count.value = 1;

// 读取当前值
console.log(count.value); // 1


