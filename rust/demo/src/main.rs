use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    const TARGET: i32 = 42;

    loop {
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess = guess.trim();

        if guess.is_empty() {
            println!("Please enter a valid number!");
            continue;
        }

        // let guess: i32 = match guess.parse() {
        //     Ok(num) => num,
        //     Err(_) => {
        //         println!("Invalid input! Please enter a valid number.");
        //         continue;
        //     }
        // };

        if guess.parse() < TARGET {
            println!("Too small!");
        } else if guess > TARGET {
            println!("Too big!");
        } else {
            println!("You guessed it!");
            break;
        }
    }

    println!("You guessed: {}", guess);
}
