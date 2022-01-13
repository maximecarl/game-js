
class VibrationManager{
    createVibration(time) {
        window.navigator.vibrate(time) ;
    }
}

export {VibrationManager} ;