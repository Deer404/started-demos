use rand::Rng;
use std::cmp::Ordering;
use std::io;

// 因为 ThreadRng 实现了 Rng trait，所以它可以使用 Rng trait 中定义的所有方法，包括 gen_range()。
// 所以，更准确地说，不是 thread_rng() 符合 gen_range 的函数要求，而是：
// 	•	thread_rng() 返回一个实现了 Rng trait 的类型（ThreadRng）。
// 	•	Rng trait 定义了 gen_range 方法。
// 	•	因为 ThreadRng 实现了 Rng trait，所以它可以调用 gen_range 方法。

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line!");
        let guess: u32 = guess.trim().parse().expect("Please type a number!");

        println!("You guessed: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
