class Grader:
	def __init__(self, name, assignment, grade):
		self.name = name
		self.assignment = assignment
		self.grade = grade
	def letterGrader(self):
		if self.grade >= 90:
			letGrade = "A"
		elif self.grade >= 80:
			letGrade = "B"
		elif self.grade >= 70:
			letGrade = "C"
		elif self.grade >= 60:
			letGrade = "D"
		else:
			letGrade = "F"
		print("Your letter grade is: " + letGrade)

name = raw_input("What is your name?")
assignment = raw_input("What is the assignment name?")
grade = float(raw_input("What is the (numeric) grade on the assignment?"))

gradeAssignment = Grader(name, assignment, grade)
gradeAssignment.letterGrader() 