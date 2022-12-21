import { useEffect } from "react";
import BackgroundTimer from 'react-native-background-timer';
import { References } from "@knightsofglory/warlibrary/lib/References";

// ported from https://stackoverflow.com/questions/63432839/how-to-prevent-socket-io-from-disconnecting-when-react-native-app-is-in-backgrou
export default function() {

    useEffect(() => {
        BackgroundTimer.start()
        BackgroundTimer.runBackgroundTimer(() => {
            References.messageBus.send("chat", "/pong KEEPALIVE")
        }, 30*1000)
    }, [])

    // const appState = useRef(AppState.currentState)
    // let interval: number
    //
    // function handler(nextAppState: AppStateStatus) {
    //     const notInactive = appState.current.match(/inactive|background/)
    //     const nextIsActive = nextAppState === "active"
    //
    //     if (notInactive && nextIsActive) {
    //         BackgroundTimer.clearInterval(interval)
    //     } else {
    //         interval = BackgroundTimer.setInterval(() => {
    //             ConnectionManager.send("/pong KEEPALIVE")
    //         }, 5000)
    //         appState.current = nextAppState
    //     }
    // }
    //
    // useEffect(() => {
    //     const listener = AppState.addEventListener("change", handler)
    //     return () => listener.remove()
    // }, [])

    return <></>
}
