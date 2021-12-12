import { Meteor } from 'meteor/meteor';

// import Bs from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// import Bt from '../imports/bluetooth-serial-wrapper.js';

import App from '../imports/ui/App.svelte';


function stringToArrayBuffer(str) {
	const ret = new Uint8Array(str.length);
	for (let i = 0; i < str.length; i++) {
		ret[i] = str.charCodeAt(i);
	}
	return ret.buffer;
}

const PLUGIN_NAME = 'BluetoothSerial';

async function asyncExec(method, args) {
	if (args == null) {
		// eslint-disable-next-line no-param-reassign
		args = [];
	}
	return new Promise((success, failure) => {
		if (window.cordova) {
			cordova.exec(success, failure, PLUGIN_NAME, method, []);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', method, 'args:', args);
		}
	});
}

export default class Bt {
	// Start listening for connections
	static async listen() {
		return asyncExec('listen', []);
	}

	// Stop listening for connections
	static async stopListen() {
		return asyncExec('stopListen', []);
	}

	// Connect to the provided macAddress
	//
	// https://developer.android.com/reference/android/bluetooth/BluetoothDevice#createRfcommSocketToServiceRecord(java.util.UUID)
	static async connect(macAddress) {
		return asyncExec('connect', [macAddress]);
	}

	// Disconnect and free all resources
	static async disconnect() {
		return asyncExec('disconnect', []);
	}

	// Returns a list of paired devices
	//
	// eg: [{"name":"DeviceName","address":"AA:BB:CC:DD:EE:FF","id":"AA:BB:CC:DD:EE:FF","class":524}]
	//
	// https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#getBondedDevices()
	// Classes can be found: https://developer.android.com/reference/android/bluetooth/BluetoothClass.Device#PHONE_SMART
	static async listPaired() {
		return asyncExec('list', []);
	}

	// Success if Bluetooth is currently enabled and ready for use.
	//
	// https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#isEnabled()
	static async isEnabled() {
		return asyncExec('isEnabled', []);
	}

	// Show the user a prompt to turn on bluetooth
	//
	// https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#ACTION_REQUEST_ENABLE
	static async enable() {
		return asyncExec('enable', []);
	}

	// Success if bluetooth state is connected
	//
	// getState() == STATE_CONNECTED
	// https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#getState()
	static async isConnected() {
		return asyncExec('isConnected', []);
	}

	// The number of bytes of data available to read is passed to the success function
	static async available() {
		return asyncExec('available', []);
	}

	// All the data in the buffer is passed to the success function
	static async read() {
		return asyncExec('read', []);
	}

	// Reads the data in the buffer up to and including the delimiter and passes to success function
	static async readUntil(delimiter) {
		return asyncExec('readUntil', [delimiter]);
	}

	// Writes data to the bluetooth serial port
	// data can be an ArrayBuffer, string, integer array, or Uint8Array
	static async write(data) {
		let result;
		// convert to ArrayBuffer
		if (typeof data === 'string') {
			result = stringToArrayBuffer(data);
		} else if (data instanceof Array) {
			// assuming array of integer
			result = new Uint8Array(data).buffer;
		} else if (data instanceof Uint8Array) {
			result = data.buffer;
		}

		return asyncExec('write', [result]);
	}

	// Calls the success callback when new data is available up to and including the delimiter
	static async subscribe(delimiter, success, failure) {
		if (window.cordova) {
			cordova.exec(success, failure, PLUGIN_NAME, 'subscribe', [delimiter]);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', 'subscribe', 'args:', [delimiter]);
		}
		
	}

	// Removes data subscription
	static async unsubscribe() {
		return asyncExec('unsubscribe', []);
	}

	// Calls the success callback when new data is available with an ArrayBuffer
	static subscribeRawData(success, failure) {
		function successWrapper(data) {
			// Windows Phone flattens an array of one into a number which
			// breaks the API. Stuff it back into an ArrayBuffer.
			if (typeof data === 'number') {
				const a = new Uint8Array(1);
				a[0] = data;
				// eslint-disable-next-line no-param-reassign
				data = a.buffer;
			}
			success(data);
		}
		if (window.cordova) {
			cordova.exec(successWrapper, failure, PLUGIN_NAME, 'subscribeRaw', []);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', 'subscribeRaw', 'args:', []);
		}
	}

	// Removes raw data subscription
	static unsubscribeRawData(success, failure) {
		if (window.cordova) {
			cordova.exec(success, failure, PLUGIN_NAME, 'unsubscribeRaw', []);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', 'unsubscribeRaw', 'args:', []);
		}
	}

	// Clears the data buffer
	// The data buffer is used for subscribe data. If subscribe is not being used
	// the buffer should be cleared occasionally.
	static async clear() {
		return asyncExec('clear', []);
	}

	// Reads the RSSI of the *connected* peripheral
	static async readRSSI() {
		return asyncExec('readRSSI', []);
	}

	// Show the bluetooth settings dialog
	//
	// https://developer.android.com/reference/android/provider/Settings#ACTION_BLUETOOTH_SETTINGS
	static async showBluetoothSettings() {
		return asyncExec('showBluetoothSettings', []);
	}

	// Start the remote device discovery process.
	// The discovery process usually involves an inquiry scan of about 12 seconds,
	// followed by a page scan of each new device to retrieve its Bluetooth name.
	//
	// https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#startDiscovery()
	static async startDiscovery() {
		return asyncExec('startDiscovery', []);
	}

	// Cancel the current device discovery process.
	//
	// Because discovery is a heavyweight procedure for the Bluetooth adapter, this
	// method should always be called before attempting to connect to a remote device.
	// Discovery is not managed by the Activity, but is run as a system service, so
	// an application should always call cancel discovery before connecting even
	// if it did not directly request a discovery, just to be sure.
	//
	// https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#cancelDiscovery()
	static async cancelDiscovery() {
		return asyncExec('cancelDiscovery', []);
	}

	// Notify will be called for each device discovered with scan
	// only one listener can be registered. If this function is called more than once, the last
	// listener set will be used.
	static setDeviceDiscoveredListener(notifyCallback) {
		if (typeof notify !== 'function') {
			throw new Error('BluetoothSerial.setDeviceDiscoveredListener: notifyCallback not a function');
		}

		if (window.cordova) {
			cordova.exec(notifyCallback, null, PLUGIN_NAME, 'setDeviceDiscoveredListener', []);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', 'setDeviceDiscoveredListener', 'args:', []);
		}
	}

	// Unregister the discovery listener
	static clearDeviceDiscoveredListener() {
		if (window.cordova) {
			cordova.exec(null, null, PLUGIN_NAME, 'clearDeviceDiscoveredListener', []);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', 'clearDeviceDiscoveredListener', 'args:', []);
		}
	}

	// Sets the friendly Bluetooth name of the local Bluetooth adapter.
	// This name is visible to remote Bluetooth devices.
	//
	// Valid Bluetooth names are a maximum of 248 bytes using UTF-8 encoding, although many
	// remote devices can only display the first 40 characters, and some may be limited to just 20.
	//
	// https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#setName(java.lang.String)
	static setName(newName) {
		if (window.cordova) {
			cordova.exec(null, null, PLUGIN_NAME, 'setName', [newName]);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', 'setName', 'args:', []);
		}
	}

	// Make the device discoverable
	// Max 300 seconds https://developer.android.com/reference/android/bluetooth/BluetoothAdapter#EXTRA_DISCOVERABLE_DURATION
	static setDiscoverable(discoverableDurationSec) {
		if (window.cordova) {
			cordova.exec(null, null, PLUGIN_NAME, 'setDiscoverable', [discoverableDurationSec]);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Cordova not initalized. Method:', 'setDiscoverable', 'args:', [discoverableDurationSec]);
		}
	}
}
window.Bt = Bt;

Meteor.startup(() => {
	new App({
		target: document.getElementById('app'),
	});
});
