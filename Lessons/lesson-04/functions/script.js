let grade = 4.99;

if (grade >= 4) {
    console.log("You passed the course!");
}
else {
    console.log("Sorry you didn't pass...");
}


if (grade == 6) {
    console.log("Excellent");
}
else if (grade >= 5 && grade < 6) {
    console.log("Good");
}
else if (grade >= 4 && grade <5) {
    console.log("Sufficient");
}
else if (grade > 6 || grade < 1){
    console.log("That's not possible")
}
else {
    console.log("Insufficient");
}

let number = 0;

for(let number = 0; number < 10; number++) {
    console.log(number);   
}

const cats = ["Leopard", "Jaguar", "Tiger", "Lion"];

for (let id = 0; id < cats.length; id++) {
    console.log(cats[id]);
}
