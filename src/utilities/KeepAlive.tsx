import { useEffect } from "react";
import BackgroundTimer from 'react-native-background-timer';
import { References } from "@knightsofglory/warlibrary/lib/References";
import { Platform } from "react-native";
import TrackPlayer, { State } from 'react-native-track-player';

// const track = {
//     url: "https://richardpianka.com/sound/loud.mp3",
//     title: 'silence',
//     artist: 'god',
//     duration: 36
// };
//
// function iosPlaybackHack() {
//     setTimeout(() => {
//         TrackPlayer.add(track).then(TrackPlayer.play)
//     }, 1000)
// }

export default function() {

    // const ios = Platform.OS === "ios"

    useEffect(() => {
        BackgroundTimer.start()
        BackgroundTimer.runBackgroundTimer(() => {
            References.messageBus.send("chat", "/pong KEEPALIVE")
        }, 30*1000)
    }, [])

    // useEffect(iosPlaybackHack, [])

    return <></>
}
