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

    setVolume: function(vdata){
        lock = window.navigator.mozSettings.createLock()
        volume = lock.set({"audio.volume.master":vdata});
        lock.clear()
        volume.onerror = function onerror(){
            console.log('volume set failed', volume.error.name);
        }
    },

    toggleCellData: function(cdata){
        lock = window.navigator.mozSettings.createLock();
        data = lock.set({"ril.data.enabled" : cdata});

        data.onsuccess = function onsuccess(){
            console.log("Success toggling cellular data", data);
        }

        data.onerror = function onerror(){
            console.log("Error toggling cellular data", data.error.name);
        }
        return data.error === null;
    },

    toggleCellRoaming: function(rdata){
        lock = window.navigator.mozSettings.createLock();
        roaming = lock.set({"ril.data.roaming_enabled" : rdata});

        roaming.onsuccess = function onsuccess(){
           console.log("Success toggling cellular roaming data", roaming);
        }

        roaming.onerror = function onerror(){
           console.log("Error toggling cellular roaming data", roaming.error.name);
        }
        return roaming.error === null;
    }
};
