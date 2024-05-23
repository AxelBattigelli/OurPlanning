
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import userEventsData from './userEvents.json';
import weekPeriodeData from './weekPeriode.json';
import { CookieStorage } from 'cookie-storage';
import AuthCheckerFail from './AuthCheckerFail';
import './css/myweekpage.css';

const cookieStorage = new CookieStorage();

const MyWeekPage = () => {
    const [highlightedCells, setHighlightedCells] = useState([]);

    const filterUserEvents = (userData) => {
        const username = userData ? userData.username : null;

        if (username) {
            return userEventsData.evenements.filter(event => event.username === username);
        } else {
            return [];
        }
    };

    const getIndexFromUrl = (index) => {
        let currentUrl = window.location.href;
        let urlParams = new URLSearchParams(currentUrl.split('?')[1]);
        let indexParam = urlParams.get("index");
        let indexValue = parseInt(indexParam);
        return (!isNaN(indexValue) && indexValue >= 0 && indexValue <= 1408) ? indexValue : index;
    };

    useEffect(() => {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        const year = currentDate.getFullYear();
        const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.ceil(days / 7);
        let retrievedIndex = 0;

        if (year) {
            const userEvents = weekPeriodeData.filter(event => event.annee === year && event.numero === weekNumber);

            if (userEvents.length > 0) {
                const index = weekPeriodeData.indexOf(userEvents[0]);
                let currentUrl = window.location.href;

                if (!currentUrl.includes("myweek?index=")) {
                    let urlObject = new URL(currentUrl);
                    let updatedUrl = urlObject.origin + urlObject.pathname + "?index=" + index;
                    window.location.href = updatedUrl;
                } else {
                    retrievedIndex = getIndexFromUrl(index);
                }
            }
        }

        const userDataString = cookieStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const events = filterUserEvents(userData);

        const newHighlightedCells = [];

        events.forEach(event => {
            var data = weekPeriodeData.find(dta => dta.index === retrievedIndex);
            data = JSON.stringify(data);
            data = data ? JSON.parse(data) : null;
            const hd = new Date(data.periode.start);
            const hf = new Date(data.periode.end);
            const ref_start = new Date(event.heure_debut);
            const ref_end = new Date(event.heure_fin);

            if (ref_start >= hd && ref_start <= hf) {
                const day = ref_start.getDay();
                const hour_start = ref_start.getHours();
                const min_start = ref_start.getMinutes();
                const hour_end = ref_end.getHours();
                const min_end = ref_end.getMinutes();
                const case_nb_start = (hour_start * 60 / 15) + (min_start / 15);
                const case_nb_end = (hour_end * 60 / 15) + (min_end / 15);

                let i = case_nb_start;
                while (i < case_nb_end) {
                    newHighlightedCells.push({ row: i, column: day - 1 });
                    i++;
                }
            }
        });

        setHighlightedCells(newHighlightedCells);
    }, []);


    let currentUrl = window.location.href;
    let urlParams = new URLSearchParams(currentUrl.split('?')[1]);
    let indexParam = urlParams.get("index");
    let indexValue = parseInt(indexParam);
    let urlObject = new URL(currentUrl);
    const changeWeek = [];
    const prevWeek = [];
    const nxtWeek = [];
    const previousWeek = urlObject.origin + urlObject.pathname + "?index=" + (indexValue - 1);
    const nextWeek = urlObject.origin + urlObject.pathname + "?index=" + (indexValue + 1);

    if (indexValue > 0) {
        prevWeek.push(
            <button className="custom-btn btn-3"><span><a className="btn_link" href={previousWeek}>Semaine précédente</a></span></button>
        );
    }
    if (indexValue < 1408) {
        nxtWeek.push(
            <button className="custom-btn btn-3"><a className="btn_link" href={nextWeek}>Semaine suivante</a></button>
        );
    }
    changeWeek.push(<div className="frame">{prevWeek} {nxtWeek}</div>);


    const dates = [];
    var data = weekPeriodeData.find(dta => dta.index === indexValue);
    if (data) {
        for (let i = 0; i < 7; i++) {
            data = JSON.stringify(data);
            data = data ? JSON.parse(data) : null;
            var hd = new Date(data.periode.start);
            hd.setDate(hd.getDate() + i);
            hd = hd.getDate();
            dates.push(<td>{hd}</td>);
        }
    }


    const lignes = 24 * 4;
    const colonnes = 8;
    const tableau = [];

    for (let i = 0; i < lignes; i++) {
        const sousLignes = [];

        for (let j = 0; j < colonnes; j++) {
            const heure = i / 4;
            const minute = (i % 4) * 15;
            const timeString = format(new Date().setHours(heure, minute), 'HH:mm');
            const isHighlighted = highlightedCells.some(cell => cell.row === i && cell.column === j - 1);

            if (minute % 2 === 0) {
                if (isHighlighted) {
                    sousLignes.push(
                        <td key={j} id={`L${i}-C${j - 1}`} className="highlight-cell">{j === 0 ? timeString : ''}</td>
                    );
                } else {
                    sousLignes.push(
                        <td key={j} id={`L${i}-C${j - 1}`}>{j === 0 ? timeString : ''}</td>
                    );
                }
            } else {
                if (isHighlighted) {
                    sousLignes.push(
                        <td key={j} id={`L${i}-C${j - 1}`} className="highlight-cell">{j === 0 ? '`' : ''}</td>
                    );
                } else {
                    sousLignes.push(
                        <td key={j} id={`L${i}-C${j - 1}`}>{j === 0 ? '`' : ''}</td>
                    );

                }
            }
        }
        tableau.push(<tr key={i}>{sousLignes}</tr>);
    }

    const day = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche"
    ]

    return (
        <div>
            <AuthCheckerFail />
            <h2>MyWeekPage</h2>

            <div>{changeWeek}</div>

            <table border="1">
                <thead>
                    <tr>
                        <td></td>
                        {day?.length > 0 && day.map((days, index) => (
                            <>
                                <td>{days}</td>
                            </>
                        ))}
                    </tr>
                    <tr>
                        <td></td>
                        {dates}
                    </tr>
                </thead>
                <tbody>{tableau}</tbody>
            </table>
        </div>
    );
};

export default MyWeekPage;