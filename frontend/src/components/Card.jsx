import React from "react";
import {useNavigate } from "react-router-dom";
const Card = (prop) => {
    const Navigate = useNavigate()
    const cards = [
    { title: prop.title, description: prop.description, path: prop.path },
    ];

    return (
        <>
            {cards.map((card,index) => (
                <div 
                    key = {index}
                    className="card"
                    onClick={() => Navigate(card.path)}
                >
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                </div>
            ))}
        </>
    );
};
export default Card;