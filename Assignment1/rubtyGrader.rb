#Create Class Grader
class Grader
	def initialize(name, assignment, grade)
		@name = name
		@assignment = assignment
		@grade = grade
	end

#Output a valid grade
	def letterGrade()
		if @grade >= 90
			letGrade = "A"
		elsif @grade >= 80
			letGrade = "B"
		elsif @grade >= 70
			letGrade = "C"
		elsif @grade >= 60
			letGrade = "D"
		else
			letGrade = "F"
		end
		puts "Your Letter Grade is: " + letGrade
	end
end

#Request Name
puts "What is your name?"
inputName = gets
#Request Assignment Name
puts "What is the assignemt name?"
inputAssignment = gets
#Request grade in numbers
puts "What is your (numeric) grade for this assignment?"
inputGrade = gets.to_i

gradeAssignment = Grader.new(inputName, inputAssignment, inputGrade)
gradeAssignment.letterGrade()