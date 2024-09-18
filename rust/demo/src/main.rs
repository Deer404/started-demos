macro_rules! create_function {
    ($func_name:ident) => {
        fn $func_name() {
            println!("You called {:?}()", stringify!($func_name));
        }
    };
}

// 使用宏来创建函数
create_function!(foo);
create_function!(bar);

fn ccc() {
    println!("You called ccc()");
}

fn main() {
    foo();
    bar();
    ccc();
}
