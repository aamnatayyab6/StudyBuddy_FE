import { View, Image, Text, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from "../../const/styles";
import slides from '../../const/slides';

const { width, height } = Dimensions.get('window');


const Slide = ({ item }) => {
  return (
    <View className='relative items-center justify-center pt-5 pb-10'>
      <Image
        source={item?.image}
        style={{
          height: '50%',
          width,
          resizeMode: 'contain',
          marginBottom: 22,
        }}
      />
      <View className='pb-12 pt-96 absolute justify-center items-center'>
      <Text className='font-medium' style={styles.Onboarding_slide_title} >{item?.title}</Text>
      <Text className='font-normal' style={styles.Onboarding_slide_subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  )
}

const OnboardingSlider = ({navigation}) => {
  // Current Slide indicator active state
  const [activeSlideidx, setActiveSlideidx] = useState(0)
  const ref = useRef()

  // update active slide index
  const updateActiveSlideIdx = (idx) => {
    const contentOffsetX = idx.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setActiveSlideidx(currentIndex);
  }

  // next button functionality 
  const goToNextSlide = () => {
    const nextSlideIndex = activeSlideidx + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setActiveSlideidx(activeSlideidx + 1);
    }
  }

  // skip button functionality 
  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setActiveSlideidx(lastSlideIndex);
  }

  // Footer Section
  const Footer = () => {
    return (
      // indicators
      <View className='pt-5'
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.slider_indicator,
                activeSlideidx == index && {
                  backgroundColor: '#3F4750',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        {/* indicators end */}

        {/* buttons */}
        <View style={{ marginBottom: 20 }}>
          {activeSlideidx == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={[
                  styles.Onboarding_slide_btn,
                  {
                    backgroundColor: '#93A8AC'
                  }
                ]}
                onPress={() => navigation.replace('Register')}>
                <Text className='text-outer-space'
                  style={{ fontWeight: 'bold', fontSize: 15 }}>
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className='flex-row'>
              <TouchableOpacity
                style={[
                  styles.Onboarding_slide_btn,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1.5,
                    borderColor: '#A59E8C'
                  },
                ]}
                onPress={skip}>
                <Text className='text-outer-space'
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>

              <View style={{ width: 15 }} />

              <TouchableOpacity
                onPress={goToNextSlide}
                style={
                  [styles.Onboarding_slide_btn]
                }>
                <Text className='text-outer-space'
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* buttons end */}
      </View>
    )
  }
  // Footer Section End

  return (
    <SafeAreaView className='flex-1 bg-dun'>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateActiveSlideIdx}
        contentContainerStyle={{
          height: height * 0.75
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer />
    </SafeAreaView>
  );
};
export default OnboardingSlider;