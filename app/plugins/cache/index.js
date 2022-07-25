import { Utils } from '@nativescript/core'
import { ApplicationSettings } from '@nativescript/core';

var cache = {};

// var sharedPreferences = Utils.ad.getApplicationContext().getSharedPreferences("cache.db", 0);
var sharedPreferences = ApplicationSettings

// Get the value of an item by key
cache.get = function(key) {
  // return sharedPreferences.getString(key, undefined);
  return sharedPreferences.getString(key, undefined);
};

// Set an item in the storage
cache.set = function(key, value) {
  // sharedPreferences.edit().putString(key, value).commit();
  sharedPreferences.setString(key, value)
};

// Delete an item by key
cache.delete = function(key) {
  // sharedPreferences.edit().remove(key).commit();
   sharedPreferences.remove(key);
};

// Clear all items
cache.clear = function() {
  // sharedPreferences.edit().clear().commit();
  sharedPreferences.clear()
};

export default cache