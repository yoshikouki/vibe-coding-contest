# Vibe Coding Contest - グリッド型コード楽器

## プロジェクト概要
音楽理論に詳しくない人でも、グリッド状に並んだボタンを押すだけで自然なコード進行や雰囲気のある演奏ができる Web アプリケーションを実装します。

## 進捗状況

### 実装済み機能
1. プロジェクトセットアップ
   - ✅ Next.js プロジェクト作成
   - ✅ 必要なパッケージのインストール（Tone.js, TailwindCSS）
   - ✅ 基本的なディレクトリ構造の整理

2. 基本機能実装
   - ✅ グリッドレイアウトの実装
   - ✅ Tone.js による基本的な音声出力
   - ✅ コード定義とマッピング（ダイアトニックコード、セカンダリードミナント、テンションコード）
   - ✅ 音色の調整（三角波オシレーター、エンベロープ設定）

### 実装予定の機能
1. キー/スケール切り替え機能
   - ⬜️ キーセレクターの実装
   - ⬜️ スケールセレクターの実装
   - ⬜️ コードのトランスポーズ機能

2. UI/UX の改善
   - ⬜️ ビジュアルフィードバックの強化
   - ⬜️ レスポンシブデザインの最適化
   - ⬜️ タッチデバイス対応の改善

3. 音声機能の拡張
   - ⬜️ エフェクト（リバーブ、ディレイ）の追加
   - ⬜️ ベロシティ対応
   - ⬜️ アルペジオ機能

## 技術スタック
- Next.js + TypeScript
- Tone.js (Web Audio API ラッパー)
- TailwindCSS (スタイリング)

## 機能要件

### 必須要件
1. グリッド型のコードパッド UI
   - 4x4 のグリッドレイアウト
   - タッチ/クリックで演奏可能
   - ビジュアルフィードバック

2. 豊富なコード種類
   - ダイアトニックコード (I, ii, iii, IV, V, vi, vii°)
   - セカンダリードミナント (V/V, V/ii など)
   - モーダルインターチェンジ
   - テンションコード (add9, mai7, SUS4 など)

3. キー/スケール切り替え
   - 任意のキーを選択可能
   - メジャー/マイナーを含む各種スケール対応
   - モード切り替え (Ionian, Dorian, Phrygian など)

### 実装計画 (30分)

1. プロジェクトセットアップ (5分)
   - Next.js プロジェクト作成
   - 必要なパッケージのインストール
   - 基本的なディレクトリ構造の整理

2. 基本機能実装 (15分)
   - グリッドレイアウトの実装
   - Tone.js による基本的な音声出力
   - コード定義とマッピング

3. 拡張機能実装 (10分)
   - キー/スケール切り替え機能
   - テンションコードの追加
   - UI/UX の改善

## ディレクトリ構造
```
src/
  ├── app/
  │   └── page.tsx
  ├── components/
  │   ├── GridPad.tsx
  │   ├── KeySelector.tsx
  │   └── ScaleSelector.tsx
  ├── lib/
  │   ├── chords.ts
  │   ├── scales.ts
  │   └── audio.ts
  └── types/
      └── index.ts
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
