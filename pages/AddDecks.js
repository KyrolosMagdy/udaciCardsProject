import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";

import { connect } from "react-redux";
import { black, white, lightGray } from "../utils/colors";

import { addDeck } from "../Redux/actions";
import { saveDeckTitle } from "../utils/api";

import { useNavigation } from "@react-navigation/native";

class AddDeck extends Component {
  state = {
    title: "",
  };

  submit = () => {
    const { title } = this.state;
    const { addDeck } = this.props;
    if (title) {
      addDeck(title);
      saveDeckTitle(title);
      this.toHome(); //navigate to Decks list
    }
  };

  reset = () => {
    this.setState({ title: "" });
    this.toHome();
  };

  toHome = () => {
    this.props.navigation.navigate("Home", { screen: "Decks" });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckLabel}>
          What is the title of your new deck?
        </Text>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={styles.deckTitle}
          editable={true}
          maxLength={50}
          placeholder="Deck Title"
          onChangeText={(title) => this.setState({ title })}
        />
        <TouchableOpacity onPress={this.submit} onCancel={this.reset}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  deckLabel: {
    margin: 10,
    color: black,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
  },
  deckTitle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: lightGray,
  },
});

function mapStateToProps(decks) {
  return { decks };
}
export default connect(mapStateToProps, { addDeck })(AddDeck);
