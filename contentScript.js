function triggerPlaybackSpeed150() {
    //$('.ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(6)').click();
    document.querySelector(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(6)").click();
}

function triggerPlaybackSpeed125() {
    //$('.ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(5)').click();
    document.querySelector(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(5)").click();
}

function triggerPlaybackSpeedNormal() {
    //$('.ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(4)').click();
    document.querySelector(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(4)").click();
}

function triggerPlaybackSpeedDialog() {
    //$('.ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(3)').click()
    document.querySelector(".ytp-settings-menu .ytp-panel .ytp-panel-menu .ytp-menuitem:nth-child(3)").click();
}

function toggleSettingsButton() {
    //$('.ytp-settings-button').click();
    document.querySelector(".ytp-settings-button").click();
}

function triggerPlayback(triggerValue) {
    setTimeout(function() {

        //Execute first function
        toggleSettingsButton();
        setTimeout(function() {

            //Execute second function
           triggerPlaybackSpeedDialog();
           setTimeout(function() {

                //Execute third function
                switch(triggerValue) {
                    case 1:
                        triggerPlaybackSpeedNormal();
                        break;
                    case 2:
                        triggerPlaybackSpeed125();
                        break;
                    case 3:
                        triggerPlaybackSpeed150();
                        break;
                }
                setTimeout(function() {

                    //Execute fourth function
                    toggleSettingsButton();
                });
            }, 500);
    
        }, 500);
    
    }, 800);
}

function init() {
    document.onkeydown = function (e) {
        if( e.which === 49 && e.altKey ) {
            console.log('you pressed alt + 1');
            triggerPlayback(1);
        }

        if( e.which === 50 && e.altKey ) {
            console.log('you pressed alt + 2');
            triggerPlayback(2);
        }

        if( e.which === 51 && e.altKey ) {
            console.log('you pressed alt + 3');
            triggerPlayback(3);
        }
    };
}

setTimeout(function() {
    //debugger
    init();
}, 2000);
