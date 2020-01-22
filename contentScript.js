var gUpdateInProgress = false;

function triggerPlaybackSpeedDialog() {
    document.querySelector(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(3)").click();
}

function toggleSettingsButton() {
    document.querySelector(".ytp-settings-button").click();
}

function triggerPlayback(triggerValue) {
    if(gUpdateInProgress) return;

    setTimeout(function() {

        //Execute first function
        toggleSettingsButton();
        setTimeout(function() {

            //Execute second function
           triggerPlaybackSpeedDialog();
           setTimeout(function() {
                var elemPlaybackRate = document.getElementsByClassName('html5-main-video')[0];
                var speed = elemPlaybackRate.playbackRate;

                //Execute third function
                switch(triggerValue) {
                    case 1:
                        speed -= 0.25;
                        break;
                    case 2:
                        speed += 0.25;
                        break;
                }

                // update playback rate
                elemPlaybackRate.playbackRate = speed;

                // set the playback rate in video settings if new option available
                var speedOptions = $(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem");
                $(speedOptions).each(function () {
                    var text = speed == 1 ? "Normal" : speed;
                    if($(this).text() == text) {
                        $(this).click();
                        return;
                    }
                });

                setTimeout(function() {
                    //Execute fourth function
                    toggleSettingsButton();
                    gUpdateInProgress = false;
                });
            }, 500);
    
        }, 500);
    
    }, 800);
}

function init() {
    document.onkeydown = function (e) {
        // alt+minus
        if( e.which === 189 && e.altKey ) {
            //console.log('you pressed alt + plus');
            triggerPlayback(1);
        }

        // alt+plus
        if( e.which === 187 && e.altKey ) {
            //console.log('you pressed alt + minus');
            triggerPlayback(2);
        }
    };
}

setTimeout(function() {
    init();
}, 2000);
