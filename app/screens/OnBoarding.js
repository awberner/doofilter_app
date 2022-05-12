import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AntDesign from "react-native-vector-icons/AntDesign";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts
} from "@expo-google-fonts/poppins";
import {theme} from "../core/theme";
import AnimatedSplash from "react-native-animated-splash-screen";


const Dots = ({selected}) => {
    let backgroundColor = selected ? theme.colors.primary : 'rgba(255, 255, 255, 0.8)';
    return (
        <View
            style={{
                width:8,
                height: 8,
                marginHorizontal: 3,
                borderRadius: 8 / 2,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{
            width: 42,
            height: 42,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 42 / 2,
            backgroundColor: 'rgba(0,0,0,0.5)'}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{
            width: 42,
            height: 42,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 42 / 2,
            backgroundColor: 'rgba(0,0,0,0.5)'}}
        {...props}
    >
        <AntDesign name="arrowright" size={28} color={theme.colors.white}/>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{
            width: 42,
            height: 42,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 42 / 2,
            backgroundColor: 'rgba(0,0,0,0.5)'}}
        {...props}
    >
        <AntDesign name="check" size={28} color={theme.colors.white}/>
    </TouchableOpacity>
);


const OnboardingScreen = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AnimatedSplash
            translucent={true}
            isLoaded={true}
            logoImage={require("../assets/images/logo.png")}
            backgroundColor={"#262626"}
            logoHeight={500}
            logoWidth={300}
        />;
    } else {
        return (
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                showSkip={false}
                onSkip={() => navigation.replace("StartScreen")}
                onDone={() => navigation.navigate("StartScreen")}
                titleStyles={{fontFamily: 'Poppins_600SemiBold'}}
                subTitleStyles={{fontFamily: 'Poppins_400Regular', fontSize: 15, color: theme.colors.white80}}
                /*imageContainerStyles={{ width: width }}*/
                containerStyles={{overflow: 'hidden', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                pages={[
                    {
                        backgroundColor: '#2a93d5',
                        image: <Image source={require('../assets/images/circle.png')}/>,
                        title: 'OnBoarding 1',
                        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae interdum sapien. Etiam nec urna id lacus placerat iaculis.',
                    },
                    {
                        backgroundColor: '#2176ab',
                        image: <Image source={require('../assets/images/circle.png')}/>,
                        title: 'OnBoarding 2',
                        subtitle: 'Duis suscipit vehicula mi vel venenatis. Ut sit amet lorem eros.',
                    },
                    {
                        backgroundColor: '#1a5e88',
                        image: <Image source={require('../assets/images/circle.png')}/>,
                        title: 'OnBoarding 3',
                        subtitle: 'Aenean malesuada massa non ex imperdiet dictum. Praesent eu fermentum nunc. Sed sed elit tempor lacus posuere rhoncus. Aliquam cursus lectus sit amet ligula placerat interdum.',
                    },
                ]}
            />
        );
    }
};

export default OnboardingScreen;
