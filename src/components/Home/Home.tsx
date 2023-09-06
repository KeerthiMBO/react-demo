import React from "react";

interface HomeProps {
  title: string; // Specify the title prop and its type
}


export const Home: React.FC<HomeProps> = (props) => {
  return (
    <div>
      <h2>Home</h2>
      <p>{props.title}</p>
    </div>
  );
};
