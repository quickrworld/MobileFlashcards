import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
export default function Deck(props) {
  const { title, count, cards } = props
  return (
    <View style={styles.deckContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{count} Cards</Text>
      <Text>{JSON.stringify(cards)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deckContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 20,
  },
})