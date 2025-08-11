**Setup & Run Instructions**

```bash
npm i --force
npm run dev
```

***

## Libraries Used

### 1. **State Management:** [Jotai](https://jotai.org/) ([npm](https://www.npmjs.com/package/jotai))
Jotai is a minimalistic and scalable state management library for React. It provides simple primitives called atoms to manage and share state throughout your app. The special `atomWithStorage` allows persisting atom values in localStorage or other storage backends, enabling automatic state restoration and synchronization.

***

### 2. **Slider Library:** [React-range](https://react-range.js.org/) ([npm](https://www.npmjs.com/package/react-range))
React-range is a lightweight and highly customizable range slider component for React applications. It supports multi-thumb, vertical/horizontal sliders, and advanced interaction controls, making it ideal for building custom UI sliders.

***

### 3. **Maps:**
- **Map Tiles:** [Maptiler](https://www.maptiler.com/maps/) ([docs](https://docs.maptiler.com/maps/))
  Maptiler provides fast, beautiful raster and vector map tiles for web mapping projects. It supports multiple styles and seamless integration with mapping libraries.
- **Interactive Maps:** [React-Leaflet](https://react-leaflet.js.org/) ([npm](https://www.npmjs.com/package/react-leaflet))
  React-Leaflet is a React wrapper for the Leaflet JS library, enabling interactive, mobile-friendly maps with declarative React components.
- **Drawing Tools:** [React-leaflet-draw](https://github.com/PaulLeCam/react-leaflet-draw) ([npm](https://www.npmjs.com/package/react-leaflet-draw))
  React-leaflet-draw extends React-Leaflet by adding drawing controls, allowing users to create polygons and other shapes directly on the map.

***

### 4. **UI Library:** [Shadcn UI](https://ui.shadcn.com/) ([docs](https://ui.shadcn.com/docs))
Shadcn UI is a modern component library for React, built on top of Radix UI primitives and Tailwind CSS. It offers accessible, visually appealing, and customizable components for building high-quality user interfaces.

***

### 5. **Styling:** [Tailwind CSS](https://tailwindcss.com/) ([docs](https://tailwindcss.com/docs))
Tailwind CSS is a utility-first CSS framework that enables rapid UI development with low-level, composable classes directly in your markup.

***

### 6. **Color Picker:** [@uiw/react-color](https://uiwjs.github.io/react-color/) ([npm](https://www.npmjs.com/package/@uiw/react-color))
@uiw/react-color is a lightweight color picker component library for React. It provides several customizable color picker widgets and supports both light and dark themes, ideal for selecting threshold rule colors interactively.[3]

***

### 7. **Platform:** [Next.js (v15.4+, App Router, TypeScript)](https://nextjs.org/) ([docs](https://nextjs.org/docs))
Next.js is a React framework that enables server-side rendering, static site generation, and fast development workflows. It supports the new App Router and fully integrates TypeScript for robust, type-safe codebases.

***

## Deployment

1. **Create a GitHub Repository:**  
   Initialize a new repository or clone your project.
2. **Push Your Code:**  
   Add and commit your code, then push to GitHub.
3. **Connect to Vercel:**  
   - Go to [Vercel](https://vercel.com/) and log in or sign up.
   - Import your GitHub repository.
   - Configure project settings and environment variables if needed.
4. **Deploy:**  
   Vercel will automatically detect your Next.js project and start deployments on every push to the main branch.  
   You’ll get a live URL for your app after deployment.

***

## Quick Reference Links

| Library               | Documentation                            | npm Package                                    |
|-----------------------|------------------------------------------|------------------------------------------------|
| Jotai                 | https://jotai.org/                       | https://www.npmjs.com/package/jotai            |
| React-range           | https://react-range.js.org/              | https://www.npmjs.com/package/react-range      |
| Maptiler              | https://docs.maptiler.com/maps/          | -                                              |
| React-Leaflet         | https://react-leaflet.js.org/            | https://www.npmjs.com/package/react-leaflet    |
| React-leaflet-draw    | https://github.com/PaulLeCam/react-leaflet-draw | https://www.npmjs.com/package/react-leaflet-draw|
| Shadcn UI             | https://ui.shadcn.com/docs               | -                                              |
| Tailwind CSS          | https://tailwindcss.com/docs             | https://www.npmjs.com/package/tailwindcss      |
| @uiw/react-color      | https://uiwjs.github.io/react-color/     | https://www.npmjs.com/package/@uiw/react-color |
| Next.js               | https://nextjs.org/docs                  | https://www.npmjs.com/package/next             |