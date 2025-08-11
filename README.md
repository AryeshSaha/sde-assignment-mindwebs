# 🚀 Project Setup & Documentation

![Next.js](https://img.shields.io/badge/Next.js-15.Script](https://img.shields.io/badge/TypeScript-5+-bluewindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B](https://img.shields.io/b 📑 Table of Contents
1. [Setup & Run Instructions](#setup--run-instructions)  
2. [Libraries Used](#-libraries-used)  
   - [State Management (Jotai)](#1-state-management-jotai)  
   - [Slider Library (React-range)](#2-slider-library-react-range)  
   - [Maps](#3-maps)  
   - [UI Library (Shadcn UI)](#4-ui-library-shadcn-ui)  
   - [Styling (Tailwind CSS)](#5-styling-tailwind-css)  
   - [Color Picker (@uiw/react-color)](#6-color-picker-uiwreact-color)  
   - [Platform (Next.js v15.4+ App Router + TypeScript)](#7-platform-nextjs-v154-app-router--typescript)  
3. [Deployment Guide](#-deployment-guide)  
4. [Quick Reference Links](#-quick-reference-links)  

***

## ⚙️ Setup & Run Instructions

```bash
npm i --force
npm run dev
```

This will install all dependencies and spin up the development server.

***

## 📦 Libraries Used

### 1. **State Management:** [Jotai](https://jotai.org/) ([npm](https://www.npmjs.com/package/jotai))
A minimal yet powerful state management library for React. It uses **atoms** as the smallest possible state units, with `atomWithStorage` enabling persistent state storage in localStorage or sessionStorage.

***

### 2. **Slider Library:** [React-range](https://react-range.js.org/) ([npm](https://www.npmjs.com/package/react-range))
A lightweight, flexible range slider for React. Perfect for building custom sliders with multi-thumb support, horizontal/vertical orientation, and smooth interactions.

***

### 3. **Maps**
- **Map Tiles:** [Maptiler](https://www.maptiler.com/maps/) ([docs](https://docs.maptiler.com/maps/)) – High-quality raster/vector map tiles with multiple built-in styles.  
- **Interactive Maps:** [React-Leaflet](https://react-leaflet.js.org/) ([npm](https://www.npmjs.com/package/react-leaflet)) – React wrapper for **Leaflet.js** for responsive, interactive maps.  
- **Drawing Tools:** [React-leaflet-draw](https://github.com/PaulLeCam/react-leaflet-draw) ([npm](https://www.npmjs.com/package/react-leaflet-draw)) – Adds polygon and shape drawing/editing features to interactive maps.  

***

### 4. **UI Library:** [Shadcn UI](https://ui.shadcn.com/) ([docs](https://ui.shadcn.com/docs))
A modern UI library built with Radix UI + TailwindCSS. Provides accessible, stylish, and flexible components for building interfaces quickly.

***

### 5. **Styling:** [Tailwind CSS](https://tailwindcss.com/) ([docs](https://tailwindcss.com/docs))
A utility-first CSS framework for building responsive and customizable designs directly in your markup.

***

### 6. **Color Picker:** [@uiw/react-color](https://uiwjs.github.io/react-color/) ([npm](https://www.npmjs.com/package/@uiw/react-color))
A modular collection of color pickers. Great for implementing **threshold rule color selection** with multiple formats and color models.

***

### 7. **Platform:** [Next.js v15.4+ (App Router + TypeScript)](https://nextjs.org/) ([npm](https://www.npmjs.com/package/next))
A production-grade React framework with hybrid rendering (SSR, SSG), built-in TypeScript support, and an App Router for better routing and data-fetching patterns.

***

## ☁️ Deployment Guide

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin 
   git push -u origin main
   ```

2. **Push Your Code** and make sure your repository is updated.

3. **Connect to Vercel**
   - Sign in to [Vercel](https://vercel.com/)  
   - Import your GitHub repository  
   - Vercel will auto-detect **Next.js** and configure the build

4. **Deploy**
   - Set environment variables if required  
   - Click **Deploy** – your app will be live in seconds  
   - Every future push to `main` will automatically redeploy

***

## 📚 Quick Reference Links

| Library / Tool        | Documentation                            | npm Package                                    |
|-----------------------|------------------------------------------|------------------------------------------------|
| **Jotai**             | https://jotai.org/                       | https://www.npmjs.com/package/jotai            |
| **React-range**       | https://react-range.js.org/              | https://www.npmjs.com/package/react-range      |
| **Maptiler**          | https://docs.maptiler.com/maps/          | –                                              |
| **React-Leaflet**     | https://react-leaflet.js.org/            | https://www.npmjs.com/package/react-leaflet    |
| **React-leaflet-draw**| https://github.com/PaulLeCam/react-leaflet-draw | https://www.npmjs.com/package/react-leaflet-draw|
| **Shadcn UI**         | https://ui.shadcn.com/docs               | –                                              |
| **Tailwind CSS**      | https://tailwindcss.com/docs             | https://www.npmjs.com/package/tailwindcss      |
| **@uiw/react-color**  | https://uiwjs.github.io/react-color/     | https://www.npmjs.com/package/@uiw/react-color |
| **Next.js**           | https://nextjs.org/docs                  | https://www.npmjs.com/package/next             |