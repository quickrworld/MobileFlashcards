import React from 'react'
import connect from 'redux'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

function Deck(props) {
  const { title, count, cards, navigation } = props
  const onPress = () => {
    navigation.navigate('QuizStart')
  }
  return (
    <View style={styles.deckContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{count} Cards</Text>
        <Text>{JSON.stringify(cards)}</Text>
      </TouchableOpacity>
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

// export default connect()(Deck)

