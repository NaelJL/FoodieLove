import Swiper from 'react-native-swiper';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import FullRecipeLink from './FullRecipeLink'

export default function Carousel ({ id, image, title }) {

    // carousel style
    const styles = StyleSheet.create({
        wrapper: {},
        slide: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        image: {
          width: '100%',
          height: 200,
          resizeMode: 'cover',
          marginBottom: 10,
        },
        text: {
          fontSize: 20,
          fontWeight: 'bold',
        },
    });

    return (
        <Swiper style={styles.wrapper} showsButtons>
            <TouchableOpacity key={id} onPress={() => <FullRecipeLink key={id} info={id}/> }>
                <View style={styles.slide}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
        </Swiper>
    )
}

Carousel.propTypes = {
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
};