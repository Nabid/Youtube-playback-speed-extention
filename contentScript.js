var gUpdateInProgress = false;
var gElemPlaybackRate;

function triggerPlaybackSpeedDialog() {
    document.querySelector(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(3)").click();
}

function toggleSettingsButton() {
    document.querySelector(".ytp-settings-button").click();
    gUpdateInProgress = gUpdateInProgress ? false : true;
}

function showWarningNotification(message) {
    window.createNotification({
        // timeout in milliseconds
        showDuration: 1500,
        // success, info, warning, error, and none
        theme: 'warning'
    })({
        message: message
    });
}

function showSuccessNotification(message) {
    window.createNotification({
        // timeout in milliseconds
        showDuration: 1000,
        // success, info, warning, error, and none
        theme: 'success'
    })({
        message: message
    });
}

function getPlaybackObject() {
    var obj = document.getElementsByClassName('html5-main-video')[0];
    if(obj && obj.playbackRate) return obj;
    return null;
}

function triggerPlayback(triggerValue) {

    if(gUpdateInProgress) {
        showWarningNotification("in progress...");
        return;
    };

    setTimeout(function() {

        //Execute first function to click on settings button
        toggleSettingsButton();
        setTimeout(function() {

            //Execute second function to go to speed control
            triggerPlaybackSpeedDialog();
            setTimeout(function() {
                gElemPlaybackRate = getPlaybackObject();
                if(!gElemPlaybackRate) return;
                var speed = gElemPlaybackRate.playbackRate;

                //Execute third function
                switch(triggerValue) {
                    case 0:
                        speed = 1;
                        break;
                    case 1:
                        speed -= 0.25;
                        break;
                    case 2:
                        speed += 0.25;
                        break;
                }

                // update playback rate
                gElemPlaybackRate.playbackRate = speed;

                // set the playback rate in video settings if new option available
                var speedOptions = document.querySelectorAll(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem .ytp-menuitem-label");
                for(let item of speedOptions) {
                    var text = speed == 1 ? "Normal" : speed;
                    if(item.textContent == text) {
                        item.parentElement.click();
                        break;
                    }
                }

                setTimeout(function() {
                    //Execute fourth function to close the menu
                    toggleSettingsButton();
                    showSuccessNotification(String(speed));
                    gUpdateInProgress = false;
                });
            }, 500);
    
        }, 500);
    
    }, 800);
}

function init() {
    gElemPlaybackRate = getPlaybackObject();

    document.onkeydown = function (e) {
        // alt+minus
        if( e.which === 189 && e.altKey ) {
            //console.log('you pressed alt + plus');
            if(gElemPlaybackRate.playbackRate <= -2) {
                showWarningNotification("Min speed [-2], Max speed[+3]");
                return;
            }
            triggerPlayback(1);
        }

        // alt+plus
        else if( e.which === 187 && e.altKey ) {
            //console.log('you pressed alt + minus');
            if(gElemPlaybackRate.playbackRate >= 3) {
                showWarningNotification("Min speed [-2], Max speed[+3]");
                return;
            }
            triggerPlayback(2);
        }

        // alt+0
        else if( e.which === 48 && e.altKey ) {
            //console.log('you pressed alt + zero');
            triggerPlayback(0);
        }
    };

    if(gElemPlaybackRate) showSuccessNotification("Playback speed: " + gElemPlaybackRate.playbackRate);
}

setTimeout(function() {
    init();
}, 2000);
