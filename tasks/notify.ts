import notifier from 'node-notifier';
import path from 'path';

const notify = function notify() {
    const notificationCenter = new notifier.NotificationCenter() as typeof notifier;
    notificationCenter.notify(
        {
            title: 'My awesome title',
            message: 'Hello from node, Mr. User!',
            icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait
            reply: true,
        },
        function (err, response) {
            // Response is response from notification
        }
    );

    notificationCenter.on('click', function (notifierObject, options, event) {
        // Triggers if `wait: true` and user clicks notification
    });

    notificationCenter.on('timeout', function (notifierObject, options) {
        // Triggers if `wait: true` and notification closes
    });

    notificationCenter.on('replied', function (obj, options, metadata) {
        console.log('User replied', metadata);
    });

}

notify();
