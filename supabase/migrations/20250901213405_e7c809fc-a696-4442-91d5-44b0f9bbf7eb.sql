-- Insert sample exercises for English Vocabulary
INSERT INTO public.exercises (topic_id, title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
SELECT t.id, e.title, e.question, e.exercise_type, e.options, e.correct_answer, e.explanation, e.hint, e.difficulty_level, e.points
FROM public.topics t
CROSS JOIN (
  VALUES
    ('Synonym Challenge', 'What is a synonym for "happy"?', 'multiple_choice', '["joyful", "sad", "angry", "tired"]', 'joyful', 'A synonym is a word that has the same or similar meaning. Joyful means the same as happy.', 'Think of words that mean the same as happy.', 1, 10),
    ('Antonym Quiz', 'What is the opposite of "hot"?', 'multiple_choice', '["warm", "cold", "cool", "freezing"]', 'cold', 'An antonym is a word with the opposite meaning. Cold is the direct opposite of hot.', 'Think of what you feel when it''s not hot.', 1, 10),
    ('Word Definition', 'A "library" is a place where you can:', 'multiple_choice', '["buy food", "borrow books", "watch movies", "play games"]', 'borrow books', 'A library is a place where books and other materials are kept for people to read or borrow.', 'Think about what you do with books.', 1, 10)
) AS e(title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
WHERE t.name = 'Vocabulary';

-- Insert sample exercises for English Grammar
INSERT INTO public.exercises (topic_id, title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
SELECT t.id, e.title, e.question, e.exercise_type, e.options, e.correct_answer, e.explanation, e.hint, e.difficulty_level, e.points
FROM public.topics t
CROSS JOIN (
  VALUES
    ('Noun or Verb?', 'In the sentence "The dog runs fast", what is "runs"?', 'multiple_choice', '["noun", "verb", "adjective", "adverb"]', 'verb', 'A verb is an action word. "Runs" shows what the dog is doing.', 'What is the dog doing?', 2, 15),
    ('Complete the Sentence', 'She ___ to school every day.', 'multiple_choice', '["go", "goes", "going", "gone"]', 'goes', 'With "she" (third person singular), we use "goes" in present tense.', 'Think about verb forms with "she".', 2, 15),
    ('Plural Forms', 'What is the plural of "child"?', 'multiple_choice', '["childs", "children", "childrens", "child"]', 'children', 'Some nouns have irregular plural forms. "Child" becomes "children".', 'This is an irregular plural.', 2, 15)
) AS e(title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
WHERE t.name = 'Grammar';

-- Insert sample exercises for Math Arithmetic
INSERT INTO public.exercises (topic_id, title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
SELECT t.id, e.title, e.question, e.exercise_type, e.options, e.correct_answer, e.explanation, e.hint, e.difficulty_level, e.points
FROM public.topics t
CROSS JOIN (
  VALUES
    ('Addition Practice', 'What is 25 + 17?', 'multiple_choice', '["40", "42", "43", "45"]', '42', 'Add the ones place: 5 + 7 = 12 (write 2, carry 1). Add the tens place: 2 + 1 + 1 = 4. So 25 + 17 = 42.', 'Try adding the ones place first, then the tens place.', 1, 10),
    ('Subtraction Challenge', 'What is 84 - 29?', 'multiple_choice', '["55", "56", "65", "75"]', '55', 'Since 4 < 9, borrow from the tens place: 14 - 9 = 5, and 7 - 2 = 5. So 84 - 29 = 55.', 'You might need to borrow from the tens place.', 2, 15),
    ('Multiplication', 'What is 6 × 8?', 'multiple_choice', '["42", "46", "48", "54"]', '48', '6 × 8 = 48. You can think of this as 6 groups of 8, or 8 groups of 6.', 'Try skip counting by 6 or 8.', 1, 10)
) AS e(title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
WHERE t.name = 'Arithmetic';

-- Insert sample exercises for Math Fractions
INSERT INTO public.exercises (topic_id, title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
SELECT t.id, e.title, e.question, e.exercise_type, e.options, e.correct_answer, e.explanation, e.hint, e.difficulty_level, points
FROM public.topics t
CROSS JOIN (
  VALUES
    ('Fraction Basics', 'What fraction of this circle is shaded if 3 out of 4 parts are colored?', 'multiple_choice', '["1/4", "3/4", "4/3", "3/1"]', '3/4', 'A fraction shows parts of a whole. If 3 out of 4 parts are shaded, the fraction is 3/4.', 'Count the shaded parts over the total parts.', 2, 15),
    ('Equivalent Fractions', 'Which fraction is equivalent to 1/2?', 'multiple_choice', '["1/4", "2/4", "1/3", "3/4"]', '2/4', 'Equivalent fractions represent the same amount. 1/2 = 2/4 because if you multiply both top and bottom by 2, you get the same value.', 'Think about what equals half.', 2, 15),
    ('Adding Fractions', 'What is 1/4 + 2/4?', 'multiple_choice', '["2/4", "3/4", "3/8", "1/2"]', '3/4', 'When fractions have the same denominator, add the numerators: 1 + 2 = 3, so 1/4 + 2/4 = 3/4.', 'Add the top numbers when the bottom numbers are the same.', 3, 20)
) AS e(title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
WHERE t.name = 'Fractions';

-- Insert sample exercises for Word Problems
INSERT INTO public.exercises (topic_id, title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
SELECT t.id, e.title, e.question, e.exercise_type, e.options, e.correct_answer, e.explanation, e.hint, e.difficulty_level, points
FROM public.topics t
CROSS JOIN (
  VALUES
    ('Shopping Math', 'Sarah bought 3 notebooks for $2 each and 2 pens for $1 each. How much did she spend in total?', 'multiple_choice', '["$6", "$7", "$8", "$9"]', '$8', 'First find the cost of notebooks: 3 × $2 = $6. Then the cost of pens: 2 × $1 = $2. Total: $6 + $2 = $8.', 'Calculate each item type separately, then add them together.', 3, 20),
    ('Time Problem', 'If a movie starts at 2:30 PM and lasts 1 hour and 45 minutes, what time does it end?', 'multiple_choice', '["3:15 PM", "4:15 PM", "4:30 PM", "5:15 PM"]', '4:15 PM', 'Add 1 hour to 2:30 PM = 3:30 PM. Then add 45 minutes to 3:30 PM = 4:15 PM.', 'Add the hours first, then the minutes.', 4, 25),
    ('Distance Problem', 'Tom walks 5 blocks north, then 3 blocks east, then 2 blocks south. How many blocks is he from his starting point?', 'multiple_choice', '["3 blocks", "4 blocks", "5 blocks", "10 blocks"]', '5 blocks', 'North 5, South 2 = Net 3 blocks north. East 3 blocks. Using distance formula or counting: he''s 3 north and 3 east = 5 blocks away (3+3-1=5 by shortest path).', 'Think about his final position compared to where he started.', 4, 25)
) AS e(title, question, exercise_type, options, correct_answer, explanation, hint, difficulty_level, points)
WHERE t.name = 'Word Problems';