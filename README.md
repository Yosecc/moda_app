MODATEX APP

Proceso de compilacion

-- npm install
-- tns platform add android
-- Agregar el el archivo platforms\android\build.gradle en el objeto dependencies classpath "com.google.gms:google-services:4.3.4"
-- en el archivo node_modules\@nativescript\firebase\platforms\android\firebase-release.aar cambiar la extension del archivo a .zip
-- abrir el Manifest y remplazar por el siguiente codigo..
-= guardar y colocar nuevamente la extensio .aar


<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.nativescript.plugins.firebase"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="14"
        android:targetSdkVersion="23" />

    <!-- for Messaging -->
    <application>
        <service android:name="org.nativescript.plugins.firebase.MyFirebaseMessagingService" android:exported="true">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        <service android:name="org.nativescript.plugins.firebase.MyFirebaseInstanceIDService" android:exported="true">
            <intent-filter>
                <action android:name="com.google.firebase.INSTANCE_ID_EVENT" />
            </intent-filter>
        </service>
    </application>

</manifest>


-- en el archivo  node_modules\@nativescript\firebase\platforms\android\include.gradle remplazar 

FROM
// Cloud Messaging (FCM)
implementation "com.google.firebase:firebase-messaging:XXXX"

TO
implementation 'com.google.firebase:firebase-messaging:23.0.0'
implementation 'com.google.firebase:firebase-iid:21.1.0' // add this