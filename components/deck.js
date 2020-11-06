import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { purple } from "../utils/colors";

class Deck extends Component {
  render() {
    const { title, questions } = this.props;

    return (
      <View
        style={{
          paddingTop: 7,
          paddingBottom: 7,
          paddingLeft: 5,
          paddingRight: 5,
          marginBottom: 2,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: purple,
        }}
      >
        <Text>{title}</Text>
        <Text>
          {questions.length}
          cards
        </Text>
      </View>
    );
  }
}

export default Deck;
