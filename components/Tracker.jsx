import React from 'react'
import { View, StyleSheet } from 'react-native'


function Tracker({ track }) {
    return (
        <View style={styles.tracker}>
            <View style={styles.tracker > 0 ? 'itemActive' : 'item'}></View>
            <View style={styles.tracker > 1 ? 'itemActive' : 'item'}></View>
            <View style={styles.tracker > 2 ? 'itemActive' : 'item'}></View>
        </View>
    )
}

const styles = StyleSheet.create({

    tracker: {
        "height": 5,
        "marginTop": "2rem",
        "marginRight": 0,
        "marginBottom": "1rem",
        "marginLeft": 0,
        "display": "flex",
        "gap": 6,
        "borderTopLeftRadius": 2,
        "borderTopRightRadius": 2,
        "borderBottomRightRadius": 2,
        "borderBottomLeftRadius": 2,
    },
});


export default Tracker
