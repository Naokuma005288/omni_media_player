※使用する前に
このプロジェクト及び設計は、全てわたくし中学生がしたものです。まだま開発中ですがこれからも暖かい目見守っていただけると幸いです。

## 🏠 `index.html`（Landing v2.7.0）

ブラウザだけで各ツールへナビゲートするトップページ。  
**Omni Player シリーズ**（Omni Player / Omni Player mini / PC）と、**開発中シリーズ**への導線を担います。  
アニメーションは負荷を監視して自動的に抑制され、PWA対応（HTTPS/localhostのみ）です。

### 主なUI
- **カードグリッド**：各ツールのエントリ（お気に入り・フォーカス・3Dチルト・光沢シーン）
- **検索バー**：カード名/タグ/説明を対象。ハイライト表示あり
- **設定モーダル**：表示/エフェクト/操作/データの4タブ
- **言語切替**：JP/EN/KR/中文/RU/FR をワンクリックで巡回
- **テーマ**：ダーク/ライト/OS連動/時間帯自動
- **HUD**：上部中央に時計・バッテリー（対応環境）

### キーボードショートカット
- `/` または `Ctrl/Cmd + K`… 検索へフォーカス  
- `← / →`… カード移動　`Enter`… フォーカス/開く  
- `1–9`… 対応カードへジャンプ　`O`… 開く  
- `X`… FXミュート切替　`L`… リスト表示　`C`… コンパクト表示  
- `Esc`… フォーカス解除/各モーダルを閉じる  
- `?`… ショートカットヘルプ

### 設定（永続化）
`localStorage` を利用して永続化します。
- `om.theme`：テーマ設定（`dark`/`light`/`auto`/`auto-time`）
- `om.settings`：UI/FX/操作の各フラグ
- `om.accent`：アクセントカラー
- `om.order`：カード並び順
- `om.favs`：お気に入り（スラッグ配列）
- `om.lang`：現在の言語

> **エクスポート/インポート**は「設定 → データ」から可能。チームで設定共有ができます。

### URLパラメータ/ディープリンク
- `#alpha` 等のハッシュでカードを直接フォーカス
- `?open=alpha` で対象ページを即時オープン
- `?fx=off` で演出をミュートして起動

### PWA
`assets/pwa/manifest.webmanifest` は **HTTPS/localhost** 時のみ自動付与。  
`beforeinstallprompt` をフックして「インストール」ボタンを表示します。

---

## 🎛 Omni Player シリーズ（上段）

デスクトップ/モバイル向けの再生・視聴体験をまとめた従来ラインです。  
Landing から各ツールに遷移する想定のため、本READMEでは役割/位置付けを整理します。

| スラッグ | ファイル | バッジ | 説明 |
|---|---|---:|---|
| `alpha` | `omni_pc_α.html` | 推奨 | **Omni Player**。完全機能・低負荷。YouTube 埋め込み、プレイリスト、字幕系をまとめた主力。 |
| `beta`  | `omni_pc_β.html` | mini | **Omni Player mini**。軽量でシンプルな操作に絞ったモデル。既定ではコア設定のみ表示。 |
| `pc`    | `omni_pc.html`   | 非推奨 | **レガシー**維持。互換性確保のため残置。 |

> **お気に入り**（星ボタン）と **Fav優先並べ替え** を併用すると、よく使うラインを先頭固定にできます。

---

## 🆕 新シリーズ（下段）

Landing では新シリーズを **Coming Soon** として表示し、クリックで予定内容の簡易モーダルを表示します。

| カード | 状態 | 説明 |
|---|---|---|
| Omni Convert | Coming Soon | 開発中 |
| Omni Live | Coming Soon | 開発中 |
| Omni Editor | Coming Soon | 開発中 |

### 多言語表示（Landingの辞書）
`index.html` 内の `dict` に各言語の見出し/説明を保持しています。  
本シリーズ差し替えに伴い、以下のキーが使われます（例：日本語 → 英語）：

- **セクション見出し/補助**  
  - `secNew`: `新シリーズ` → `New Series`  
  - `secNewHint`: `Coming Soon`（β化後も文言維持可。必要なら `Beta` に変更）
- **カード本文（Convert/Editor の説明）**  
  新シリーズのカードテキストは静的本文のため、必要なら辞書にキーを追加し、  
  `applyLang` で `gridSoon` 内の対応要素を書き換える実装を追加できます。

> 既に `JP/EN/KR/中文/RU/FR` の6言語に対応済み。増やす際は `dict` を拡張してください。

---

## 🧩 開発メモ（Landing拡張のポイント）

- **カードの追加/差し替え**  
  - HTML: `.grid` セクションへ `<article class="card">` を追加  
  - JS: 検索対象＆ドラッグ順序対象に含めるなら上段（`#grid`）へ配置  
  - 新シリーズ（下段）に配置する場合は **操作対象外**（並べ替え等は無効）

- **言語切替**  
  - `dict` にキーを足す → `applyLang` でDOM反映  
  - プレースホルダやボタンラベルは `applyLang` 内でID指定して更新

- **アクセシビリティ**  
  - すべてのカードは `tabindex="0"` を持ち、キーボード操作に対応  
  - フォーカス時は「Focus Mode」で周辺を減光

- **パフォーマンス**  
  - FPS自動監視（30FPS未満で演出ミュート）  
  - `prefers-reduced-motion` を尊重  
  - `reduce` 設定やモバイルでの描画負荷軽減オプションあり

---

## 🔗 関連ファイル
- `styles/pages/index.inline-1.css` … Landing のページスタイル  
- `scripts/pages/index.inline-2.js` … Landing の UI/状態管理  
- `scripts/plugins/` … Omni Player 系プラグイン群  
- `scripts/boost/` … OPBoost レジストリ/アダプタ  
- `assets/pwa/manifest.webmanifest` … PWA 設定  
- `index.html` … ナビゲーションの HTML 本体

> 新シリーズの実体ページは現在未公開です。
