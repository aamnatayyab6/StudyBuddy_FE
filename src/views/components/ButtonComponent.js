import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../const/colors'

const ButtonComponent = ({ title, disabled, onPress = () => {} }) => {
    return (
        <TouchableOpacity
        testID="pressButton"
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={{
            height: 45,
            width: '100%',
            backgroundColor: '#93A8AC',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginVertical: 18,
            opacity: disabled ? 0.3 : 1
        }}
        >
            <Text
            testID="button"
            style={{
                color: COLORS['outer-space'],
                fontWeight: 'bold',
                fontSize: 18
            }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonComponent