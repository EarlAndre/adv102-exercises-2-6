import { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

export default function QuizApp() {
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const decodeHTML = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=27&type=multiple`
      );
      const data = await res.json();
      setQuestions(
        data.results.map((q) => ({
          ...q,
          question: decodeHTML(q.question),
          answers: [...q.incorrect_answers, q.correct_answer].map(decodeHTML).sort(() => Math.random() - 0.5),
        }))
      );
      setCurrentQuestion(0);
      setScore(0);
      setCompleted(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>
      {!questions.length || completed ? (
        <View>
          <Text style={styles.text}>Number of Questions (10-30):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(numQuestions)}
            onChangeText={(text) => setNumQuestions(Math.min(30, Math.max(10, Number(text))))}
          />
          <TouchableOpacity
            onPress={fetchQuestions}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Loading..." : "Start Quiz"}</Text>
          </TouchableOpacity>
          {completed && <Text style={styles.text}>Your Score: {score} / {numQuestions}</Text>}
        </View>
      ) : (
        <View>
            <Text style={styles.text}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].answers.map((answer) => (
            <TouchableOpacity
              key={answer}
              onPress={() => handleAnswer(answer)}
              style={styles.userItem}
            >
              <Text>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#93E9BE',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#262626',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    color: '#262626',
  },
  count: {
    fontSize: 15,
    marginBottom: 10,
    color: '#555',
  },
  input: {
    width: '70%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'pink',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: '70%',
    padding: 10,
    backgroundColor: '#c93241',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  userItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: 'pink',
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
});