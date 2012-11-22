/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var GaiaDataLayer = {

    insertContact: function(cdata){
        contact = new mozContact();
        contact.init(cdata);
        var request = window.navigator.mozContacts.save(contact);

        request.onerror = function onerror() {
            console.log('Error saving contact', request.error.name);
        }

        request.onsuccess = function onsuccess() {
            console.log('Success saving contact', request);
        }
        return request;
    },

    findAndRemoveContact: function(cdata){
        var options = {filterBy: ["familyName"],
            filterOp: "contains",
            filterValue: cdata['familyName']};

        contact = window.navigator.mozContacts.find(options);

        contact.onerror = function onerror() {
            console.log('Could not find contact', contact.error.name);
        }

        contact.onsuccess = function onsuccess() {
            console.log('Success finding contact', contact);
            if(contact.result.length > 0){
                return window.navigator.mozContacts.remove(contact.result[0]);
            }
        }
    },

    getSetting: function(aName) {
        req = window.navigator.mozSettings.createLock().get(aName);
        req.onsuccess = function () {
            console.log('setting retrieved');
            marionetteScriptFinished(req.result[aName]);
        }
        req.onerror = function () {
            console.log('error getting setting', req.error.name);
        }
    },

    setSetting: function(aName, aValue) {
        var setting = {};
        setting[aName] = aValue;
        req = window.navigator.mozSettings.createLock().set(setting);
        req.onsuccess = function () {
            console.log('setting changed');
            marionetteScriptFinished(true);
        }
        req.onerror = function () {
            console.log('error changing setting', req.error.name);
        }
    },

    connectToWiFi: function(ssid){
        var manager = window.navigator.mozWifiManager;
        var req = manager.getNetworks();

        req.onsuccess = function onScanSuccess() {
            var allNetworks = req.result;
            var preferredNetwork = allNetworks[ssid];

            connect = manager.associate(preferredNetwork);
            connect.onerror = function (){
                console.log('Connection to '+ ssid + ' failed', connect.error.name);
                return false;
            }

            connect.onsuccess = function() {
                console.log('Connected to ' + ssid);
                return true;
            }
        }

        req.onerror = function(){
            console.log('Could not get the available network list', req.error.name);
            return false;
        }

    },

    forgetWiFi: function(ssid){
        var manager = window.navigator.mozWifiManager;
        var req = manager.getKnownNetworks();

        req.onsuccess = function () {
            var allNetworks = req.result;
            var preferredNetwork = allNetworks[ssid];

            forget = manager.forget(preferredNetwork);
            forget.onerror = function (){
                console.log('Forgetting network' + ssid + ' failed', forget.error.name);
                return false;
            }

            forget.onsuccess = function() {
                console.log('Forgotten network ' + ssid);
                return true;
            }
        }

        req.onerror = function(){
            console.log('Could not get the known network list', req.error.name);
            return false;
        }

    }
};
