import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

// redux
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { loadDecks } from "../Redux/actions";

// spinner
import { AppLoading } from "expo";

//component
import Deck from "../components/deck";

//api

class Decks extends React.Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { loadDecks } = this.props;
    getDecks()
      .then((decks) => loadDecks(decks))
      .then(() => {
        return this.setState(() => ({ ready: true }));
      });
  }

  keyExtractor = (item, index) => item.title;

  onPressItem = (item) => {
    this.props.navigation.navigate("DeckInfo", {
      deckTitle: item.title,
    });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item)}
        style={{ flex: 1 }}
      >
        <Deck
          id={item.title}
          title={item.title}
          questions={item.questions}
          style={{ flex: 1 }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { decks } = this.props;

    const listOfDecks = Object.values(decks);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 100,
        }}
      >
        {!this.state.ready ? (
          <AppLoading />
        ) : (
          <FlatList
            data={listOfDecks}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps, { loadDecks })(Decks);
