import React, { Component, useEffect, useState } from "react";
import { Animated, Platform } from 'react-native';
import { Input, Box } from 'native-base';

const FloatingLabelInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, labelBGColor, ...others } = props;

  const _animatedIsFocused = new Animated.Value(
    this.props.defaultValue === '' ? 0 : 1
  );

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  useEffect(() => {
    Animated.timing(this._animatedIsFocused, {
      duration: 200,
      useNativeDriver: false,
      toValue: this.state.isFocused || this.props.defaultValue !== '' ? 1 : 0,
    }).start();
  }, []);

  const labelContainerStyles = {
    position: 'absolute',
    left: 16,
    top: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [12, -7],
    }),
    zIndex: 5,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: labelBGColor,
  };

  const AndroidLabelStyle = {
    fontWeight: '500',
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),

    color: this.props.labelColor,
  };

  const IOSlabelStyle = {
    fontWeight: '500',
    fontSize: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),

    marginTop: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [-3, 0],
    }),
    color: this.props.labelColor,
  } as any;
  return (
    <Box w={this.props.containerWidth}>
      <Animated.View pointerEvents="none" style={lableContainerStyles}>
        <Animated.Text
          style={
            Platform.OS === 'android' ? AndroidlabelStyle : IOSlabelStyle
          }
        >
          {label}
        </Animated.Text>
      </Animated.View>
      <Input
        {...props}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        _hover={{ bg: this.props.labelBGColor }}
      />
    </Box>
  );
}

export default FloatingLabelInput;
