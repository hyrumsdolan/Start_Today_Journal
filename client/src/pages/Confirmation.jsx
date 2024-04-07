import React from "react";

const Confirmation = () => {
  const messages = [
    "You're all set!",
    "You're on your way!",
    "Way to go!",
    "Phenomenal!",
    "Excellent!",
    "Perfecto!",
    "Great job!",
    "Perfect!",
    "Love it!",
    "Lovely <3!",
    "You're doing amazing!",
    "You're on fire!",
    "Well done!",
    "You're killing it!",
    "You're a star!",
    "You're a rockstar!",
    "You're a superstar!"
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-4">{randomMessage}</h1>
      <h2 className="text-2xl">See you again tomorrow!</h2>
    </div>
  );
};

export default Confirmation;