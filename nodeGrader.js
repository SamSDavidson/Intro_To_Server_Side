var fs = require('fs');

class Grader{
	constructor(){}

	letterGrader(){
		let letterGrade = "";
		if (this.grade >= 90){
			letterGrade = "A"
		}
		else if(this.grade >= 80){
			letterGrade = "B"
		}
		else if (this.grade >= 70){
			letterGrade = "C"
		}
		else if (this.grade >= 60){
			letterGrade = "D"
		}
		else if (this.grade < 60){
			letterGrade = "F"
		}
		else{
			console.log("Invalid Input")
		}
		console.log("Your letter grade is: " + letterGrade)
	}
}
const readline = require("readline");

const rl = readline.createInterface({
	input : process.stdin,
	output:process.stdout
})
let gradeSelector = new Grader()
rl.question("What is your name?: ",(name)=>{
	gradeSelector.name = name;
	rl.question("What is the assignment name?: ",(assignment)=>{
		gradeSelector.assignment = assignment;
		rl.question("What is your grade?: ", (grade)=>{
			gradeSelector.grade = grade;
			
			gradeSelector.letterGrader();
		
			rl.close();
		})
	})
})



