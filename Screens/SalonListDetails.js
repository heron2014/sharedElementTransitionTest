import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {iconColors} from '../config/data';
import {SPACING, height} from '../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {CELL_HEIGHT} from './SalonList';
import * as Animatable from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';

const TOP_HEIGHT_HEIGHT = height * 0.33;
const DURATION = 400;

const fadeInRight = {
  0: {
    opacity: 0,
    translateX: 10,
  },
  1: {
    opacity: 1,
    translateX: 0,
  },
};
const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 10,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};
const SalonListDetails = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar hidden />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          padding: 12,
          position: 'absolute',
          top: SPACING * 2,
          left: SPACING,
          zIndex: 2,
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
      <SharedElement
        id={`item.${item.key}.bg`}
        style={[StyleSheet.absoluteFillObject]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: 0,
              backgroundColor: item.color,
              height: TOP_HEIGHT_HEIGHT + 32,
            },
          ]}
        />
      </SharedElement>
      <View style={{height: TOP_HEIGHT_HEIGHT - 16}}>
        <SharedElement
          id={`item.${item.key}.image`}
          style={[StyleSheet.absoluteFillObject]}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
        </SharedElement>
        <SharedElement id={`item.${item.key}.name`}>
          <Text style={styles.name}>{item.name}</Text>
        </SharedElement>
      </View>
      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          {transform: [{translateY: height}]},
        ]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'white',
              zIndex: 1,
              transform: [{translateY: -height + TOP_HEIGHT_HEIGHT}],
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            },
          ]}>
          <ScrollView
            style={{
              flexGrow: 0,
              height: height - TOP_HEIGHT_HEIGHT,
              zIndex: 2,
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: SPACING * 4,
              }}>
              {['isv', 'Trophy', 'edit'].map((icon, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => console.log('Hello')}>
                    <Animatable.View
                      animation="bounceIn"
                      delay={DURATION + index * 100}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: 64,
                        backgroundColor: iconColors[index],
                      }}>
                      <Text>Icon</Text>
                    </Animatable.View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{margin: SPACING * 2}}>
              {item.categories.map((subcat, index) => {
                return (
                  <Animatable.View
                    animation={fadeInBottom}
                    delay={DURATION + 400 + index * 150}
                    key={Math.random().toString()}
                    style={{marginBottom: SPACING}}>
                    <Text
                      style={{
                        fontSize: 22,
                        marginBottom: SPACING,
                      }}>
                      {subcat.title}
                    </Text>
                    {subcat.subcats.map((ii, index) => {
                      return (
                        <View
                          style={{
                            width: 140,
                            height: 100,
                            backgroundColor: 'yellow',
                            zIndex: 1000,
                            marginBottom: 10
                          }}
                          key={index}>
                          <TouchableOpacity
                            onPress={() => console.log('Pressed')}>
                            <Text>Press me</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </Animatable.View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SharedElement>
    </SafeAreaView>
  );
};

SalonListDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.bg`,
    },
    {
      id: `item.${item.key}.name`,
    },
    {
      id: `item.${item.key}.image`,
    },
    {
      id: 'general.bg',
    },
  ];
};

const styles = StyleSheet.create({
  name: {
    fontSize: 32,
    color: '#222',
    position: 'absolute',
    top: TOP_HEIGHT_HEIGHT - 64,
    left: SPACING,
  },
  itemImage: {
    width: CELL_HEIGHT * 0.75,
    height: CELL_HEIGHT * 0.75,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    right: SPACING,
  },
});

export default SalonListDetails;
