fn main() {
    // 创建一个字符串
    let mut original = String::from("Hello");

    // 不可变借用
    let len = calculate_length(&original);
    println!("The length of '{}' is {}.", original, len);

    // 可变借用
    change(&mut original);
    println!("After change: {}", original);

    // 多个不可变借用
    let r1 = &original;
    let r2 = &original;
    println!("r1: {}, r2: {}", r1, r2);

    // 不可变借用和可变借用不能同时存在
    // let r3 = &mut original; // 这行会导致编译错误
    // println!("r1: {}, r2: {}, r3: {}", r1, r2, r3);

    // 可变借用
    let r3 = &mut original;
    println!("r3: {}", r3);
}

// 接受不可变引用的函数
fn calculate_length(s: &String) -> usize {
    s.len()
}

// 接受可变引用的函数
fn change(s: &mut String) {
    s.push_str(", world");
}
