import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import Deck from "../components/deck";

class DeckInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;
    return { title: deckTitle };
  };

  render() {
    const { deck, navigateToAddCard, navigateToStartQuiz } = this.props;
    const deckTitle = deck.title;
    console.log("deckTitle: ", deckTitle);
    return (
      <View>
        <Deck
          id={deck.title}
          title={deck.title}
          questions={deck.questions}
          bigFonts={true}
        />
        <TouchableOpacity onPress={() => navigateToAddCard(deck.title)}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToStartQuiz(deck.title)}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (decks, { route }) => {
  const { deckTitle } = route.params;
  return {
    deck: decks[deckTitle] || {},
    decks,
  };
};

function mapDispatchToProps(dispatch, { route, navigation }) {
  const { deckTitle } = route.params;
  return {
    goBack: () => navigation.goBack(),
    navigateToAddCard: (deckTitle) =>
      navigation.navigate("AddCard", { deckTitle: deckTitle }),
    navigateToStartQuiz: (deckTitle) =>
      navigation.navigate("Quiz", { deckTitle: deckTitle }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckInfo);
