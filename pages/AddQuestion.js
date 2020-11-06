import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
//redux
import { connect } from "react-redux";
import { addCard } from "../Redux/actions";

//api
import { addCardToDeck } from "../utils/api";

const AddQuestion = ({ addCard, deck, goBack }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const submit = () => {
    if (question && answer) {
      addCard(deck.title, { question, answer }); //update Redux
      addCardToDeck(deck.title, { question, answer }); //update db
      goBack();
    }
  };

  return (
    <View>
      <Text>{deck.title}</Text>
      <TextInput
        underlineColorAndroid={"transparent"}
        editable={true}
        maxLength={100}
        placeholder="Enter the question here"
        onChangeText={(question) => setQuestion(question)}
      />
      <TextInput
        underlineColorAndroid={"transparent"}
        editable={true}
        maxLength={200}
        multiline={true}
        placeholder="Enter the answer here"
        onChangeText={(answer) => setAnswer(answer)}
      />
      <TouchableOpacity onPress={submit}>
        <Text> Add card </Text>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(decks, { route }) {
  const { deckTitle } = route.params;
  return {
    deck: decks[deckTitle] || {},
  };
}

function mapDispatchToProps(dispatch, { navigation, route }) {
  const { deckTitle } = route.params;

  return {
    goBack: () => navigation.goBack(),
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
