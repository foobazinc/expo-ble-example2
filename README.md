# react-native-ble-plx 検証コード
Expo は Bluetooth 関連の API を提供していないので、 [react-native-ble-plx](https://github.com/dotintent/react-native-ble-plx) を利用して BLE の通信処理を行えるか検証したリポジトリです。

このコードベースで行っていることは下記です。

1. 周囲のデバイスのスキャン
2. RSSI を更新・表示
3. デバイスを指定して特定の Characteristic に対して書き込み

![UIのイメージ](https://user-images.githubusercontent.com/8362436/123890575-66517880-d992-11eb-866d-f5af97c51d24.gif)
