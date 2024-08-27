'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Player = {
    email: string;
    score: number;
};

export default function Ranking() {
    const [rank, setRank] = useState<Player[]>([]);

    useEffect(() => {
        fetchRank();
    }, []);

    const fetchRank = async () => {
        try {
            const response = await axios.get("/api/user");
            let players = response.data;
            const fictitiousPlayers = [
                { email: "shadow_warrior@example.com", score: 270 },
                { email: "dragon_slayer@example.com", score: 120 },
                { email: "night_hawk@example.com", score: 50 },
                { email: "stealth_assassin@example.com", score: 40 },
                { email: "cyber_ninja@example.com", score: 20 },
            ];
            players = players.concat(fictitiousPlayers.slice(players.length, 5));
            setRank(players);
        } catch (error) {
            console.error("Failed to fetch ranking data:", error);
            setRank([
                { email: "shadow_warrior@example.com", score: 270 },
                { email: "dragon_slayer@example.com", score: 120 },
                { email: "night_hawk@example.com", score: 50 },
                { email: "stealth_assassin@example.com", score: 40 },
                { email: "cyber_ninja@example.com", score: 20 },
            ]);
        }
    }

    return (
        <section className="flex justify-center items-center bg-white dark:bg-white">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Classement des joueurs</h5>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {rank.map((player, index) => (
                            <li key={index} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={`win.jpg`}
                                            alt={`Avatar of ${player.email}`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {player.email}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {`${index + 1}ème`}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
