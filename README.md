# MobileFlashcards App

To get started right away, choose an installation directory, for example, `installdir`.

* Create the installation directory
    - `mkdir installdir`

* Install the MobileFlashcards application from the github repository
    - `cd installdir`
    - `git clone https://github.com/quickrworld/MobileFlashcards.git`
    - `cd MobileFlashcards`
    - `yarn install`
    - `yarn start`
    
* Ensure that the QR code displayed by the above command is fully visible in the terminal. If required, increase the number of lines displayed by the terminal. Scroll to display the entire QR code.
    
* Install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer. 
    - [Expo on Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
    - [Expo on the App Store (iOS)](https://itunes.apple.com/us/app/expo-client/id982107779)
    
* Using the Expo app, scan the QR code from your terminal to open your project.

* Review the App

* To test the local notifications wait for the hour to change. On iOS the notifications are not shown if the App is in foreground.

#### Note: Node (version 4 or later), and the latest version of yarn are prerequsites for the above
#### Note: `installdir` can be any directory where you want to install the frontend application and the API server
#### Note: You must have write permissions in the working directory when you create `installdir`
#### Note: Windows users may have to modify the commands for the Windows environment
