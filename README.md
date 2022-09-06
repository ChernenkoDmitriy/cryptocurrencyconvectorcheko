1) Настройка окружения, выбираем CLI

https://reactnative.dev/docs/environment-setup

2) Сборка приложения делается через gradle, перед сборкой приложения нужно установить зависимости, 
это делается с помошью пакетного менеджера  ###npm###

Сделать апк

```npm i```
```cd android```
```./gradlew assembleRelease```

Сделать aab

```npm i```
```cd android```
```./gradlew bundleRelease```

The generated AAB can be found under android/app/build/outputs/bundle/release/app-release.aab, and is ready to be uploaded to Google Play.

3) Как поменять ид для admob

1)  Переходим в корневом пакете в файл app.json и там обновляем android_app_id  (если он изменился)
2)  Переходим в компонент ./modules/shared/ui/adBanner/index.tsx  и в строке

```const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9751652427589478/2546862355';```

вставляем новый ид банера
