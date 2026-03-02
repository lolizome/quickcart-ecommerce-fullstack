# QuickCart - A simple eCommerce website

QuickCart is an open-source project built with **NextJS 15**.  
It provides a modern, fast and customizable shopping UI.

**Link to demo in Vercel:** https://quickcart-ecommerce-fullstack.vercel.app/

---

## About

-   Built with **Next.JS 15**
-   Responsive design powered by **Tailwind CSS**
-   Real-time feedback with notifications for actions like 'Add to Cart' or 'Login Success' using **React Hot Toast**
-   Secure Authentication: Complete user management and protected routes using **Clerk**
-   Automated user data synchronization between **Clerk** and database using **Inngest** functions
-   Structured communication with the backend using **Axios**

---

## Tech Stack

### Core & Frameworks
-   [Next.JS](https://nextjs.org/) (v15.2.6)
-   [React](https://es.react.dev/) and [React DOM](https://react.dev/reference/react-dom) (v19.0.0)

### Backend & Authentication
-   [Clerk](https://clerk.com/) (v6.37.3)
-   [Mongoose](https://mongoosejs.com/) (v8.10.0)
-   [Inngest](https://www.inngest.com/) (v3.52.0)

### Utilities & Services
-   [Axios](https://axios-http.com/es/) (v1.13.5)
-   [Cloudinary](https://cloudinary.com/) (v2.9.0)
-   [React Hot Toast](https://react-hot-toast.com/) (v2.5.1)
-   [React Device Detect](https://www.npmjs.com/package/react-device-detect) (v2.2.3)

### Styling
-   [Tailwind CSS](https://tailwindcss.com/) (v3.4.1)
-   [Styled JSX](https://www.npmjs.com/package/styled-jsx) (v5.1.7)

### Dev Dependencies
-   [ESLint](https://eslint.org/) (v9)
-   [PostCSS](https://postcss.org/) (v8)

---

## Installation

1. Clone the repo

    ```bash
    git clone https://github.com/lolizome/quickcart-ecommerce-fullstack
    cd quickcart-ecommerce-fullstack
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Run locally

    ```bash
    npm run dev
    ```

---

## Configuration

1. Create a `.env` file in the root directory and add your credentials:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
    CLERK_SECRET_KEY=your_key
    MONGODB_URI=your_mongodb_uri
    CLOUDINARY_CLOUD_NAME=your_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    INNGEST_EVENT_KEY=your_key
    INNGEST_SIGNING_KEY=your_key
    ```

---

## References
### Projects

-    [Next JS Full Stack Ecommerce Project](https://www.youtube.com/watch?v=nxK_TCt2pKw&t=8866s)

---

## License

This project is licensed under the **MIT License**.
