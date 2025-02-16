import { Stack } from "expo-router";
export default function Layout () {

    return (
        <Stack>
            <Stack.Screen 
                name="exercise3"
                options={{
                    title: "Login Page",
                    
                        headerTitleStyle: {
                            color: '#0b5345',
                            fontWeight: "bold",
                        }
                }}
            />
            <Stack.Screen 
                name="exercise4"
                options={{
                    title: "Stopwatch",
        
                        headerTitleStyle: {
                            color: '#0b5345',
                            fontWeight: "bold",
                        }
                }}
            />
        </Stack>
    )
}