import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';

const stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Welcome'>
        <stack.Screen name='Welcome' component={Welcome} />
        <stack.Screen name='Login' component={Login} />
        <stack.Screen name='Signup' component={Signup} />
      </stack.Navigator>
    </NavigationContainer>
  );
}