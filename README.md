# Budgeteer (Budżeter)

Application for managing home budget. Ad-free (for now).

Currently only available in Polish as it is my main language, main language of targeted audience and I'm too lazy to translate everything. Also, it's under development at the moment as a private project, so don't expect fireworks.

Developed with ~~love~~ a combination of Ionic, Angular and Capacitor (the application side). Backend backed by firebase.

# Development

Prerequisities: 

- Node v12 or above
- npm v6.12.1 (or above)
- ionic v6.11.0 (or above)
- latest Android Studio
- AVD manager, but only if you want to debug on virtual device

Just `git clone` it, go to the root folder, run `npm install` and you are ready to go.

## Web deployment

Usually `ionic serve` at root folder does the trick, your browser should open on `localhost:8100` with app ready.

## Android deployment

Run `ionic cap sync android` and then open Android Studio. If you have connected device in debugging mode or any virtual device running (AVD Manager), then the button **Run 'app'** should be lit. Click it. If it fails, try again. If it fails again, you're on your own.

# Changelog

## Version 0.1.0 (not ready yet)

Stable state of application with minimal functionalities, such as:

- google sign-in (which works like charm, not as it is currently)
- dashboard page with list of transactions and monthly summary (and maybe something else...)
- ability to create, modify and delete transactions
- wallets page where you can view your wallets
- ability to create, modify and delete wallets
- ability to change active wallet (displayed on dashboard)
