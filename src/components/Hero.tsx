import React from 'react';

export default function Hero() {
    return (
        <section className="w-full px-6 antialiased bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-sm py-32 mx-auto mt-px text-left sm:max-w-md md:max-w-lg sm:px-4 md:max-w-none md:text-center">
                    <h1 className="text-3xl font-bold leading-10 tracking-tight text-left text-[#0077c7] md:text-center sm:text-4xl md:text-7xl lg:text-8xl">
                        Découvrez le plaisir de jouer à <br className="hidden sm:block" /> Motus en ligne
                    </h1>
                    <div className="mx-auto mt-5 text-gray-400 md:mt-8 md:max-w-lg md:text-center md:text-xl">
                        Testez votre vocabulaire et votre logique avec notre version en ligne du célèbre jeu Motus. Défiez vos amis ou jouez en solo pour deviner les mots cachés et grimper dans le classement !
                    </div>
                    <div className="flex flex-col items-center justify-center mt-8 space-y-4 text-center sm:flex-row sm:space-y-0 sm:space-x-4">
                        <span className="relative inline-flex w-full md:w-auto">
                            <a href="/api/auth/login" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium leading-6 text-white bg-[#0077c7] border border-transparent rounded-full xl:px-10 md:w-auto hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                                Jouer maintenant
                            </a>
                        </span>
                        <span className="relative inline-flex w-full md:w-auto">
                            <a href="#_" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium leading-6 text-gray-900 bg-gray-100 border border-transparent rounded-full xl:px-10 md:w-auto hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                                En savoir plus
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
