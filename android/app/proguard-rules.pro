# Keep React Native classes
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Keep your MainActivity and Application
-keep class com.com.viriksonholidays.MainActivity { *; }
-keep class com.com.viriksonholidays.MainApplication { *; }

# Keep classes for React Native libraries
-keep class com.facebook.** { *; }
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# Prevent issues with Hermes
-keep class com.facebook.hermes.** { *; }
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <fields>;
}

# Keep native modules
-keep class com.swmansion.gesturehandler.react.** { *; }
-keep class com.airbnb.android.react.lottie.** { *; }
