"use strict";

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('resize', refreshGUI);
    refreshGUI();
    notificationRequestPermission();
    setTimeout(function () {
        sendBrowserNotification("Powiadomienie", "Zmniejsz okno przeglądarki by sprawdzić aktualne parametry");
    }, 2000);
});

var params = {};

function refreshGUI() {
    updateParams();
    showParams();
}

function updateParams() {
    params.width = window.innerWidth;
    params.height = window.innerHeight;
    params.ratio = params.width / params.height;
    params.onDevice = (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) != null;
}

function showParams() {
    var info = document.querySelector('.info');
    info.innerHTML = '<p>Screen width: ' + params.width + ' px</p>' +
        '<p>Screen height: ' +  params.height + ' px</p>' +
        '<p>Screen ratio: ' +  Math.round(params.ratio * 100)/100 +'</p>' +
        '<p>On device: ' +  params.onDevice + '</p>';
}

function notificationRequestPermission() {
    if(Notification) {
        Notification.requestPermission(function () {
           console.log('granted')
        })
    }
}

function sendBrowserNotification (title, body, icon, focusOnClick) {
    if (icon === undefined) {
        icon = 'img/notification.png'
    }
    if(focusOnClick === undefined) {
        focusOnClick = true;
    }
    if(Notification) {
        if(Notification.permission !== 'granted') {
            notificationRequestPermission();
        }
        else {
            var newNotification = new Notification(title, {
                icon: icon,
                body: body
            });
            if (focusOnClick) {
                newNotification.onclick = function () {
                    window.focus();
                }
            }
        }
    }
}

