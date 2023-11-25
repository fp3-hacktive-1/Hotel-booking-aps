import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Detail from './Detail';

//Screen names
const homeName = "Home";
const detailsName = "Details";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70 }
                }}>

                <Tab.Screen name={homeName} component={Home} />
                <Tab.Screen name={detailsName} component={Detail} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;