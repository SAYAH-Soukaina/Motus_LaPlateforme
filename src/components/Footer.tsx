import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} <a href="https://flowbite.com/" className="hover:underline">Motus SSA</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://www.linkedin.com/in/soukaina-sayah/" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
