# OmniMedia

ブラウザ中心で動くメディア再生プロジェクトです。現在の主構成は `Landing / Omni Player / Omni Player mini / Legacy` の 4 本です。

## バージョン

* 全体バージョン: `v4.5.0`
* Landing: `index.html`
* 通常版: `omni-player.html`
* mini: `omni-player-mini.html`
* legacy: `omni-player-legacy.html`

## ページ構成

## 最新アップデート

### v4.5.0
- 通常版の Auto DJ は Key 同期を外し、BPM ベースで寄せる構成へ整理しました。
- MIX カードに `Key` を追加し、再生中のキーシフトを手動で調整できるようにしました。
- `mp4 -> mp4` の Auto DJ handoff を見直し、次の動画へ完全移行した瞬間に先頭へ戻る問題を修正しました。
- Auto DJ の映像クロスフェードを音声の重なりに合わせ、次映像の ready 状態を見てから切り替えるようにしました。
- `beatSync` 有効時は deck 起動タイミングと開始位相も拍基準で寄せるようにし、曲間の拍合わせを強化しました。

### v4.4.0
- 通常版に BPM 推定と Key 推定を追加し、解析は複数セグメント投票で以前より安定寄りにしました。
- 通常版のスペクトラムは Beat 同期と Auto DJ overlap に対応し、次曲が入ってくると視覚側も追従するようにしました。
- Auto DJ は終盤の BPM モーフだけでなく、次曲の overlap 再生と handoff に対応し、次曲の続き位置から本体へ引き継ぐよう改善しました。

### v4.1.0
- mini をスマホ/タブレット優先で見直し、PWA 用の mini 専用 manifest と install 導線を追加しました。
- mini の縦向き UI をさらに整理し、右側操作を 1 行化、再生系は `前へ / -10秒 / +10秒 / 次へ` を中心に再配置しました。
- mini の全画面フォールバックを iPhone / iPad 系優先で再調整し、静的 PNG フォールバックアートも導入しました。

### v4.0.2
- mini の縦向きコントロールを整理し、ボタンが単純に羅列されない構成へ調整しました。
- mini の縦向き時は `Tips / Lang / FS` をアイコン寄りに切り替えるようにしました。
- mini の初期化順を修正し、`Omni Player mini を開始 / Start mini` ボタンが押せなくなる問題を解消しました。
- mini のフォールバックアートは、生成失敗時でも白い 1x1 画像へ落ちないように強化しました。

### v4.0.0
- Phase 1 として再生基盤の共通コアを追加し、通常版と mini の再生試行・Media Session・モバイル判定を共有化しました。
- mini のアルバムアート未取得時フォールバックを強化し、音声/動画で雰囲気が分かれるカード風アートへ刷新しました。
- 通常版のアンビエントライト強化、円形スペクトラム微調整、スマホ向け `mp4` 再生改善をこの節目バージョンへ統合しました。

### v3.5.0
- 通常版の映像連動アンビエントライトを強化し、外側への広がりと光量を引き上げました。
- 通常版の円形スペクトラム配置を修正し、円形スペクトラムと白波形の振れ幅も少し抑えました。
- 通常版のスマホ向け `mp4` 再生経路をネイティブ優先へ寄せ、モバイルでの通りやすさを改善しました。
- mini では動画ファイルの埋め込みアートをプレイヤー面に出さず、Media Session 用アートと表示用アートを分離しました。

### v3.4.3

* mini 版で `mp4` のバックグラウンド再生経路を修正
* mini 版はバックグラウンド時に動画を音声ミラーへ切り替えて、`MediaSession` 操作と再生位置を維持
* mini 版のアルバムアート取得を `music-metadata-browser` の実際の公開形に合わせて修正
* mini 版は埋め込みアートがある音声/動画で `MediaSession artwork` を安定して表示するよう改善
* mini 版は埋め込みアートがない動画でも、抽出スチルを `MediaSession artwork` に使うよう改善
* mini 版の全画面フォールバックとアート表示面を再調整

### v3.4.1

* 通常版に `matchMedia` ベースの自動最適化を追加
* 通常版は手動のステージ比率切替に加えて、縦横向きと横幅ブレークポイントで UI を自動調整
* `9:16` 時の通常版は専用レイアウトを維持しつつ、`MIX / A-B` を設定画面へ移動
* `9:16` 切替時に mini 版推奨ポップアップを表示可能
* mini 版に向きのリアルタイム判定を追加し、縦向き/横向きでコントロール配置を切替
* ランディングにも `matchMedia` ベースの向き判定と横幅ブレークポイント連動を追加
* モバイル向けに `MediaSession` を強化し、バックグラウンド再生時のメタデータと操作連携を改善
* 音量 / 速度は次回起動に引き継がない仕様へ変更
* 音声ファイルは埋め込みアルバムアートを優先して取得
* 動画ファイルは埋め込みアートを優先し、ない場合は複数サムネイルを生成して `MediaSession artwork` に利用

### 1\. Landing

* ファイル: `index.html`
* 役割: 全ページへの入口
* 導線:

  * `Omni Player`
  * `Omni Player mini`
  * `Omni Player PC (Legacy)`
  * `Coming Soon` 系カード

主な実装:

* スクリプト: `scripts/pages/landing.inline-1.js`, `scripts/pages/landing.inline-2.js`
* スタイル: `styles/pages/landing.inline-1.css`

### 2\. Omni Player

* ファイル: `omni-player.html`
* 位置付け: 通常版 / 主力版
* 特徴:

  * ローカル動画 / 音声 / URL / HLS / DASH 再生
  * YouTube などの埋め込み再生
  * 字幕、EQ、スペクトラム、アニメーション
  * プレイリスト
  * PWA 対応

主な実装:

* 本体スクリプト: `scripts/pages/omni-player.inline-1.js`
* 補助スクリプト: `scripts/pages/omni-player.inline-2.js`, `scripts/pages/omni-player.inline-4.js`
* スタイル: `styles/pages/omni-player.inline-1.css`

現在の通常版のポイント:

* ステージ比率を設定画面から切替可能
* 設定画面はタブ整理済み
* 映像連動アンビエントライト対応

### 3\. Omni Player mini

* ファイル: `omni-player-mini.html`
* 位置付け: 軽量版 / 最小構成
* 特徴:

  * ネイティブ再生優先
  * シンプルな操作系
  * 通常版より UI を軽量化
  * スマホ / タブレットの再生安定性を優先

主な実装:

* スクリプト: `scripts/pages/omni-player-mini.inline-2.js`, `scripts/pages/omni-player-mini.inline-3.js`, `scripts/pages/omni-player-mini.inline-4.js`
* スタイル: `styles/pages/omni-player-mini.inline-1.css`

補足:

* mini は `safe-native` 寄りの再生経路を使う前提です
* `audio-hotfix.js` は mini では使っていません

### 4\. Legacy

* ファイル: `omni-player-legacy.html`
* 位置付け: 旧版互換のための残置
* 主な実装:

  * スクリプト: `scripts/pages/omni-player-legacy.inline-1.js`
  * スタイル: `styles/pages/omni-player-legacy.inline-1.css`

## PWA

通常版は PWA 対応です。

* manifest: `assets/pwa/omni-player.webmanifest`
* service worker: `scripts/app/sw.js`

注意:

* `file://` 直開きでは PWA は使えません
* PWA 機能は HTTP(S) 配信時に利用してください

## モデル比較

|モデル|ファイル|位置付け|向いている用途|備考|
|-|-|-|-|-|
|Omni Player|`omni-player.html`|主力版|ローカル再生、字幕、EQ、スペクトラム、埋め込み再生|機能が最も多い|
|Omni Player mini|`omni-player-mini.html`|軽量版|シンプルな再生、モバイル寄りの安定動作|ネイティブ再生優先|
|Omni Player PC|`omni-player-legacy.html`|互換用|旧構成の確認|非推奨|



## 主要ファイル

### ページ

* `index.html`
* `omni-player.html`
* `omni-player-mini.html`
* `omni-player-legacy.html`

### ページスクリプト

* `scripts/pages/landing.inline-1.js`
* `scripts/pages/landing.inline-2.js`
* `scripts/pages/omni-player.inline-1.js`
* `scripts/pages/omni-player.inline-2.js`
* `scripts/pages/omni-player.inline-4.js`
* `scripts/pages/omni-player-mini.inline-2.js`
* `scripts/pages/omni-player-mini.inline-3.js`
* `scripts/pages/omni-player-mini.inline-4.js`
* `scripts/pages/omni-player-legacy.inline-1.js`

### ページスタイル

* `styles/pages/landing.inline-1.css`
* `styles/pages/omni-player.inline-1.css`
* `styles/pages/omni-player-mini.inline-1.css`
* `styles/pages/omni-player-legacy.inline-1.css`

### プラグイン

* `scripts/plugins/spec-boost.plugin.js`
* `scripts/plugins/anim-plus.plugin.js`
* `scripts/plugins/video-fx.plugin.js`
* `scripts/plugins/cast.plugin.js`
* `scripts/plugins/airplay.plugin.js`
* `scripts/plugins/bg-audio.policy.plugin.js`
* その他 `scripts/plugins/` 配下

## Credits

* Built with `ChatGPT-4o + ChatGPT-5.4`

## 現在の方針

* `Omni Player`: 高機能な主力版
* `Omni Player mini`: 軽量で安定優先
* `Legacy`: 旧互換の維持
* `Coming Soon`: 現時点では未公開

## 既知の制限

* 一部ライブラリは CDN 依存です
* 通常版の `BPM / Key` 解析で使う `ffmpeg-core` は `jsDelivr` から取得します
* 初回からの完全オフライン動作は保証していません
* `file://` 直開きでは PWA、manifest、Cast などが制限されます
* YouTube 埋め込みは IFrame API ベースのため、本物の音声解析スペクトラムは取得できません
* PiP / Fullscreen / AirPlay / Cast はブラウザと端末実装差の影響を受けます
* モバイルではブラウザの自動再生制限の影響を受ける場合があります
* 外部サイト埋め込みは先方の制限で再生できないことがあります

## GitHub Pages メモ

* `scripts/vendor/ffmpeg/core/ffmpeg-core.wasm` は約 `32 MB` あるため、GitHub への直接アップロードや Pages 配布物に含める運用に向きません
* 現在は `omni-player` 側で `ffmpeg-core.js / ffmpeg-core.wasm` を CDN 取得するため、GitHub Pages 公開時に `scripts/vendor/ffmpeg/core/` を載せる必要はありません
* ローカル core を使いたい場合だけ `?ffmpegLocal=1` を付けて開いてください
* CDN が使えない環境では FFmpeg 解析は無効化され、既存の軽量フォールバック推定へ落ちます

## 補足

* ブラウザ差異は特に `PWA / YouTube / PiP / Cast / AirPlay / モバイル再生` で出やすいです
* 公開時は CDN 依存とライセンス条件の確認を推奨します
