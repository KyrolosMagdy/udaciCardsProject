import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Question from "./Question";

class Quiz extends React.Component {
  state = {
    currentQuestionIndex: 0,
    correctAnswersCount: 0,
  };

  correctBtnPressed() {
    this.setState((state) => {
      return {
        currentQuestionIndex: state["currentQuestionIndex"] + 1,
        correctAnswersCount: state["correctAnswersCount"] + 1,
      };
    });
  }

  inCorrectBtnPressed() {
    this.setState((state) => {
      return {
        ...state,
        currentQuestionIndex: state["currentQuestionIndex"] + 1,
      };
    });
  }

  restartQuiz() {
    this.setState({ currentQuestionIndex: 0, correctAnswersCount: 0 });
  }

  render() {
    const { currentQuestionIndex, correctAnswersCount } = this.state;
    const { deck, goBack } = this.props;
    const { questions } = deck;

    if (currentQuestionIndex > 0 && currentQuestionIndex === questions.length) {
      return (
        <View>
          <View>
            <Text>Your Score</Text>
            <Text>{(correctAnswersCount / questions.length) * 100}%</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => goBack()}>
              <Text>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.restartQuiz()}>
              <Text>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (questions.length === 0) {
      return (
        <View>
          <Text> You have no Cards for this deck</Text>
        </View>
      );
    }

    const card = questions[currentQuestionIndex];
    const {
      opacityFront,
      opacityBack,
      transformFrontY,
      transformBackY,
    } = this.state;
    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate,
        },
      ],
    };
    const backAnimatedStyle = {
      transform: [
        {
          rotateY: this.backInterpolate,
        },
      ],
    };
    return (
      <View>
        <Text>
          {currentQuestionIndex + 1}/{questions.length}
        </Text>
        <View>
          <Question card={card} />
        </View>
        <View>
          <TouchableOpacity onPress={() => this.correctBtnPressed()}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.inCorrectBtnPressed()}>
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { deckTitle } = route.params;

  return {
    deck: decks[deckTitle] || {},
  };
}

function mapDispatchToProps(dispatch, { route, navigation }) {
  const { deckTitle } = route.params;
  return {
    goBack: () => navigation.goBack(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
