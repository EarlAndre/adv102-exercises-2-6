import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Stopwatch() {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(false);

    useEffect(() => {
        let interval = null;
        if (start) {
            interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [start]);

    function handleReset() {
        setCount(0);
        setStart(false);
    }

    const hours = Math.floor(count / 360000);
    const minutes = Math.floor((count % 360000) / 6000);
    const seconds = Math.floor((count % 6000) / 100);
    const milliseconds = count % 100;

    return (
        <View style={{ padding: 190, gap: 5, backgroundColor: '#93E9BE' }}>
            <Text style={{ fontSize: 100 }}>
                {hours < 10 ? "0" : ""}{hours}:{minutes < 10 ? "0" : ""}{minutes}:
                {seconds < 10 ? "0" : ""}{seconds}.{milliseconds < 10 ? "0" : ""}{milliseconds}
            </Text>
            <TouchableOpacity
                onPress={() => setStart(!start)}
                style={{
                    backgroundColor: '#3bd95a',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                }}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>
                    {start ? 'Stop' : 'Start'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleReset}
                style={{
                    backgroundColor: '#c93241',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 5,
                }}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Reset
                </Text>
            </TouchableOpacity>
        </View>
    );
}