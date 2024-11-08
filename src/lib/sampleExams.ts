import { Exam } from './types';

export const sampleExams: Exam[] = [
  {
    id: "1",
    title: "Python Programming Fundamentals",
    subject: "Computer Science",
    totalMarks: 100,
    duration: 3600, // 1 hour
    questions: [
      {
        id: "q1",
        type: "single",
        text: "What is the output of print(type(5))?",
        options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
        answer: "<class 'int'>",
        explanation: {
          text: "The type() function returns the type of an object. 5 is an integer, so type(5) returns <class 'int'>.",
          readMoreUrls: [{
            title: "Python type() Function Documentation",
            url: "https://docs.python.org/3/library/functions.html#type"
          }],
          videoUrls: [{
            title: "Understanding Python Data Types",
            url: "https://www.youtube.com/watch?v=khKv-8q7YmY"
          }]
        },
        marks: 10
      },
      {
        id: "q2",
        type: "multiple",
        text: "Which of the following are valid Python data types? (Select all that apply)",
        options: ["Integer", "Float", "String", "Boolean", "Complex"],
        answer: ["Integer", "Float", "String", "Boolean", "Complex"],
        explanation: {
          text: "All of these are valid Python data types. Python supports integers, floating-point numbers, strings, booleans, and complex numbers as built-in data types.",
          readMoreUrls: [{
            title: "Python Standard Types Documentation",
            url: "https://docs.python.org/3/library/stdtypes.html"
          }]
        },
        marks: 15
      },
      {
        id: "q3",
        type: "true_false",
        text: "In Python, lists are mutable while tuples are immutable.",
        answer: true,
        explanation: {
          text: "This statement is true. Lists in Python can be modified after creation (mutable), while tuples cannot be modified after creation (immutable).",
          readMoreUrls: [{
            title: "Python Lists vs Tuples",
            url: "https://docs.python.org/3/tutorial/datastructures.html"
          }]
        },
        marks: 10
      },
      {
        id: "q4",
        type: "fill_blank",
        text: "The ________ function is used to get user input in Python.",
        answer: "input",
        explanation: {
          text: "The input() function is used to get user input in Python. It prompts the user to enter some text and returns it as a string.",
          readMoreUrls: [{
            title: "Python input() Function",
            url: "https://docs.python.org/3/library/functions.html#input"
          }]
        },
        marks: 10
      },
      {
        id: "q5",
        type: "subjective",
        text: "Explain the difference between a list and a tuple in Python. Provide examples to illustrate your answer.",
        answer: "Lists are mutable sequences while tuples are immutable. Lists use square brackets [] and can be modified after creation, while tuples use parentheses () and cannot be modified after creation. Example of list: numbers = [1, 2, 3], Example of tuple: coordinates = (10, 20)",
        explanation: {
          text: "Lists and tuples are both sequence data types but have key differences in mutability and usage patterns. Lists are typically used for collections of similar items that might need modification, while tuples are used for collections of related items that should remain constant.",
          readMoreUrls: [{
            title: "Python Sequences",
            url: "https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range"
          }]
        },
        marks: 25
      },
      {
        id: "q6",
        type: "code",
        text: "Write a program in Python to input 5 integers into a list named NUM. The program should then use the function Push3_5() to create the stack of the list Only3_5. Thereafter pop each integer from the list Only3_5 and display the popped value. When the list is empty, display the message 'StackEmpty'.",
        language: "python",
        answer: `def Push3_5(NUM):
    Only3_5 = []
    for num in NUM:
        if num % 3 == 0 or num % 5 == 0:
            Only3_5.append(num)
    return Only3_5

# Input 5 integers
NUM = []
for i in range(5):
    num = int(input(f"Enter number {i+1}: "))
    NUM.append(num)

# Create and process stack
stack = Push3_5(NUM)

# Pop and display values
while stack:
    print(stack.pop(), end=" ")

print("StackEmpty")`,
        testCases: [
          {
            input: "10, 6, 14, 18, 30",
            expectedOutput: "30 18 6 10 StackEmpty"
          },
          {
            input: "15, 7, 9, 25, 12",
            expectedOutput: "12 25 9 15 StackEmpty"
          }
        ],
        explanation: {
          text: "This program demonstrates stack operations with conditional filtering. The Push3_5 function creates a stack of numbers that are divisible by either 3 or 5. The program then pops each value from the stack and displays it.",
          readMoreUrls: [{
            title: "Python Lists as Stacks",
            url: "https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks"
          }],
          videoUrls: [{
            title: "Python Stack Implementation",
            url: "https://www.youtube.com/watch?v=NKmasqr_Xkw"
          }]
        },
        marks: 30
      }
    ]
  }
];